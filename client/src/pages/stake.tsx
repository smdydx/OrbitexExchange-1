import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { STAKING_PERIODS } from "@/lib/constants";
import { calculateStakingReward, cn, formatNumber } from "@/lib/utils";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export default function Stake() {
  const [stakeAmount, setStakeAmount] = useState<number>(1000);
  const [selectedPeriod, setSelectedPeriod] = useState<number>(2);
  
  const selectedStakingPeriod = STAKING_PERIODS.find(period => period.id === selectedPeriod);
  const stakingReward = calculateStakingReward(
    stakeAmount, 
    selectedStakingPeriod?.rate || 0, 
    selectedStakingPeriod?.months || 0
  );

  return (
    <div className="bg-[#0F172A] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold font-inter mb-8 text-center">Stake OBX Tokens</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="bg-[#1E293B] border-gray-700 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-[#F8FAFC]">Stake Your Orbitex Tokens</CardTitle>
                <CardDescription className="text-[#94A3B8]">
                  Lock your tokens and earn rewards based on your staking period
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div>
                    <Label htmlFor="stake-amount" className="text-[#F8FAFC]">Amount to Stake</Label>
                    <div className="relative mt-2">
                      <Input
                        id="stake-amount"
                        type="number"
                        className="bg-[#334155] border-gray-700 text-[#F8FAFC]"
                        placeholder="Enter amount"
                        value={stakeAmount}
                        onChange={(e) => setStakeAmount(parseFloat(e.target.value) || 0)}
                      />
                      <div className="absolute right-3 top-3 text-[#94A3B8]">OBX</div>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-[#F8FAFC] mb-2 block">Staking Period</Label>
                    <div className="grid grid-cols-3 gap-3">
                      {STAKING_PERIODS.map((period) => (
                        <div 
                          key={period.id}
                          className={cn(
                            "text-center p-4 bg-[#334155] border rounded-lg cursor-pointer transition-all",
                            selectedPeriod === period.id ? "border-[#10B981] shadow-[0_0_10px_rgba(16,185,129,0.3)]" : "border-gray-700 hover:border-[#10B981]"
                          )}
                          onClick={() => setSelectedPeriod(period.id)}
                        >
                          <div className="text-lg font-bold text-[#F8FAFC]">{period.months}</div>
                          <div className="text-xs text-[#94A3B8]">Months</div>
                          <div className="text-sm text-[#10B981] mt-1">{period.rate}%</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-[#94A3B8]">
                    <div className="bg-[#0F172A] p-3 rounded-lg">
                      <div className="text-sm">Lock Period</div>
                      <div className="text-lg font-semibold text-[#F8FAFC]">{selectedStakingPeriod?.months} Months</div>
                    </div>
                    <div className="bg-[#0F172A] p-3 rounded-lg">
                      <div className="text-sm">APY Rate</div>
                      <div className="text-lg font-semibold text-[#10B981]">{selectedStakingPeriod?.rate}%</div>
                    </div>
                  </div>
                  
                  <div className="bg-[#0F172A]/50 p-4 rounded-lg border border-[#10B981]/30">
                    <div className="flex items-start space-x-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calculator text-[#10B981] mt-0.5">
                        <rect width="16" height="20" x="4" y="2" rx="2"/>
                        <line x1="8" x2="16" y1="6" y2="6"/>
                        <line x1="16" x2="16" y1="14" y2="18"/>
                        <path d="M16 10h.01"/>
                        <path d="M12 10h.01"/>
                        <path d="M8 10h.01"/>
                        <path d="M12 14h.01"/>
                        <path d="M8 14h.01"/>
                        <path d="M12 18h.01"/>
                        <path d="M8 18h.01"/>
                      </svg>
                      <div>
                        <h4 className="text-[#F8FAFC] font-medium">Staking Reward Calculator</h4>
                        <p className="text-[#94A3B8] text-sm mt-1">
                          Lock {formatNumber(stakeAmount)} OBX for {selectedStakingPeriod?.months} months to earn approximately {formatNumber(stakingReward)} OBX in rewards.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-[#10B981] hover:bg-[#10B981]/90 text-white py-6 rounded-lg font-medium shadow-[0_0_15px_rgba(16,185,129,0.5)] transition-all duration-300">
                  Stake Tokens
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div>
            <Card className="bg-[#1E293B] border-gray-700 shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#F8FAFC]">My Staking</CardTitle>
                <CardDescription className="text-[#94A3B8]">
                  Overview of your current staking positions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="active">
                  <TabsList className="grid w-full grid-cols-2 bg-[#0F172A]">
                    <TabsTrigger value="active" className="data-[state=active]:bg-[#334155]">Active</TabsTrigger>
                    <TabsTrigger value="history" className="data-[state=active]:bg-[#334155]">History</TabsTrigger>
                  </TabsList>
                  <TabsContent value="active">
                    <div className="text-center py-10">
                      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-package-plus mx-auto text-[#94A3B8] mb-3">
                        <path d="M16 16h6"/>
                        <path d="M19 13v6"/>
                        <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"/>
                        <path d="m7.5 4.27 9 5.15"/>
                        <polyline points="3.29 7 12 12 20.71 7"/>
                        <line x1="12" x2="12" y1="22" y2="12"/>
                      </svg>
                      <h3 className="text-[#F8FAFC] font-medium">No Active Stakes</h3>
                      <p className="text-[#94A3B8] text-sm mt-1">
                        You don't have any active staking positions yet
                      </p>
                    </div>
                  </TabsContent>
                  <TabsContent value="history">
                    <div className="text-center py-10">
                      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-history mx-auto text-[#94A3B8] mb-3">
                        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                        <path d="M3 3v5h5"/>
                        <path d="M12 7v5l4 2"/>
                      </svg>
                      <h3 className="text-[#F8FAFC] font-medium">No Staking History</h3>
                      <p className="text-[#94A3B8] text-sm mt-1">
                        Your staking history will appear here
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
                
                <div className="mt-6 p-4 bg-[#0F172A] rounded-lg border border-gray-700">
                  <h4 className="text-[#F8FAFC] font-medium mb-2">Staking Benefits</h4>
                  <ul className="space-y-2 text-[#94A3B8] text-sm">
                    <li className="flex items-start space-x-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check text-[#10B981] mt-1">
                        <path d="M20 6 9 17l-5-5"/>
                      </svg>
                      <span>Earn passive income through staking rewards</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check text-[#10B981] mt-1">
                        <path d="M20 6 9 17l-5-5"/>
                      </svg>
                      <span>Higher ranking in the referral system</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check text-[#10B981] mt-1">
                        <path d="M20 6 9 17l-5-5"/>
                      </svg>
                      <span>Exclusive access to platform features</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
