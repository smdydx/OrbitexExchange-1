import { Button } from "@/components/ui/button";
import { TOKEN_LAUNCH_DATE } from "@/lib/constants";
import { Link } from "wouter";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import img1 from "@/assets/a.avif";
import img2 from "@/assets/b.avif";
import img3 from "@/assets/C.avif";


const SLIDES = [
  {
    image: img1,
    title: "Investment Platform",
    description: "Secure and efficient trading platform for crypto investments"
  },
  {
    image: img2,
    title: "Smart Trading",
    description: "Advanced trading features with real-time market data"
  },
  {
    image: img3,
    title: "Secure Transactions",
    description: "Enterprise-grade security for all your transactions"
  }
];

const defaultLogo = "/attached_assets/logo.jpg";

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative overflow-hidden bg-[#0F172A]">
      <div className="absolute inset-0 bg-gradient-radial from-primary/10 to-[#0F172A] opacity-70"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold font-inter tracking-tight mb-4">
              <span className="text-primary">Orbitex</span> Token <br/>Investment Platform
            </h1>
            <p className="text-lg text-[#94A3B8] mb-8">
              Purchase, stake and earn rewards with OBX tokens on Binance Smart Chain and Ethereum blockchain.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/buy">
                <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-6 rounded-lg font-medium shadow-[0_0_15px_rgba(79,70,229,0.5)] transition-all duration-300">
                  Buy OBX Tokens
                </Button>
              </Link>
              <Button variant="outline" className="bg-[#1E293B] hover:bg-[#334155] text-[#F8FAFC] border border-primary px-6 py-6 rounded-lg font-medium transition-all duration-300">
                View Whitepaper
              </Button>
            </div>

            <div className="mt-8 p-4 bg-[#1E293B] rounded-lg border border-gray-700">
              <div className="text-sm text-[#94A3B8] mb-2">Token Launching On:</div>
              <div className="text-xl font-bold text-primary">
                {TOKEN_LAUNCH_DATE.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              <div className="text-sm text-[#94A3B8] mt-1">Ethereum & Binance Smart Chain</div>
            </div>
          </div>

          <div className="relative">
            <Carousel 
              className="w-full max-w-lg mx-auto"
              plugins={[
                Autoplay({
                  delay: 4000,
                })
              ]}
              opts={{
                align: "center",
                loop: true,
              }}
            >
              <CarouselContent>
                {SLIDES.map((slide, index) => (
                  <CarouselItem key={index}>
                    <div className="relative group cursor-pointer overflow-hidden rounded-xl">
                      <img 
                        src={slide.image} 
                        alt={slide.title}
                        loading="eager"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = defaultLogo;
                        }}
                        className="rounded-xl shadow-lg w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-110" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                          <h3 className="text-xl font-bold mb-1">{slide.title}</h3>
                          <p className="text-sm text-gray-200">{slide.description}</p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>

            <div className="absolute -bottom-5 -right-5 bg-[#1E293B] p-4 rounded-lg border border-gray-700 shadow-[0_0_15px_rgba(79,70,229,0.5)]">
              <div className="text-sm text-[#94A3B8]">ORBITEX LIVE PRICE</div>
              <div className="text-2xl font-bold text-[#F8FAFC] mt-1">1 USDT = 0.50 OBX</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}