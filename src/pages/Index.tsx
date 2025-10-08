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
  industryOther: string;
  businessSize: string;
  jobTitle: string;
  jobMeasurement: string;
  jobMeasurementOther: string;
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

  const handleSeeExample = () => {
    const examplePersona: PersonaData = {
      name: "Sophie Carter",
      role: "Marketing Manager",
      age: "34",
      education: "Master's in Marketing",
      industry: "SaaS / Technology",
      industryOther: "",
      businessSize: "51-200 employees",
      jobTitle: "Marketing Manager",
      jobMeasurement: "Marketing campaign ROI, Lead generation volume, Engagement rate on digital channels, Sales pipeline contribution",
      jobMeasurementOther: "",
      reportsTo: "VP of Marketing",
      goals: "Grow brand awareness in new markets, increase qualified leads by 20% in the next quarter, and improve marketing ROI by optimizing digital campaigns.",
      challenges: ["Limited budget to run multi-channel campaigns effectively", "Difficulty aligning marketing and sales goals", "Measuring ROI accurately across channels", "Recruiting and retaining skilled team members"],
      challengesOther: "",
      painPoints: ["Inconsistent lead quality from campaigns", "Lack of integrated tools for tracking results", "Overwhelmed by managing too many platforms", "Not enough time to analyze performance data"],
      painPointsOther: "",
      tools: ["HubSpot", "Google Analytics", "Slack"],
      toolsOther: "Trello, Canva, LinkedIn Ads",
      communication: ["Email", "LinkedIn", "Phone"],
      infoSources: ["Industry blogs", "LinkedIn", "Podcasts"],
      socialNetworks: ["LinkedIn", "Twitter/X", "Facebook"],
    };
    setPersonaData(examplePersona);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
      {!personaData && <HeroSection onGetStarted={handleGetStarted} onSeeExample={handleSeeExample} />}
      
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