import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertUserSchema, 
  insertPurchaseSchema, 
  insertStakeSchema, 
  insertRewardSchema,
  insertUserMetricsSchema
} from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { setupAuth } from "./auth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication routes
  setupAuth(app);
  // prefix all routes with /api
  const apiRoute = '/api';

  // Error handler for validation errors
  const handleValidationError = (err: unknown, res: any) => {
    if (err instanceof ZodError) {
      const formatted = fromZodError(err);
      return res.status(400).json({ error: formatted.message });
    }
    console.error("Validation error:", err);
    return res.status(500).json({ error: "Internal server error" });
  };

  // User routes
  app.post(`${apiRoute}/users`, async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if username is already taken
      const existingUser = await storage.getUserByUsername(userData.username);
      if (existingUser) {
        return res.status(400).json({ error: "Username already taken" });
      }

      // Check if wallet address already exists
      if (userData.walletAddress) {
        const existingWallet = await storage.getUserByWalletAddress(userData.walletAddress);
        if (existingWallet) {
          return res.status(400).json({ error: "Wallet address already registered" });
        }
      }

      // Create user
      const user = await storage.createUser(userData);
      
      // Create initial metrics for the user
      await storage.createUserMetrics({
        userId: user.id,
        directBusiness: "0",
        teamBusiness: "0",
        currentRank: "",
        directReferrals: 0,
        totalReferrals: 0
      });
      
      // If user was referred, update referrer's metrics
      if (userData.referredBy) {
        const referrer = await storage.getUserByReferralCode(userData.referredBy);
        if (referrer) {
          const referrerMetrics = await storage.getUserMetrics(referrer.id);
          if (referrerMetrics) {
            await storage.updateUserMetrics(referrer.id, {
              directReferrals: (referrerMetrics.directReferrals || 0) + 1,
              totalReferrals: (referrerMetrics.totalReferrals || 0) + 1
            });
          }
        }
      }
      
      return res.status(201).json(user);
    } catch (err) {
      return handleValidationError(err, res);
    }
  });

  app.get(`${apiRoute}/users/:id`, async (req, res) => {
    const { id } = req.params;
    const user = await storage.getUser(parseInt(id));
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    return res.json(user);
  });

  app.get(`${apiRoute}/users/wallet/:address`, async (req, res) => {
    const { address } = req.params;
    const user = await storage.getUserByWalletAddress(address);
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    return res.json(user);
  });

  // Purchase routes
  app.post(`${apiRoute}/purchases`, async (req, res) => {
    try {
      const purchaseData = insertPurchaseSchema.parse(req.body);
      
      // Verify user exists
      if (typeof purchaseData.userId !== 'number') {
        return res.status(400).json({ error: "Invalid user ID" });
      }
      
      const user = await storage.getUser(purchaseData.userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      
      // Create the purchase record
      const purchase = await storage.createPurchase(purchaseData);
      
      // Update user's business metrics
      const userMetrics = await storage.getUserMetrics(purchaseData.userId);
      if (userMetrics) {
        const currentDirectBusiness = userMetrics.directBusiness ? parseFloat(userMetrics.directBusiness.toString()) : 0;
        const updatedDirectBusiness = currentDirectBusiness + parseFloat(purchaseData.usdtAmount.toString());
        await storage.updateUserMetrics(purchaseData.userId, {
          directBusiness: updatedDirectBusiness.toString()
        });
      }
      
      // Process referral rewards if the user was referred
      if (user.referredBy) {
        const referrer = await storage.getUserByReferralCode(user.referredBy);
        if (referrer) {
          // Create a first level reward (20%)
          const reward = await storage.createReward({
            userId: referrer.id,
            referredUserId: user.id,
            level: 1,
            amount: (parseFloat(purchaseData.usdtAmount.toString()) * 0.2).toString(),
            percentage: "20",
            sourceAmount: purchaseData.usdtAmount.toString(),
            status: "pending"
          });
          
          // Update referrer's team business
          const referrerMetrics = await storage.getUserMetrics(referrer.id);
          if (referrerMetrics) {
            const currentTeamBusiness = referrerMetrics.teamBusiness ? parseFloat(referrerMetrics.teamBusiness.toString()) : 0;
            const updatedTeamBusiness = currentTeamBusiness + parseFloat(purchaseData.usdtAmount.toString());
            await storage.updateUserMetrics(referrer.id, {
              teamBusiness: updatedTeamBusiness.toString()
            });
          }
        }
      }
      
      return res.status(201).json(purchase);
    } catch (err) {
      return handleValidationError(err, res);
    }
  });

  app.get(`${apiRoute}/purchases/:id`, async (req, res) => {
    const { id } = req.params;
    const purchase = await storage.getPurchase(parseInt(id));
    
    if (!purchase) {
      return res.status(404).json({ error: "Purchase not found" });
    }
    
    return res.json(purchase);
  });

  app.get(`${apiRoute}/users/:userId/purchases`, async (req, res) => {
    const { userId } = req.params;
    const purchases = await storage.getUserPurchases(parseInt(userId));
    return res.json(purchases);
  });

  app.patch(`${apiRoute}/purchases/:id/status`, async (req, res) => {
    const { id } = req.params;
    const { status, txHash } = req.body;
    
    if (!status) {
      return res.status(400).json({ error: "Status is required" });
    }
    
    const updatedPurchase = await storage.updatePurchaseStatus(parseInt(id), status, txHash);
    
    if (!updatedPurchase) {
      return res.status(404).json({ error: "Purchase not found" });
    }
    
    return res.json(updatedPurchase);
  });

  // Staking routes
  app.post(`${apiRoute}/stakes`, async (req, res) => {
    try {
      const stakeData = insertStakeSchema.parse(req.body);
      
      // Verify user exists
      if (typeof stakeData.userId !== 'number') {
        return res.status(400).json({ error: "Invalid user ID" });
      }
      
      const user = await storage.getUser(stakeData.userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      
      // Create the stake record
      const stake = await storage.createStake(stakeData);
      return res.status(201).json(stake);
    } catch (err) {
      return handleValidationError(err, res);
    }
  });

  app.get(`${apiRoute}/stakes/:id`, async (req, res) => {
    const { id } = req.params;
    const stake = await storage.getStake(parseInt(id));
    
    if (!stake) {
      return res.status(404).json({ error: "Stake not found" });
    }
    
    return res.json(stake);
  });

  app.get(`${apiRoute}/users/:userId/stakes`, async (req, res) => {
    const { userId } = req.params;
    const stakes = await storage.getUserStakes(parseInt(userId));
    return res.json(stakes);
  });

  app.get(`${apiRoute}/users/:userId/active-stakes`, async (req, res) => {
    const { userId } = req.params;
    const activeStakes = await storage.getUserActiveStakes(parseInt(userId));
    return res.json(activeStakes);
  });

  app.patch(`${apiRoute}/stakes/:id/status`, async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({ error: "Status is required" });
    }
    
    const updatedStake = await storage.updateStakeStatus(parseInt(id), status);
    
    if (!updatedStake) {
      return res.status(404).json({ error: "Stake not found" });
    }
    
    return res.json(updatedStake);
  });

  // Rewards routes
  app.get(`${apiRoute}/users/:userId/rewards`, async (req, res) => {
    const { userId } = req.params;
    const rewards = await storage.getUserRewards(parseInt(userId));
    return res.json(rewards);
  });

  // User metrics routes
  app.get(`${apiRoute}/users/:userId/metrics`, async (req, res) => {
    const { userId } = req.params;
    const metrics = await storage.getUserMetrics(parseInt(userId));
    
    if (!metrics) {
      return res.status(404).json({ error: "User metrics not found" });
    }
    
    return res.json(metrics);
  });

  // Dashboard stats routes
  app.get(`${apiRoute}/users/:userId/dashboard`, async (req, res) => {
    const { userId } = req.params;
    
    // Get user info
    const user = await storage.getUser(parseInt(userId));
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    // Get user metrics
    const metrics = await storage.getUserMetrics(parseInt(userId));
    
    // Get user purchases
    const purchases = await storage.getUserPurchases(parseInt(userId));
    
    // Get user stakes
    const stakes = await storage.getUserStakes(parseInt(userId));
    const activeStakes = stakes.filter(stake => stake.status === "active");
    
    // Get user rewards
    const rewards = await storage.getUserRewards(parseInt(userId));
    
    // Calculate total invested
    const totalInvested = purchases.reduce((sum, purchase) => {
      return sum + parseFloat(purchase.usdtAmount.toString());
    }, 0);
    
    // Calculate total tokens
    const totalTokens = purchases.reduce((sum, purchase) => {
      return sum + parseFloat(purchase.amount.toString());
    }, 0);
    
    // Calculate total staked
    const totalStaked = activeStakes.reduce((sum, stake) => {
      return sum + parseFloat(stake.amount.toString());
    }, 0);
    
    // Calculate pending rewards
    const pendingRewards = activeStakes.reduce((sum, stake) => {
      return sum + parseFloat(stake.reward.toString());
    }, 0);
    
    // Calculate total earned from referrals
    const totalEarned = rewards.reduce((sum, reward) => {
      return sum + parseFloat(reward.amount.toString());
    }, 0);
    
    return res.json({
      user: {
        id: user.id,
        username: user.username,
        walletAddress: user.walletAddress,
        referralCode: user.referralCode
      },
      metrics: metrics || {
        directBusiness: "0",
        teamBusiness: "0",
        currentRank: "",
        directReferrals: 0,
        totalReferrals: 0
      },
      stats: {
        totalInvested,
        totalTokens,
        totalStaked,
        pendingRewards,
        totalEarned,
        purchasesCount: purchases.length,
        activeStakesCount: activeStakes.length
      }
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}
