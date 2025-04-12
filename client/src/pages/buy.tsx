import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CURRENT_PRICE, STAKING_PERIODS } from '@/lib/constants';
import { calculateTokenAmount, cn, formatNumber } from '@/lib/utils';

export default function Buy() {
  const [usdtAmount, setUsdtAmount] = useState<number>(100);
  const [stakeAmount, setStakeAmount] = useState<number>(0);
  const [selectedPeriod, setSelectedPeriod] = useState<number>(1);
  const obxAmount = calculateTokenAmount(usdtAmount, CURRENT_PRICE);

  const selectedStakingPeriod = STAKING_PERIODS.find(period => period.id === selectedPeriod);
  const stakingReward = stakeAmount * (selectedStakingPeriod?.rate || 0) / 100;

  return (
    <div className="bg-[#0F172A] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold font-inter mb-8 text-center">Buy & Stake OBX Tokens</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Buy Section */}
          <Card className="bg-[#1E293B] border-gray-700 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-[#F8FAFC]">Purchase Orbitex Tokens</CardTitle>
              <CardDescription className="text-[#94A3B8]">
                Join the Orbitex ecosystem and gain access to various rewards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div>
                  <Label htmlFor="usdt-amount" className="text-[#F8FAFC]">Amount in USDT</Label>
                  <div className="relative mt-2">
                    <Input
                      id="usdt-amount"
                      type="number"
                      className="bg-[#334155] border-gray-700 text-[#F8FAFC]"
                      placeholder="Enter amount"
                      value={usdtAmount}
                      onChange={(e) => setUsdtAmount(parseFloat(e.target.value) || 0)}
                    />
                    <div className="absolute right-3 top-3 text-[#94A3B8]">USDT</div>
                  </div>
                </div>

                <div>
                  <Label className="text-[#94A3B8] mb-2 block">You will receive</Label>
                  <div className="relative">
                    <Input
                      type="number"
                      className="bg-[#334155] border-gray-700 text-[#F8FAFC]"
                      value={obxAmount}
                      readOnly
                    />
                    <div className="absolute right-3 top-3 text-[#94A3B8]">OBX</div>
                  </div>
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                  Buy Tokens
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Stake Section */}
          <Card className="bg-[#1E293B] border-gray-700 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-[#F8FAFC]">Stake Your Tokens</CardTitle>
              <CardDescription className="text-[#94A3B8]">
                Earn rewards by staking your OBX tokens
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div>
                  <Label className="text-[#F8FAFC] mb-2 block">Amount to Stake</Label>
                  <div className="relative">
                    <Input
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

                <div className="text-[#94A3B8] text-sm space-y-2">
                  <div className="flex justify-between">
                    <span>Selected Period</span>
                    <span className="text-[#F8FAFC]">{selectedStakingPeriod?.months} Months</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Reward</span>
                    <span className="text-[#10B981]">{formatNumber(stakingReward)} OBX</span>
                  </div>
                </div>

                <Button className="w-full bg-[#10B981] hover:bg-[#10B981]/90 text-white">
                  Stake Tokens
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}