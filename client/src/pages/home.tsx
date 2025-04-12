import HeroSection from "@/components/hero-section";
import PresaleTimer from "@/components/presale-timer";
import PresaleRounds from "@/components/presale-rounds";
import Features from "@/components/features";
import CallToAction from "@/components/call-to-action";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <PresaleTimer />
      <PresaleRounds />
      <Features />
      <CallToAction />
    </div>
  );
}
