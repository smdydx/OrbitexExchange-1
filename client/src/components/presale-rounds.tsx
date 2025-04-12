
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PRESALE_ROUNDS } from "@/lib/constants";
import { formatNumber, formatUSD } from "@/lib/utils";
import { Link } from "wouter";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import type { CarouselApi } from '@/components/ui/carousel';

export default function PresaleRounds() {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) return;

    const intervalId = setInterval(() => {
      api.scrollNext();
    }, 3000);

    return () => clearInterval(intervalId);
  }, [api]);
  const currentRound = PRESALE_ROUNDS.find(round => round.progress < 100) || PRESALE_ROUNDS[0];
  const otherRounds = PRESALE_ROUNDS.filter(round => round !== currentRound);

  return (
    <div className="bg-[#0F172A] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-inter mb-4">Current Pre-Sale Round</h2>
          <p className="text-[#94A3B8] max-w-2xl mx-auto">
            Join our {currentRound.name} pre-sale round at the best price!
          </p>
        </div>

        {/* Current Round */}
        <div className="mb-12">
          <div className="bg-[#1E293B] p-6 rounded-xl border border-primary shadow-[0_0_30px_rgba(79,70,229,0.2)] max-w-xl mx-auto">
            <div className="text-lg font-bold mb-2">{currentRound.name}</div>
            <div className="text-2xl font-bold text-primary mb-3">{formatUSD(currentRound.price)}</div>
            <div className="text-[#94A3B8] mb-3">{formatNumber(currentRound.supply)} OBX</div>
            <Progress value={currentRound.progress} className="h-2 mb-2" />
            <div className="text-right text-sm text-[#10B981] mb-4">{currentRound.progress}% Sold</div>
            <Link href="/buy" className="block">
              <Button className="w-full bg-primary hover:bg-primary/90">Buy OBX Tokens</Button>
            </Link>
          </div>
        </div>

        {/* Other Rounds Carousel */}
        <div className="text-center mb-8">
          <h3 className="text-xl font-bold mb-4">Other Rounds</h3>
        </div>
        <Carousel
          className="w-full max-w-4xl mx-auto"
          opts={{
            align: "start",
            loop: true,
            active: true,
            skipSnaps: false,
            dragFree: false,
          }}
          setApi={setApi}
        >
          <CarouselContent>
            {otherRounds.map((round) => (
              <CarouselItem key={round.id} className="sm:basis-1/2 lg:basis-1/3">
                <div className="bg-[#1E293B] p-6 rounded-xl border border-gray-700 h-full">
                  <div className="text-lg font-bold mb-2">{round.name}</div>
                  <div className="text-2xl font-bold text-primary mb-3">{formatUSD(round.price)}</div>
                  <div className="text-[#94A3B8] mb-3">{formatNumber(round.supply)} OBX</div>
                  <Progress value={round.progress} className="h-2 mb-2" />
                  <div className="text-right text-sm">
                    {round.progress === 0 ? (
                      <span className="text-[#94A3B8]">Coming Soon</span>
                    ) : (
                      <span className="text-[#10B981]">{round.progress}% Sold</span>
                    )}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      </div>
    </div>
  );
}
