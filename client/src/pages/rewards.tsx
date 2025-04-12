import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MATRIX_LEVELS, RANK_REWARDS } from "@/lib/constants";
import { formatUSD } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Rewards() {
  return (
    <div className="bg-[#0F172A] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold font-inter mb-8 text-center">Reward System</h1>
        
        <Tabs defaultValue="matrix" className="mb-10">
          <TabsList className="grid w-full grid-cols-2 bg-[#1E293B] p-1 rounded-lg">
            <TabsTrigger value="matrix" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Matrix Level Income
            </TabsTrigger>
            <TabsTrigger value="ranks" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Rank & Rewards
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="matrix" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card className="bg-[#1E293B] border-gray-700 shadow-lg h-full">
                  <CardHeader>
                    <CardTitle className="text-[#F8FAFC]">Matrix Level Commission Structure</CardTitle>
                    <CardDescription className="text-[#94A3B8]">
                      Earn rewards through referrals at multiple levels
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="min-w-full">
                        <thead>
                          <tr className="border-b border-gray-700">
                            <th className="py-3 text-left text-[#94A3B8]">Level</th>
                            <th className="py-3 text-left text-[#94A3B8]">Members</th>
                            <th className="py-3 text-right text-[#94A3B8]">Commission</th>
                          </tr>
                        </thead>
                        <tbody>
                          {MATRIX_LEVELS.map((level, index) => (
                            <tr key={index} className="border-b border-gray-700">
                              <td className="py-3 text-[#F8FAFC]">{level.level}</td>
                              <td className="py-3 text-[#F8FAFC]">
                                {Math.pow(2, index) > 1000000 
                                  ? `${(Math.pow(2, index) / 1000000).toFixed(2)}M` 
                                  : Math.pow(2, index) > 1000 
                                    ? `${(Math.pow(2, index) / 1000).toFixed(1)}K` 
                                    : Math.pow(2, index)}
                              </td>
                              <td className="py-3 text-right text-[#10B981] font-bold">{level.percentage}%</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="mt-6 p-4 bg-[#0F172A] rounded-lg border border-gray-700">
                      <div className="flex items-start space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-info text-primary mt-0.5">
                          <circle cx="12" cy="12" r="10"/>
                          <path d="M12 16v-4"/>
                          <path d="M12 8h.01"/>
                        </svg>
                        <div>
                          <h4 className="text-[#F8FAFC] font-medium">How Matrix Income Works</h4>
                          <p className="text-[#94A3B8] text-sm mt-1">
                            When someone in your network purchases tokens, you earn a commission based on their level in your referral tree. The closer they are to you, the higher the commission percentage.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card className="bg-[#1E293B] border-gray-700 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-[#F8FAFC]">Binary Commission</CardTitle>
                    <CardDescription className="text-[#94A3B8]">
                      Commission based on purchase amount
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <div className="flex justify-between mb-2">
                        <span className="text-[#94A3B8]">Purchase $10 - $99</span>
                        <span className="text-[#10B981] font-bold">Binary Commission</span>
                      </div>
                      <div className="p-4 bg-[#0F172A] rounded-lg border border-gray-700 text-center">
                        <span className="text-lg text-primary">20% + 15% + 10%</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-[#94A3B8]">Purchase $100+</span>
                        <span className="text-[#10B981] font-bold">Token Holding Options</span>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="p-3 bg-[#0F172A] rounded-lg border border-gray-700 text-center">
                          <div className="text-primary font-bold">12 Months</div>
                          <div className="text-[#10B981]">6%</div>
                        </div>
                        <div className="p-3 bg-[#0F172A] rounded-lg border border-gray-700 text-center">
                          <div className="text-primary font-bold">24 Months</div>
                          <div className="text-[#10B981]">8%</div>
                        </div>
                        <div className="p-3 bg-[#0F172A] rounded-lg border border-gray-700 text-center">
                          <div className="text-primary font-bold">36 Months</div>
                          <div className="text-[#10B981]">10%</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-[#0F172A] rounded-lg border border-gray-700">
                      <h4 className="text-[#F8FAFC] font-medium mb-2">Minimum Requirements</h4>
                      <ul className="space-y-2 text-[#94A3B8] text-sm">
                        <li className="flex items-start space-x-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check text-[#10B981] mt-1">
                            <path d="M20 6 9 17l-5-5"/>
                          </svg>
                          <span>Minimum $10 purchase to qualify</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check text-[#10B981] mt-1">
                            <path d="M20 6 9 17l-5-5"/>
                          </svg>
                          <span>At least one direct referral</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="ranks" className="mt-6">
            <Card className="bg-[#1E293B] border-gray-700 shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#F8FAFC]">Rank & Reward System</CardTitle>
                <CardDescription className="text-[#94A3B8]">
                  Achieve higher ranks and earn special rewards based on your business volume
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="py-3 text-left text-[#94A3B8]">Rank</th>
                        <th className="py-3 text-center text-[#94A3B8]">Direct Business</th>
                        <th className="py-3 text-center text-[#94A3B8]">Team Business</th>
                        <th className="py-3 text-center text-[#94A3B8]">Team Commission</th>
                        <th className="py-3 text-right text-[#94A3B8]">Reward</th>
                      </tr>
                    </thead>
                    <tbody>
                      {RANK_REWARDS.map((rank, index) => (
                        <tr key={index} className="border-b border-gray-700">
                          <td className="py-3 text-[#F8FAFC]">{rank.rank}</td>
                          <td className="py-3 text-center text-primary">{formatUSD(rank.directBusiness)}</td>
                          <td className="py-3 text-center text-primary">{formatUSD(rank.teamBusiness)}</td>
                          <td className="py-3 text-center text-[#10B981]">{(5 + index * 3)}%</td>
                          <td className="py-3 text-right text-[#10B981] font-bold">{formatUSD(rank.reward)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-[#0F172A] p-5 rounded-lg border border-gray-700">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users text-primary">
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                          <circle cx="9" cy="7" r="4"/>
                          <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                        </svg>
                      </div>
                      <h3 className="font-bold text-[#F8FAFC]">Direct Business</h3>
                    </div>
                    <p className="text-[#94A3B8] text-sm">
                      Total business volume generated by your direct referrals
                    </p>
                  </div>
                  
                  <div className="bg-[#0F172A] p-5 rounded-lg border border-gray-700">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-network text-primary">
                          <rect x="16" y="16" width="6" height="6" rx="1"/>
                          <rect x="2" y="16" width="6" height="6" rx="1"/>
                          <rect x="9" y="2" width="6" height="6" rx="1"/>
                          <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/>
                          <path d="M12 12V8"/>
                        </svg>
                      </div>
                      <h3 className="font-bold text-[#F8FAFC]">Team Business</h3>
                    </div>
                    <p className="text-[#94A3B8] text-sm">
                      Combined business volume of your entire downline network
                    </p>
                  </div>
                  
                  <div className="bg-[#0F172A] p-5 rounded-lg border border-gray-700">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-award text-primary">
                          <circle cx="12" cy="8" r="6"/>
                          <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
                        </svg>
                      </div>
                      <h3 className="font-bold text-[#F8FAFC]">One-Time Reward</h3>
                    </div>
                    <p className="text-[#94A3B8] text-sm">
                      Special bonus paid when you achieve a new rank for the first time
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <Card className="bg-[#1E293B] border-gray-700 shadow-lg">
          <CardHeader>
            <CardTitle className="text-[#F8FAFC]">My Rewards</CardTitle>
            <CardDescription className="text-[#94A3B8]">
              Connect your wallet to view your earned rewards
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-16">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-wallet mx-auto text-primary mb-4">
                <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/>
                <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/>
                <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/>
              </svg>
              <h3 className="text-xl font-bold text-[#F8FAFC] mb-2">Connect Wallet to View Rewards</h3>
              <p className="text-[#94A3B8] mb-6 max-w-md mx-auto">
                Connect your wallet to see your referral statistics, earned commissions, and rewards
              </p>
              <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg font-medium shadow-[0_0_15px_rgba(79,70,229,0.5)] transition-all duration-300">
                Connect Wallet
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
