import { useState, useRef } from "react";
import { HeroSection } from "@/components/HeroSection";
import { PersonaForm } from "@/components/PersonaForm";
import { PersonaResult } from "@/components/PersonaResult";
import { HowToUseSection } from "@/components/HowToUseSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { FAQSection } from "@/components/FAQSection";
import { CrossSellSection } from "@/components/CrossSellSection";
import { MoreToolsSection } from "@/components/MoreToolsSection";
import { Footer } from "@/components/Footer";

interface PersonaData {
  avatar?: string;
  name: string;
  role: string;
  age: string;
  education: string;
  industry: string;
  businessSize: string;
  jobTitle: string;
  jobMeasurement: string;
  reportsTo: string;
  goals: string;
  challenges: string[];
  challengesOther: string;
  painPoints: string[];
  painPointsOther: string;
  tools: string[];
  toolsOther: string;
  communication: string[];
  infoSources: string[];
  socialNetworks: string[];
}

const Index = () => {
  const [personaData, setPersonaData] = useState<PersonaData | null>(null);
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const handleGetStarted = () => {
    setShowForm(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleComplete = (data: PersonaData) => {
    setPersonaData(data);
    setShowForm(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    setPersonaData(null);
    setShowForm(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <div className="min-h-screen">
      {!personaData && <HeroSection onGetStarted={handleGetStarted} />}
      
      {showForm && !personaData && (
        <div ref={formRef} id="form-section" className="bg-background">
          <PersonaForm onComplete={handleComplete} />
        </div>
      )}
      
      {personaData && <PersonaResult data={personaData} onReset={handleReset} />}
      
      {!showForm && !personaData && (
        <>
          <HowToUseSection />
          <FeaturesSection />
          <FAQSection />
          <CrossSellSection />
          <MoreToolsSection />
        </>
      )}
      
      <Footer />
    </div>
  );
};

export default Index;