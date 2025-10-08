import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import synctrackLogo from "@/assets/synctrack-logo.png";
import omegaLogo from "@/assets/omega-logo.png";
import instafeedLogo from "@/assets/instafeed-logo.png";
import trakpilotLogo from "@/assets/trakpilot-logo.png";

const apps = [
  {
    logo: synctrackLogo,
    name: "Synctrack PayPal Tracking Sync",
    description: "Automate PayPal tracking synchronization and reduce disputes with seamless order tracking.",
  },
  {
    logo: omegaLogo,
    name: "Omega Facebook Pixel",
    description: "Track conversions accurately with advanced Facebook Pixel integration and analytics.",
  },
  {
    logo: instafeedLogo,
    name: "Instafeed",
    description: "Display your Instagram feed beautifully on your website to boost engagement.",
  },
  {
    logo: trakpilotLogo,
    name: "Trakpilot",
    description: "Advanced shipment tracking and customer notifications for better post-purchase experience.",
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
          {apps.map((app, index) => (
              <Card 
                key={index} 
                className="border-2 hover:border-primary/50 transition-all hover:shadow-xl group animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden mb-4 group-hover:scale-110 transition-transform">
                    <img 
                      src={app.logo} 
                      alt={`${app.name} logo`} 
                      className="w-full h-full object-cover"
                    />
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
            ))}
        </div>
      </div>
    </section>
  );
}