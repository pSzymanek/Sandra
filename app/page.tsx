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
import { profileUrl } from "@/data/site-content";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Psychoterapia Sandra Anczarska",
  url: "https://sandra-ten.vercel.app",
  image: "https://sandra-ten.vercel.app/images/sandra-anczarska.jpg",
  description:
    "Psychoterapia i wsparcie psychologiczne w Mysłowicach oraz online. Sandra Anczarska, psycholog i psychoterapeutka Gestalt w procesie szkolenia.",
  founder: {
    "@type": "Person",
    name: "Sandra Anczarska",
    jobTitle: "Psycholog, psychoterapeutka Gestalt w procesie szkolenia",
    image: "https://sandra-ten.vercel.app/images/sandra-anczarska.jpg",
    sameAs: [profileUrl],
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Wojska Polskiego 3",
    postalCode: "41-400",
    addressLocality: "Mysłowice",
    addressCountry: "PL",
  },
  areaServed: ["Mysłowice", "online"],
  serviceType: [
    "Konsultacja psychoterapeutyczna",
    "Poradnictwo psychologiczne",
    "Konsultacja online",
  ],
  sameAs: [profileUrl],
};

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
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
