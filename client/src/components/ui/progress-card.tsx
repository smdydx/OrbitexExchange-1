import { Progress } from "@/components/ui/progress";

interface ProgressCardProps {
  name: string;
  price: number;
  supply: number;
  sold: number;
  progress: number;
}

export function ProgressCard({ name, price, supply, sold, progress }: ProgressCardProps) {
  return (
    <div className="bg-[#1E293B] p-6 rounded-lg border border-gray-700 hover:shadow-[0_0_15px_rgba(79,70,229,0.5)] transition-all duration-300">
      <div className="text-lg font-semibold mb-2">{name}</div>
      <div className="text-2xl font-bold text-primary mb-4">${price.toFixed(2)}</div>
      <div className="text-[#94A3B8]">{supply.toLocaleString()} OBX</div>
      <div className="mt-4 w-full bg-[#0F172A] rounded-full h-2">
        <div 
          className="bg-primary h-2 rounded-full" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className={`text-xs ${progress > 0 ? 'text-[#10B981]' : 'text-[#94A3B8]'} mt-1 text-right`}>
        {progress === 0 ? 'Coming Soon' : `${progress}% Sold`}
      </div>
    </div>
  );
}
