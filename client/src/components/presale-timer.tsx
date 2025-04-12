import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useCountdown } from "@/hooks/use-countdown";
import { PRESALE_END_DATE, CURRENT_SOLD_PERCENTAGE, CURRENT_PRICE, TOTAL_SUPPLY } from "@/lib/constants";
import { formatNumber, formatUSD } from "@/lib/utils";
import { Link } from "wouter";

export default function PresaleTimer() {
  const { days, hours, minutes, seconds } = useCountdown(PRESALE_END_DATE);

  return (
    <div className="bg-[#1E293B] border-y border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <h2 className="text-2xl font-bold font-inter mb-2">Pre-Sale Will End In</h2>
            <div className="flex space-x-4 my-4">
              <div className="bg-[#0F172A] p-4 rounded-lg text-center min-w-[70px]">
                <div className="text-2xl font-bold text-primary" id="days">{days}</div>
                <div className="text-xs text-[#94A3B8] mt-1">Days</div>
              </div>
              <div className="bg-[#0F172A] p-4 rounded-lg text-center min-w-[70px]">
                <div className="text-2xl font-bold text-primary" id="hours">{hours}</div>
                <div className="text-xs text-[#94A3B8] mt-1">Hours</div>
              </div>
              <div className="bg-[#0F172A] p-4 rounded-lg text-center min-w-[70px]">
                <div className="text-2xl font-bold text-primary" id="minutes">{minutes}</div>
                <div className="text-xs text-[#94A3B8] mt-1">Minutes</div>
              </div>
              <div className="bg-[#0F172A] p-4 rounded-lg text-center min-w-[70px]">
                <div className="text-2xl font-bold text-primary" id="seconds">{seconds}</div>
                <div className="text-xs text-[#94A3B8] mt-1">Seconds</div>
              </div>
            </div>
            <Link href="/buy">
              <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium shadow-[0_0_15px_rgba(79,70,229,0.5)] transition-all duration-300">
                Register & Buy Tokens Now
              </Button>
            </Link>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-[#94A3B8]">Pre-Sale Progress</span>
              <span className="text-[#F8FAFC] font-medium">{CURRENT_SOLD_PERCENTAGE}%</span>
            </div>
            <Progress 
              value={CURRENT_SOLD_PERCENTAGE} 
              className="w-full h-4 mb-4 [&>div]:bg-gradient-to-r [&>div]:from-primary [&>div]:to-[#10B981] bg-[#0F172A]" 
            />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-[#94A3B8] text-sm">Current Rate</span>
                <div className="text-xl font-bold text-[#10B981]">{formatUSD(CURRENT_PRICE)}</div>
              </div>
              <div>
                <span className="text-[#94A3B8] text-sm">Total Sale</span>
                <div className="text-xl font-bold text-[#F8FAFC]">{formatNumber(TOTAL_SUPPLY)} OBX</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
