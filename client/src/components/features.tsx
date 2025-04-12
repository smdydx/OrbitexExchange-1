import { FEATURES } from "@/lib/constants";

export default function Features() {
  return (
    <div className="bg-[#1E293B] py-16 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-inter mb-4">Why Choose Orbitex?</h2>
          <p className="text-[#94A3B8] max-w-2xl mx-auto">
            Powered by Binance Smart Chain technology with a focus on security, transparency, and user rewards.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => (
            <div key={index} className="bg-[#0F172A] p-6 rounded-xl border border-gray-700 hover:shadow-[0_0_15px_rgba(79,70,229,0.5)] transition-all duration-300">
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                {feature.icon === 'shield-alt' && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield text-primary text-xl">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
                  </svg>
                )}
                {feature.icon === 'wallet' && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-wallet text-primary text-xl">
                    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/>
                    <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/>
                    <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/>
                  </svg>
                )}
                {feature.icon === 'chart-line' && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-line-chart text-primary text-xl">
                    <path d="M3 3v18h18"/>
                    <path d="m19 9-5 5-4-4-3 3"/>
                  </svg>
                )}
                {feature.icon === 'hand-holding-usd' && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-hand-coins text-primary text-xl">
                    <path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1-.4-1-1v-1a2 2 0 0 1 4 0"/>
                    <path d="M11 12h1"/>
                    <path d="M8 7a4 4 0 1 0 8 0 4 4 0 0 0-8 0"/>
                    <path d="m16.01 17.12-1.2 5a1.98 1.98 0 0 1-1.96 1.53h-1.7c-.85 0-1.65-.54-1.96-1.32l-2.36-5.92"/>
                    <path d="M14.5 17.1h-6a2 2 0 1 1 0-4h4.16"/>
                  </svg>
                )}
                {feature.icon === 'code' && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-code text-primary text-xl">
                    <polyline points="16 18 22 12 16 6"/>
                    <polyline points="8 6 2 12 8 18"/>
                  </svg>
                )}
                {feature.icon === 'exchange-alt' && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-repeat text-primary text-xl">
                    <path d="m17 2 4 4-4 4"/>
                    <path d="M3 11v-1a4 4 0 0 1 4-4h14"/>
                    <path d="m7 22-4-4 4-4"/>
                    <path d="M21 13v1a4 4 0 0 1-4 4H3"/>
                  </svg>
                )}
              </div>
              <h3 className="text-xl font-bold font-inter mb-2">{feature.title}</h3>
              <p className="text-[#94A3B8]">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
