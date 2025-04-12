import { MATRIX_LEVELS, RANK_REWARDS, STAKING_PERIODS } from "@/lib/constants";
import { formatUSD } from "@/lib/utils";

export default function MatrixIncome() {
  return (
    <div className="bg-[#0F172A] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-inter mb-4">Matrix Level Income System</h2>
          <p className="text-[#94A3B8] max-w-2xl mx-auto">
            Earn rewards through our multi-level referral system with varying commission rates at each level.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Matrix Level Income Table */}
          <div className="bg-[#1E293B] rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-bold font-inter mb-6">Level Commission Structure</h3>
            
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="py-3 text-left text-[#94A3B8]">Level</th>
                    <th className="py-3 text-right text-[#94A3B8]">Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {MATRIX_LEVELS.map((level, index) => (
                    <tr key={index} className="border-b border-gray-700">
                      <td className="py-3 text-[#F8FAFC]">{level.level}</td>
                      <td className="py-3 text-right text-[#10B981] font-bold">{level.percentage}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 p-4 bg-[#0F172A] rounded-lg border border-gray-700">
              <p className="text-center text-[#94A3B8]">
                Minimum purchase of $10 required to enter the matrix system
              </p>
            </div>
          </div>
          
          {/* Matrix Visual */}
          <div>
            <div className="bg-[#1E293B] rounded-xl p-6 border border-gray-700 mb-6">
              <h3 className="text-xl font-bold font-inter mb-6">Binary Commission</h3>
              
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
                  {STAKING_PERIODS.map((period) => (
                    <div key={period.id} className="p-3 bg-[#0F172A] rounded-lg border border-gray-700 text-center">
                      <div className="text-primary font-bold">{period.months} Months</div>
                      <div className="text-[#10B981]">{period.rate}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-[#1E293B] rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold font-inter mb-6">Rank & Reward System</h3>
              
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="py-2 text-left text-[#94A3B8]">Rank</th>
                      <th className="py-2 text-center text-[#94A3B8]">Direct Business</th>
                      <th className="py-2 text-center text-[#94A3B8]">Team Business</th>
                      <th className="py-2 text-right text-[#94A3B8]">Reward</th>
                    </tr>
                  </thead>
                  <tbody>
                    {RANK_REWARDS.map((rank, index) => (
                      <tr key={index} className="border-b border-gray-700">
                        <td className="py-2 text-[#F8FAFC]">{rank.rank}</td>
                        <td className="py-2 text-center text-primary">{formatUSD(rank.directBusiness)}</td>
                        <td className="py-2 text-center text-primary">{formatUSD(rank.teamBusiness)}</td>
                        <td className="py-2 text-right text-[#10B981]">{formatUSD(rank.reward)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 p-3 bg-[#0F172A] rounded-lg border border-gray-700 text-center text-[#94A3B8] text-sm">
                Additional 5-20% team business commission based on rank level
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <a href="#" className="text-primary hover:text-primary/80 font-medium">
            View Detailed Commission Structure 
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right inline-block ml-1">
              <path d="M5 12h14"/>
              <path d="m12 5 7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
