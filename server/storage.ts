import { 
  User, Purchase, Stake, Reward, UserMetrics,
  type SelectUser as User,
  type InsertUser,
  type SelectPurchase as Purchase,
  type InsertPurchase,
  type SelectStake as Stake,
  type InsertStake,
  type SelectReward as Reward,
  type InsertReward,
  type SelectUserMetrics as UserMetrics,
  type InsertUserMetrics
} from "@shared/schema";
import session from "express-session";
import { db } from "./db";
import MongoStore from "connect-mongo";

export interface IStorage {
  sessionStore: session.Store;
  getUser(id: string): Promise<User | null>;
  getUserByUsername(username: string): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  getUserByWalletAddress(address: string): Promise<User | null>;
  getUserByReferralCode(code: string): Promise<User | null>;
  createUser(user: InsertUser): Promise<User>;
  listUsers(): Promise<User[]>;
  createPurchase(purchase: InsertPurchase): Promise<Purchase>;
  getPurchase(id: string): Promise<Purchase | null>;
  getUserPurchases(userId: string): Promise<Purchase[]>;
  updatePurchaseStatus(id: string, status: string, txHash?: string): Promise<Purchase | null>;
  createStake(stake: InsertStake): Promise<Stake>;
  getStake(id: string): Promise<Stake | null>;
  getUserStakes(userId: string): Promise<Stake[]>;
  getUserActiveStakes(userId: string): Promise<Stake[]>;
  updateStakeStatus(id: string, status: string): Promise<Stake | null>;
  createReward(reward: InsertReward): Promise<Reward>;
  getUserRewards(userId: string): Promise<Reward[]>;
  getUserMetrics(userId: string): Promise<UserMetrics | null>;
  createUserMetrics(metrics: InsertUserMetrics): Promise<UserMetrics>;
  updateUserMetrics(userId: string, metrics: Partial<InsertUserMetrics>): Promise<UserMetrics | null>;
}

export class DatabaseStorage implements IStorage {
  public sessionStore: session.Store;

  constructor() {
    this.sessionStore = MongoStore.create({ 
      clientPromise: db.asPromise().then(c => c.getClient()),
      collectionName: 'sessions'
    });
  }

  async getUser(id: string) {
    return await User.findById(id);
  }

  async getUserByUsername(username: string) {
    return await User.findOne({ username });
  }

  async getUserByEmail(email: string) {
    if (!email) return null;
    return await User.findOne({ email });
  }

  async getUserByWalletAddress(address: string) {
    if (!address) return null;
    return await User.findOne({ walletAddress: address });
  }

  async getUserByReferralCode(code: string) {
    if (!code) return null;
    return await User.findOne({ referralCode: code });
  }

  async createUser(user: InsertUser) {
    const newUser = new User(user);
    return await newUser.save();
  }

  async listUsers() {
    return await User.find();
  }

  async createPurchase(purchase: InsertPurchase) {
    const newPurchase = new Purchase(purchase);
    return await newPurchase.save();
  }

  async getPurchase(id: string) {
    return await Purchase.findById(id);
  }

  async getUserPurchases(userId: string) {
    return await Purchase.find({ userId });
  }

  async updatePurchaseStatus(id: string, status: string, txHash?: string) {
    const updateData: any = { status };
    if (txHash) updateData.txHash = txHash;
    return await Purchase.findByIdAndUpdate(id, updateData, { new: true });
  }

  async createStake(stake: InsertStake) {
    const newStake = new Stake(stake);
    return await newStake.save();
  }

  async getStake(id: string) {
    return await Stake.findById(id);
  }

  async getUserStakes(userId: string) {
    return await Stake.find({ userId });
  }

  async getUserActiveStakes(userId: string) {
    return await Stake.find({ userId, status: "active" });
  }

  async updateStakeStatus(id: string, status: string) {
    return await Stake.findByIdAndUpdate(id, { status }, { new: true });
  }

  async createReward(reward: InsertReward) {
    const newReward = new Reward(reward);
    return await newReward.save();
  }

  async getUserRewards(userId: string) {
    return await Reward.find({ userId });
  }

  async getUserMetrics(userId: string) {
    return await UserMetrics.findOne({ userId });
  }

  async createUserMetrics(metrics: InsertUserMetrics) {
    const newMetrics = new UserMetrics(metrics);
    return await newMetrics.save();
  }

  async updateUserMetrics(userId: string, metrics: Partial<InsertUserMetrics>) {
    return await UserMetrics.findOneAndUpdate(
      { userId },
      { ...metrics, updatedAt: new Date() },
      { new: true }
    );
  }
}

export const storage = new DatabaseStorage();