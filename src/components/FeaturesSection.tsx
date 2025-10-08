import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Target, TrendingUp, Shield, Zap, Download, RefreshCw } from "lucide-react";

const features = [
  {
    icon: CheckCircle,
    title: "Easy Workflow",
    description: "Intuitive 7-step process guides you through creating detailed personas without any complexity.",
  },
  {
    icon: Users,
    title: "Comprehensive Profiles",
    description: "Capture demographics, career info, goals, challenges, pain points, and communication preferences.",
  },
  {
    icon: Target,
    title: "Marketing Insights",
    description: "Understand where your audience consumes information and which channels they prefer.",
  },
  {
    icon: TrendingUp,
    title: "Data-Driven Strategy",
    description: "Make informed marketing decisions based on detailed persona insights and behaviors.",
  },
  {
    icon: Download,
    title: "Export & Share",
    description: "Download personas as JSON files and easily share with your team or stakeholders.",
  },
  {
    icon: RefreshCw,
    title: "Unlimited Personas",
    description: "Create as many buyer personas as you need for different segments and markets.",
  },
  {
    icon: Shield,
    title: "100% Free",
    description: "No hidden costs, no credit card required. Completely free to use forever.",
  },
  {
    icon: Zap,
    title: "Instant Results",
    description: "Get your complete buyer persona immediately after completing the form.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Use <span className="text-gradient">Buyer Persona Generator</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful features to help you understand your audience better
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="border-2 hover:border-primary/50 transition-all hover:shadow-lg animate-fade-in group"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}