import { Card, CardContent } from "@/components/ui/card";
import { FileText, Sparkles, Share2 } from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "Fill in the Information",
    description: "Answer simple questions about your target customer across 7 guided steps covering demographics, career, goals, and more.",
  },
  {
    icon: Sparkles,
    title: "Generate Your Persona",
    description: "Our tool instantly creates a comprehensive buyer persona with all the key insights organized in a beautiful, professional format.",
  },
  {
    icon: Share2,
    title: "Export & Share",
    description: "Download your persona as JSON, share it with your team, or create multiple personas for different segments.",
  },
];

export function HowToUseSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How to Use <span className="text-gradient">Buyer Persona Generator</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create professional buyer personas in just three simple steps
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card 
                key={index} 
                className="relative overflow-hidden shadow-lg hover:shadow-xl transition-shadow animate-scale-in border-2"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16" />
                  
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    
                    <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl shadow-lg">
                      {index + 1}
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}