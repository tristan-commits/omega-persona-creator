import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Palette, Package, Calculator } from "lucide-react";

const tools = [
  {
    icon: MessageSquare,
    name: "Slogan Generator",
    description: "Create catchy and memorable slogans for your brand",
    url: "https://letsmetrix.com/tools/generate-slogan",
  },
  {
    icon: Palette,
    name: "Shopify Theme Detector",
    description: "Identify themes used by any Shopify store",
    url: "https://letsmetrix.com/tools/shopify-theme-detector",
  },
  {
    icon: Package,
    name: "Shopify App Detector",
    description: "Discover apps installed on Shopify stores",
    url: "https://letsmetrix.com/tools/shopify-app-detector",
  },
  {
    icon: Calculator,
    name: "Product Pricing Calculator",
    description: "Calculate optimal pricing for your products",
    url: "https://letsmetrix.com/tools/product-pricing-calculator",
  },
];

export function MoreToolsSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            More <span className="text-gradient">Free Tools</span> Like This
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our collection of free marketing and business tools
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <Card 
                key={index} 
                className="border-2 hover:border-primary/50 transition-all hover:shadow-lg group animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  
                  <h3 className="font-semibold mb-2">{tool.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4 min-h-[40px]">
                    {tool.description}
                  </p>
                  
                  <Button variant="ghost" size="sm" className="w-full hover:bg-primary hover:text-primary-foreground" asChild>
                    <a href={tool.url} target="_blank" rel="noopener noreferrer">
                      Try Now
                    </a>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}