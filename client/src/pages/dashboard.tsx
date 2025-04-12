import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { shortenAddress, formatNumber, formatUSD } from "@/lib/utils";
import { RANK_REWARDS } from "@/lib/constants";
import {
  LucideWallet,
  Coins,
  BarChart3,
  Users,
  PiggyBank,
  Award,
  Clock,
  AlertTriangle,
} from "lucide-react";

export default function Dashboard() {
  const { address, isConnected } = useAccount();
  const [userId, setUserId] = useState<number | null>(null);

  // Get user by wallet address
  const { 
    data: userData,
    isLoading: isLoadingUser,
    error: userError 
  } = useQuery({
    queryKey: [`/api/users/wallet/${address}`],
    enabled: isConnected && !!address,
  });

  // If we have a user, get the dashboard data
  const { 
    data: dashboardData,
    isLoading: isLoadingDashboard,
    error: dashboardError 
  } = useQuery({
    queryKey: [`/api/users/${userId}/dashboard`],
    enabled: !!userId,
  });

  // If we have a user, get their purchases
  const { 
    data: purchasesData,
    isLoading: isLoadingPurchases,
    error: purchasesError 
  } = useQuery({
    queryKey: [`/api/users/${userId}/purchases`],
    enabled: !!userId,
  });

  // If we have a user, get their stakes
  const { 
    data: stakesData,
    isLoading: isLoadingStakes,
    error: stakesError 
  } = useQuery({
    queryKey: [`/api/users/${userId}/stakes`],
    enabled: !!userId,
  });

  // If we have a user, get their rewards
  const { 
    data: rewardsData,
    isLoading: isLoadingRewards,
    error: rewardsError 
  } = useQuery({
    queryKey: [`/api/users/${userId}/rewards`],
    enabled: !!userId,
  });

  // Set the user ID if we have a user
  useEffect(() => {
    if (userData && userData.id) {
      setUserId(userData.id);
    }
  }, [userData]);

  // Helper to calculate the rank progress
  const calculateRankProgress = () => {
    if (!dashboardData || !dashboardData.metrics) return 0;
    
    const directBusiness = parseFloat(dashboardData.metrics.directBusiness);
    const teamBusiness = parseFloat(dashboardData.metrics.teamBusiness);
    let currentRank = -1;
    let nextRank = 0;
    
    // Find the current rank
    for (let i = 0; i < RANK_REWARDS.length; i++) {
      if (directBusiness >= RANK_REWARDS[i].directBusiness && 
          teamBusiness >= RANK_REWARDS[i].teamBusiness) {
        currentRank = i;
      } else {
        nextRank = i;
        break;
      }
    }
    
    // If at max rank
    if (currentRank === RANK_REWARDS.length - 1) {
      return 100;
    }
    
    // If no rank yet
    if (currentRank === -1) {
      return Math.min(
        100 * (directBusiness / RANK_REWARDS[0].directBusiness),
        100 * (teamBusiness / RANK_REWARDS[0].teamBusiness)
      );
    }
    
    // Calculate progress to next rank
    const directProgress = (directBusiness - RANK_REWARDS[currentRank].directBusiness) / 
      (RANK_REWARDS[nextRank].directBusiness - RANK_REWARDS[currentRank].directBusiness);
    const teamProgress = (teamBusiness - RANK_REWARDS[currentRank].teamBusiness) / 
      (RANK_REWARDS[nextRank].teamBusiness - RANK_REWARDS[currentRank].teamBusiness);
    
    return Math.min(directProgress, teamProgress) * 100;
  };

  // If not connected, show connect prompt
  if (!isConnected) {
    return (
      <div className="bg-[#0F172A] min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <LucideWallet className="h-16 w-16 mx-auto text-primary mb-4" />
            <h1 className="text-3xl font-bold font-inter mb-4">Connect Wallet to View Dashboard</h1>
            <p className="text-[#94A3B8] max-w-lg mx-auto mb-8">
              Please connect your wallet to access your personalized dashboard, view your investments, staking positions, and rewards.
            </p>
            <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium shadow-[0_0_15px_rgba(79,70,229,0.5)] transition-all duration-300">
              Connect Wallet
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Loading state
  if (isLoadingUser) {
    return (
      <div className="bg-[#0F172A] min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <Clock className="h-16 w-16 mx-auto text-primary animate-pulse mb-4" />
            <h1 className="text-3xl font-bold font-inter mb-4">Loading Dashboard Data</h1>
            <p className="text-[#94A3B8] max-w-lg mx-auto">
              Please wait while we fetch your dashboard information...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (userError) {
    return (
      <div className="bg-[#0F172A] min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Alert className="bg-[#1E293B] border-[#EF4444] text-[#F8FAFC] mb-8">
            <AlertTriangle className="h-4 w-4 text-[#EF4444]" />
            <AlertDescription>
              Error loading user data. Please try again later.
            </AlertDescription>
          </Alert>
          
          <div className="text-center py-8">
            <h1 className="text-3xl font-bold font-inter mb-4">User Not Found</h1>
            <p className="text-[#94A3B8] max-w-lg mx-auto mb-6">
              It looks like your wallet address is not registered in our system yet.
              Register now to participate in Orbitex Token Sales, Staking, and Rewards.
            </p>
            <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium shadow-[0_0_15px_rgba(79,70,229,0.5)] transition-all duration-300">
              Register Now
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // User found but no dashboard data yet (loading or error)
  const isLoading = isLoadingDashboard || isLoadingPurchases || isLoadingStakes || isLoadingRewards;
  const hasError = dashboardError || purchasesError || stakesError || rewardsError;

  // Dashboard view once everything is loaded
  return (
    <div className="bg-[#0F172A] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold font-inter mb-2">Dashboard</h1>
        <p className="text-[#94A3B8] mb-8">
          Welcome back, {userData?.username || shortenAddress(address || '')}! Here's your Orbitex overview.
        </p>
        
        {hasError && (
          <Alert className="bg-[#1E293B] border-[#EF4444] text-[#F8FAFC] mb-8">
            <AlertTriangle className="h-4 w-4 text-[#EF4444]" />
            <AlertDescription>
              Error loading some dashboard data. Please try again later.
            </AlertDescription>
          </Alert>
        )}
        
        {/* Stats Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-[#1E293B] border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Coins className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-[#94A3B8] text-sm">Total Invested</p>
                  <h3 className="text-xl font-bold text-[#F8FAFC]">
                    {isLoading ? '...' : formatUSD(dashboardData?.stats?.totalInvested || 0)}
                  </h3>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-[#1E293B] border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="h-10 w-10 rounded-full bg-[#10B981]/20 flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-[#10B981]" />
                </div>
                <div>
                  <p className="text-[#94A3B8] text-sm">Total OBX Tokens</p>
                  <h3 className="text-xl font-bold text-[#F8FAFC]">
                    {isLoading ? '...' : formatNumber(dashboardData?.stats?.totalTokens || 0)}
                  </h3>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-[#1E293B] border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <PiggyBank className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-[#94A3B8] text-sm">Staked Tokens</p>
                  <h3 className="text-xl font-bold text-[#F8FAFC]">
                    {isLoading ? '...' : formatNumber(dashboardData?.stats?.totalStaked || 0)}
                  </h3>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-[#1E293B] border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="h-10 w-10 rounded-full bg-[#10B981]/20 flex items-center justify-center">
                  <Users className="h-5 w-5 text-[#10B981]" />
                </div>
                <div>
                  <p className="text-[#94A3B8] text-sm">Referral Earnings</p>
                  <h3 className="text-xl font-bold text-[#F8FAFC]">
                    {isLoading ? '...' : formatUSD(dashboardData?.stats?.totalEarned || 0)}
                  </h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Rank & Referral Information */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <Card className="bg-[#1E293B] border-gray-700 h-full">
              <CardHeader>
                <CardTitle className="text-[#F8FAFC]">Rank & Rewards Progress</CardTitle>
                <CardDescription className="text-[#94A3B8]">
                  Your current rank and progress towards the next level
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="animate-pulse flex flex-col space-y-4">
                    <div className="h-4 bg-[#334155] rounded-full w-3/4"></div>
                    <div className="h-8 bg-[#334155] rounded-full"></div>
                    <div className="h-24 bg-[#334155] rounded-lg"></div>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <span className="text-[#94A3B8] text-sm">Current Rank:</span>
                        <span className="ml-2 font-semibold text-primary">
                          {dashboardData?.metrics?.currentRank || 'No Rank Yet'}
                        </span>
                      </div>
                      <div>
                        <span className="text-[#94A3B8] text-sm">Progress to Next Rank:</span>
                        <span className="ml-2 font-semibold text-[#10B981]">
                          {Math.round(calculateRankProgress())}%
                        </span>
                      </div>
                    </div>
                    
                    <Progress 
                      value={calculateRankProgress()} 
                      className="h-3 mb-6 [&>div]:bg-gradient-to-r [&>div]:from-primary [&>div]:to-[#10B981]"
                    />
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-[#0F172A] p-4 rounded-lg">
                        <p className="text-[#94A3B8] text-sm">Direct Business</p>
                        <div className="text-lg font-bold text-[#F8FAFC]">
                          {formatUSD(parseFloat(dashboardData?.metrics?.directBusiness || "0"))}
                        </div>
                      </div>
                      <div className="bg-[#0F172A] p-4 rounded-lg">
                        <p className="text-[#94A3B8] text-sm">Team Business</p>
                        <div className="text-lg font-bold text-[#F8FAFC]">
                          {formatUSD(parseFloat(dashboardData?.metrics?.teamBusiness || "0"))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-[#0F172A] p-4 rounded-lg border border-gray-700">
                      <h4 className="text-[#F8FAFC] font-medium mb-2 flex items-center">
                        <Award className="h-4 w-4 mr-2 text-primary" />
                        Your Referral Link
                      </h4>
                      <div className="flex items-center">
                        <div className="bg-[#1E293B] p-2 rounded text-[#94A3B8] flex-grow truncate mr-2">
                          https://orbitex.io/ref/{dashboardData?.user?.referralCode || '...'}
                        </div>
                        <Button variant="outline" size="sm" className="bg-primary/10 hover:bg-primary/20 text-primary border-primary/20">
                          Copy
                        </Button>
                      </div>
                      <div className="mt-2 text-sm text-[#94A3B8]">
                        <span className="text-[#10B981] font-medium">
                          {dashboardData?.metrics?.directReferrals || 0}
                        </span> direct referrals and 
                        <span className="text-[#10B981] font-medium ml-1">
                          {dashboardData?.metrics?.totalReferrals || 0}
                        </span> total team members
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="bg-[#1E293B] border-gray-700 mb-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-[#F8FAFC]">Wallet Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-[#0F172A] p-3 rounded-lg mb-4 flex items-center">
                  <LucideWallet className="h-5 w-5 text-primary mr-2" />
                  <div className="truncate text-sm text-[#94A3B8]">
                    {address}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="bg-primary/10 hover:bg-primary/20 text-primary border-primary/20 text-sm">
                    Buy Tokens
                  </Button>
                  <Button variant="outline" className="bg-[#10B981]/10 hover:bg-[#10B981]/20 text-[#10B981] border-[#10B981]/20 text-sm">
                    Stake Tokens
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-[#1E293B] border-gray-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-[#F8FAFC]">Next Reward Milestone</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="animate-pulse flex flex-col space-y-4">
                    <div className="h-24 bg-[#334155] rounded-lg"></div>
                  </div>
                ) : (
                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-center">
                    <h4 className="text-primary font-medium mb-1">
                      {dashboardData?.metrics?.currentRank ? 'Next Rank:' : 'First Rank:'}
                    </h4>
                    <div className="text-2xl font-bold text-[#F8FAFC] mb-2">
                      {dashboardData?.metrics?.currentRank === 'VIP-5' 
                        ? 'Maximum Rank Achieved!'
                        : dashboardData?.metrics?.currentRank
                          ? RANK_REWARDS[RANK_REWARDS.findIndex(r => r.rank === dashboardData?.metrics?.currentRank) + 1]?.rank || 'VIP-1'
                          : 'VIP-1'
                      }
                    </div>
                    <div className="text-sm text-[#94A3B8] mb-2">
                      Reward: 
                      <span className="text-[#10B981] ml-1 font-medium">
                        {dashboardData?.metrics?.currentRank === 'VIP-5' 
                          ? 'None'
                          : dashboardData?.metrics?.currentRank
                            ? formatUSD(RANK_REWARDS[RANK_REWARDS.findIndex(r => r.rank === dashboardData?.metrics?.currentRank) + 1]?.reward || 50)
                            : formatUSD(50)
                        }
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Tabs for Purchases, Stakes, and Rewards */}
        <Tabs defaultValue="purchases" className="mb-8">
          <TabsList className="grid w-full grid-cols-3 bg-[#1E293B] p-1 rounded-lg">
            <TabsTrigger value="purchases" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Purchases
            </TabsTrigger>
            <TabsTrigger value="stakes" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Stakes
            </TabsTrigger>
            <TabsTrigger value="rewards" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Rewards
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="purchases" className="mt-6">
            <Card className="bg-[#1E293B] border-gray-700">
              <CardHeader>
                <CardTitle className="text-[#F8FAFC]">Your Token Purchases</CardTitle>
                <CardDescription className="text-[#94A3B8]">
                  History of your OBX token purchases
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingPurchases ? (
                  <div className="animate-pulse flex flex-col space-y-4">
                    <div className="h-12 bg-[#334155] rounded-lg"></div>
                    <div className="h-12 bg-[#334155] rounded-lg"></div>
                    <div className="h-12 bg-[#334155] rounded-lg"></div>
                  </div>
                ) : purchasesData && purchasesData.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="border-b border-gray-700">
                          <th className="py-3 text-left text-[#94A3B8]">Date</th>
                          <th className="py-3 text-center text-[#94A3B8]">Amount (OBX)</th>
                          <th className="py-3 text-center text-[#94A3B8]">Price (USDT)</th>
                          <th className="py-3 text-right text-[#94A3B8]">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {purchasesData.map((purchase: any) => (
                          <tr key={purchase.id} className="border-b border-gray-700">
                            <td className="py-3 text-[#F8FAFC]">
                              {new Date(purchase.createdAt).toLocaleDateString()}
                            </td>
                            <td className="py-3 text-center text-[#F8FAFC]">
                              {formatNumber(parseFloat(purchase.amount))}
                            </td>
                            <td className="py-3 text-center text-[#F8FAFC]">
                              {formatUSD(parseFloat(purchase.usdtAmount))}
                            </td>
                            <td className="py-3 text-right">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                purchase.status === 'completed' 
                                  ? 'bg-[#10B981]/20 text-[#10B981]' 
                                  : purchase.status === 'pending'
                                    ? 'bg-primary/20 text-primary'
                                    : 'bg-[#EF4444]/20 text-[#EF4444]'
                              }`}>
                                {purchase.status.charAt(0).toUpperCase() + purchase.status.slice(1)}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <Coins className="h-12 w-12 mx-auto text-[#94A3B8] mb-3" />
                    <h3 className="text-[#F8FAFC] font-medium">No Purchases Yet</h3>
                    <p className="text-[#94A3B8] text-sm mt-1 max-w-md mx-auto">
                      You haven't made any token purchases yet. Start investing to earn rewards and climb the ranks!
                    </p>
                    <Button className="mt-4 bg-primary hover:bg-primary/90 text-white">
                      Buy OBX Tokens
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="stakes" className="mt-6">
            <Card className="bg-[#1E293B] border-gray-700">
              <CardHeader>
                <CardTitle className="text-[#F8FAFC]">Your Staking Positions</CardTitle>
                <CardDescription className="text-[#94A3B8]">
                  Overview of your OBX token staking
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingStakes ? (
                  <div className="animate-pulse flex flex-col space-y-4">
                    <div className="h-12 bg-[#334155] rounded-lg"></div>
                    <div className="h-12 bg-[#334155] rounded-lg"></div>
                    <div className="h-12 bg-[#334155] rounded-lg"></div>
                  </div>
                ) : stakesData && stakesData.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="border-b border-gray-700">
                          <th className="py-3 text-left text-[#94A3B8]">Start Date</th>
                          <th className="py-3 text-center text-[#94A3B8]">Amount (OBX)</th>
                          <th className="py-3 text-center text-[#94A3B8]">Duration</th>
                          <th className="py-3 text-center text-[#94A3B8]">Rate</th>
                          <th className="py-3 text-center text-[#94A3B8]">Reward</th>
                          <th className="py-3 text-right text-[#94A3B8]">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stakesData.map((stake: any) => (
                          <tr key={stake.id} className="border-b border-gray-700">
                            <td className="py-3 text-[#F8FAFC]">
                              {new Date(stake.startDate).toLocaleDateString()}
                            </td>
                            <td className="py-3 text-center text-[#F8FAFC]">
                              {formatNumber(parseFloat(stake.amount))}
                            </td>
                            <td className="py-3 text-center text-[#F8FAFC]">
                              {stake.months} Months
                            </td>
                            <td className="py-3 text-center text-[#10B981]">
                              {parseFloat(stake.rate)}%
                            </td>
                            <td className="py-3 text-center text-[#F8FAFC]">
                              {formatNumber(parseFloat(stake.reward))}
                            </td>
                            <td className="py-3 text-right">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                stake.status === 'active' 
                                  ? 'bg-[#10B981]/20 text-[#10B981]' 
                                  : stake.status === 'completed'
                                    ? 'bg-primary/20 text-primary'
                                    : 'bg-[#94A3B8]/20 text-[#94A3B8]'
                              }`}>
                                {stake.status.charAt(0).toUpperCase() + stake.status.slice(1)}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <PiggyBank className="h-12 w-12 mx-auto text-[#94A3B8] mb-3" />
                    <h3 className="text-[#F8FAFC] font-medium">No Active Stakes</h3>
                    <p className="text-[#94A3B8] text-sm mt-1 max-w-md mx-auto">
                      You don't have any staking positions yet. Stake your OBX tokens to earn interest rewards!
                    </p>
                    <Button className="mt-4 bg-[#10B981] hover:bg-[#10B981]/90 text-white">
                      Stake OBX Tokens
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="rewards" className="mt-6">
            <Card className="bg-[#1E293B] border-gray-700">
              <CardHeader>
                <CardTitle className="text-[#F8FAFC]">Your Reward Earnings</CardTitle>
                <CardDescription className="text-[#94A3B8]">
                  Referral commissions and matrix level income
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingRewards ? (
                  <div className="animate-pulse flex flex-col space-y-4">
                    <div className="h-12 bg-[#334155] rounded-lg"></div>
                    <div className="h-12 bg-[#334155] rounded-lg"></div>
                    <div className="h-12 bg-[#334155] rounded-lg"></div>
                  </div>
                ) : rewardsData && rewardsData.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="border-b border-gray-700">
                          <th className="py-3 text-left text-[#94A3B8]">Date</th>
                          <th className="py-3 text-left text-[#94A3B8]">Type</th>
                          <th className="py-3 text-center text-[#94A3B8]">Level</th>
                          <th className="py-3 text-center text-[#94A3B8]">Rate</th>
                          <th className="py-3 text-right text-[#94A3B8]">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rewardsData.map((reward: any) => (
                          <tr key={reward.id} className="border-b border-gray-700">
                            <td className="py-3 text-[#F8FAFC]">
                              {new Date(reward.createdAt).toLocaleDateString()}
                            </td>
                            <td className="py-3 text-[#F8FAFC]">
                              Referral Commission
                            </td>
                            <td className="py-3 text-center text-[#F8FAFC]">
                              Level {reward.level}
                            </td>
                            <td className="py-3 text-center text-[#10B981]">
                              {parseFloat(reward.percentage)}%
                            </td>
                            <td className="py-3 text-right text-[#F8FAFC]">
                              {formatUSD(parseFloat(reward.amount))}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <Award className="h-12 w-12 mx-auto text-[#94A3B8] mb-3" />
                    <h3 className="text-[#F8FAFC] font-medium">No Rewards Yet</h3>
                    <p className="text-[#94A3B8] text-sm mt-1 max-w-md mx-auto">
                      Start referring users and building your network to earn commission rewards at multiple levels!
                    </p>
                    <Button className="mt-4 bg-primary hover:bg-primary/90 text-white">
                      Share Referral Link
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
