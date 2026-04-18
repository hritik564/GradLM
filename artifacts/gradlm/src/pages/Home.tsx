import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import LeadFormSection from "@/components/LeadFormSection";
import UniversityMarquee from "@/components/UniversityMarquee";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import LeadFormModal from "@/components/LeadFormModal";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero onOpenModal={() => setModalOpen(true)} />
      <Stats />
      <Services />
      <HowItWorks />
      <Testimonials />
      <UniversityMarquee />
      <LeadFormSection />
      <FAQ />
      <Footer />
      <LeadFormModal open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  );
}
