import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CURRENT_PRICE, STAKING_PERIODS } from "@/lib/constants";
import { calculateTokenAmount, calculateStakingReward, cn, formatNumber } from "@/lib/utils";

export default function TokenAction() {
  const [usdtAmount, setUsdtAmount] = useState<number>(100);
  const [stakeAmount, setStakeAmount] = useState<number>(1000);
  const [selectedPeriod, setSelectedPeriod] = useState<number>(2);
  
  const obxAmount = calculateTokenAmount(usdtAmount, CURRENT_PRICE);
  
  const selectedStakingPeriod = STAKING_PERIODS.find(period => period.id === selectedPeriod);
  const stakingReward = calculateStakingReward(
    stakeAmount, 
    selectedStakingPeriod?.rate || 0, 
    selectedStakingPeriod?.months || 0
  );

  return (
    <div className="bg-[#1E293B] py-16 border-y border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Token Buy Section */}
          <div className="bg-[#0F172A] rounded-xl p-6 border border-gray-700">
            <div className="flex items-center mb-6">
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-coins"><circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/></svg>
              </div>
              <h3 className="text-xl font-bold font-inter">Buy OBX Tokens</h3>
            </div>
            
            <div className="mb-6">
              <Label className="block text-[#94A3B8] text-sm mb-2">Amount in USDT</Label>
              <div className="relative">
                <Input 
                  type="number" 
                  className="w-full bg-[#334155] border border-gray-700 rounded-lg p-3 text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-primary" 
                  placeholder="100"
                  value={usdtAmount}
                  onChange={(e) => setUsdtAmount(parseFloat(e.target.value) || 0)}
                />
                <div className="absolute right-3 top-3 text-[#94A3B8]">USDT</div>
              </div>
            </div>
            
            <div className="mb-6">
              <Label className="block text-[#94A3B8] text-sm mb-2">You will receive</Label>
              <div className="relative">
                <Input 
                  type="number" 
                  className="w-full bg-[#334155] border border-gray-700 rounded-lg p-3 text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-primary" 
                  value={obxAmount}
                  readOnly
                />
                <div className="absolute right-3 top-3 text-[#94A3B8]">OBX</div>
              </div>
            </div>
            
            <div className="text-[#94A3B8] text-sm mb-6">
              <div className="flex justify-between mb-1">
                <span>Current Rate</span>
                <span className="text-[#F8FAFC]">1 USDT = {CURRENT_PRICE} OBX</span>
              </div>
              <div className="flex justify-between">
                <span>Minimum Purchase</span>
                <span className="text-[#F8FAFC]">10 USDT</span>
              </div>
            </div>
            
            <Button className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-medium shadow-[0_0_15px_rgba(79,70,229,0.5)] transition-all duration-300">
              Buy Tokens
            </Button>
          </div>
          
          {/* Token Stake Section */}
          <div className="bg-[#0F172A] rounded-xl p-6 border border-gray-700">
            <div className="flex items-center mb-6">
              <div className="h-10 w-10 rounded-full bg-[#10B981] flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-piggy-bank"><path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2 0-.3.5-1 1-1h2V5z"/><path d="M2 9v1c0 1.1.9 2 2 2h1"/><path d="M16 11h0"/></svg>
              </div>
              <h3 className="text-xl font-bold font-inter">Stake OBX Tokens</h3>
            </div>
            
            <div className="mb-6">
              <Label className="block text-[#94A3B8] text-sm mb-2">Amount to Stake</Label>
              <div className="relative">
                <Input 
                  type="number" 
                  className="w-full bg-[#334155] border border-gray-700 rounded-lg p-3 text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#10B981]" 
                  placeholder="1000"
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(parseFloat(e.target.value) || 0)}
                />
                <div className="absolute right-3 top-3 text-[#94A3B8]">OBX</div>
              </div>
            </div>
            
            <div className="mb-6">
              <Label className="block text-[#94A3B8] text-sm mb-2">Staking Period</Label>
              <div className="grid grid-cols-3 gap-3">
                {STAKING_PERIODS.map((period) => (
                  <div 
                    key={period.id}
                    className={cn(
                      "text-center p-3 bg-[#334155] border rounded-lg cursor-pointer hover:border-[#10B981]",
                      selectedPeriod === period.id ? "border-[#10B981]" : "border-gray-700"
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
            
            <div className="text-[#94A3B8] text-sm mb-6">
              <div className="flex justify-between mb-1">
                <span>Selected Period</span>
                <span className="text-[#F8FAFC]">{selectedStakingPeriod?.months} Months</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Reward</span>
                <span className="text-[#10B981]">{formatNumber(stakingReward)} OBX ({selectedStakingPeriod?.rate}%)</span>
              </div>
            </div>
            
            <Button className="w-full bg-[#10B981] hover:bg-[#10B981]/90 text-white py-3 rounded-lg font-medium shadow-[0_0_15px_rgba(16,185,129,0.5)] transition-all duration-300">
              Stake Tokens
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
