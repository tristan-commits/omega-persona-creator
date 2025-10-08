import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Package, TrendingUp, Image, BarChart } from "lucide-react";

const apps = [
  {
    icon: Package,
    name: "Synctrack PayPal Tracking Sync",
    description: "Automate PayPal tracking synchronization and reduce disputes with seamless order tracking.",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    icon: BarChart,
    name: "Omega Facebook Pixel",
    description: "Track conversions accurately with advanced Facebook Pixel integration and analytics.",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
  },
  {
    icon: Image,
    name: "Instafeed",
    description: "Display your Instagram feed beautifully on your website to boost engagement.",
    color: "text-pink-600",
    bgColor: "bg-pink-50",
  },
  {
    icon: TrendingUp,
    name: "Trakpilot",
    description: "Advanced shipment tracking and customer notifications for better post-purchase experience.",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
];

export function CrossSellSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            More Ways to Power Your <span className="text-gradient">Marketing</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our suite of tools designed to help you grow your business
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {apps.map((app, index) => {
            const Icon = app.icon;
            return (
              <Card 
                key={index} 
                className="border-2 hover:border-primary/50 transition-all hover:shadow-xl group animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 flex flex-col h-full">
                  <div className={`w-16 h-16 rounded-2xl ${app.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-8 h-8 ${app.color}`} />
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-2 line-clamp-2">{app.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-grow">
                    {app.description}
                  </p>
                  
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    Learn More
                    <ExternalLink className="ml-2 h-4 w-4" />
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