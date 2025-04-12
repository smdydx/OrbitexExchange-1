import { Link } from "wouter";
import { Rocket } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1E293B] text-[#94A3B8] pt-12 pb-6 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                <Rocket className="h-5 w-5 text-white" />
              </div>
              <span className="ml-2 text-xl font-bold text-[#F8FAFC] font-inter">ORBITEX</span>
            </div>
            <p className="mb-4">A next-generation crypto token investment platform on Binance Smart Chain.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-[#94A3B8] hover:text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              <a href="#" className="text-[#94A3B8] hover:text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
              </a>
              <a href="#" className="text-[#94A3B8] hover:text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              </a>
              <a href="#" className="text-[#94A3B8] hover:text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layout-dashboard"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold text-[#F8FAFC] mb-4 font-inter">Quick Links</h4>
            <ul className="space-y-2">
              <li><div className="hover:text-primary cursor-pointer" onClick={() => window.location.href = "/"}>Home</div></li>
              <li><div className="hover:text-primary cursor-pointer" onClick={() => window.location.href = "/buy"}>Buy Tokens</div></li>
              <li><div className="hover:text-primary cursor-pointer" onClick={() => window.location.href = "/stake"}>Staking</div></li>
              <li><div className="hover:text-primary cursor-pointer" onClick={() => window.location.href = "/rewards"}>Rewards</div></li>
              <li><div className="hover:text-primary cursor-pointer" onClick={() => window.location.href = "/dashboard"}>Dashboard</div></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold text-[#F8FAFC] mb-4 font-inter">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-primary">Whitepaper</a></li>
              <li><a href="#" className="hover:text-primary">Documentation</a></li>
              <li><a href="#" className="hover:text-primary">Smart Contracts</a></li>
              <li><a href="#" className="hover:text-primary">Roadmap</a></li>
              <li><a href="#" className="hover:text-primary">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold text-[#F8FAFC] mb-4 font-inter">Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail mt-1 mr-2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                <span>support@orbitex.io</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-globe mt-1 mr-2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                <span>www.orbitex.io</span>
              </li>
              <li>
                <button className="mt-4 bg-primary/20 hover:bg-primary/30 text-primary px-4 py-2 rounded-lg transition-colors duration-300">
                  Join Our Community
                </button>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; 2023 Orbitex. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-[#94A3B8] hover:text-primary">Terms of Service</a>
            <a href="#" className="text-[#94A3B8] hover:text-primary">Privacy Policy</a>
            <a href="#" className="text-[#94A3B8] hover:text-primary">Legal</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
