import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-persona.png";

export function HeroSection({ onGetStarted, onSeeExample }: { onGetStarted: () => void; onSeeExample: () => void }) {
  return (
    <section className="relative hero-gradient text-primary-foreground overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 py-20 md:py-28 relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-slide-in">
            <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Free Buyer Persona Tool</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Buyer Persona Creator
            </h1>
            
            <p className="text-lg md:text-xl opacity-90 leading-relaxed">
              Create detailed buyer personas in minutes. Understand your target audience, 
              improve your marketing strategy, and drive better results with data-driven insights.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Button 
                variant="hero" 
                size="xl"
                onClick={onGetStarted}
                className="group bg-white text-black hover:bg-white/90"
              >
                Create my persona
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                variant="outline" 
                size="xl"
                onClick={onSeeExample}
                className="bg-white text-black border-white hover:bg-white/90"
              >
                See Example
              </Button>
            </div>
            
            <div className="flex items-center gap-8 pt-4 text-sm opacity-80">
              <div>
                <div className="font-bold text-2xl">100% Free</div>
                <div>No credit card required</div>
              </div>
              <div>
                <div className="font-bold text-2xl">7 Steps</div>
                <div>Simple guided process</div>
              </div>
              <div>
                <div className="font-bold text-2xl">Export</div>
                <div>Download & share</div>
              </div>
            </div>
          </div>
          
          <div className="relative animate-fade-in">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent rounded-3xl blur-3xl" />
            <img 
              src={heroImage} 
              alt="Buyer Persona Creation Illustration" 
              className="relative rounded-2xl shadow-2xl animate-float"
            />
          </div>
        </div>
      </div>
      
      {/* Wave Separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 80C1200 80 1320 70 1380 65L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" 
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
}