import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/common/FloatingActions";
import { Header } from "@/components/layout/Header";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { Hero } from "@/components/sections/Hero";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { WhyChooseSection } from "@/components/sections/WhyChooseSection";

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      <Header />
      <FloatingActions />
      <main>
        <Hero />
        <ServicesSection />
        <WhyChooseSection />
        <AboutSection />
        <TestimonialsSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
