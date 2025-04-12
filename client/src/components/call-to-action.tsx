import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function CallToAction() {
  return (
    <div className="bg-[#0F172A] py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-primary/10 to-[#0F172A] opacity-70"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold font-inter mb-6">Ready to Join the Orbitex Ecosystem?</h2>
          <p className="text-[#94A3B8] text-lg mb-8">
            Don't miss your opportunity to participate in our token pre-sale. Get in early for the best prices and start earning rewards.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/buy">
              <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg font-medium shadow-[0_0_15px_rgba(79,70,229,0.5)] transition-all duration-300 text-lg">
                Buy OBX Tokens
              </Button>
            </Link>
            <Button variant="outline" className="bg-[#1E293B] hover:bg-[#334155] text-[#F8FAFC] border border-primary px-8 py-4 rounded-lg font-medium transition-all duration-300 text-lg">
              Learn More
            </Button>
          </div>
          <div className="mt-8 text-[#94A3B8]">
            <p>Want to get involved? <a href="#" className="text-primary hover:text-primary/80">Contact our team</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}
