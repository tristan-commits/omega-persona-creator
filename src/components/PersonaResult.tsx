import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  User, Briefcase, Target, AlertCircle, Wrench, 
  MessageSquare, BookOpen, Share2, Download, RefreshCw 
} from "lucide-react";
import { jsPDF } from "jspdf";

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

export function PersonaResult({ data, onReset }: { data: PersonaData; onReset: () => void }) {
  const handleExport = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    let yPosition = 20;
    
    // Title
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("Buyer Persona", margin, yPosition);
    yPosition += 15;
    
    // Name and Role
    doc.setFontSize(16);
    doc.text(data.name, margin, yPosition);
    yPosition += 8;
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(data.role, margin, yPosition);
    yPosition += 10;
    
    // Basic Info
    doc.setFontSize(10);
    doc.text(`Age: ${data.age} | Education: ${data.education}`, margin, yPosition);
    yPosition += 15;
    
    // Industry & Business
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Industry & Business", margin, yPosition);
    yPosition += 7;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Industry: ${data.industry}`, margin, yPosition);
    yPosition += 6;
    doc.text(`Company Size: ${data.businessSize}`, margin, yPosition);
    yPosition += 12;
    
    // Career Information
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Career Information", margin, yPosition);
    yPosition += 7;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Job Title: ${data.jobTitle}`, margin, yPosition);
    yPosition += 6;
    doc.text(`Reports To: ${data.reportsTo}`, margin, yPosition);
    yPosition += 12;
    
    // Goals
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Goals & Objectives", margin, yPosition);
    yPosition += 7;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    const goalsLines = doc.splitTextToSize(data.goals, pageWidth - 2 * margin);
    doc.text(goalsLines, margin, yPosition);
    yPosition += goalsLines.length * 5 + 5;
    doc.text(`Job Measured By: ${data.jobMeasurement}`, margin, yPosition);
    yPosition += 12;
    
    // Check if we need a new page
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }
    
    // Challenges
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Challenges", margin, yPosition);
    yPosition += 7;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    const allChallenges = [...data.challenges];
    if (data.challengesOther) allChallenges.push(data.challengesOther);
    allChallenges.forEach((challenge) => {
      doc.text(`• ${challenge}`, margin, yPosition);
      yPosition += 6;
    });
    yPosition += 6;
    
    // Pain Points
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Pain Points", margin, yPosition);
    yPosition += 7;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    const allPainPoints = [...data.painPoints];
    if (data.painPointsOther) allPainPoints.push(data.painPointsOther);
    allPainPoints.forEach((painPoint) => {
      doc.text(`• ${painPoint}`, margin, yPosition);
      yPosition += 6;
    });
    yPosition += 6;
    
    // Check if we need a new page
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }
    
    // Tools Used
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Tools Used", margin, yPosition);
    yPosition += 7;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    const allTools = [...data.tools];
    if (data.toolsOther) allTools.push(data.toolsOther);
    doc.text(allTools.join(", "), margin, yPosition, { maxWidth: pageWidth - 2 * margin });
    yPosition += 12;
    
    // Communication Channels
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Communication Channels", margin, yPosition);
    yPosition += 7;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(data.communication.join(", "), margin, yPosition, { maxWidth: pageWidth - 2 * margin });
    yPosition += 12;
    
    // Information Sources
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Information Sources", margin, yPosition);
    yPosition += 7;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(data.infoSources.join(", "), margin, yPosition, { maxWidth: pageWidth - 2 * margin });
    yPosition += 12;
    
    // Social Networks
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Social Networks", margin, yPosition);
    yPosition += 7;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(data.socialNetworks.join(", "), margin, yPosition, { maxWidth: pageWidth - 2 * margin });
    
    // Save the PDF
    doc.save(`${data.name.replace(/\s+/g, "-").toLowerCase()}-persona.pdf`);
  };

  const allChallenges = [...data.challenges];
  if (data.challengesOther) allChallenges.push(data.challengesOther);

  const allPainPoints = [...data.painPoints];
  if (data.painPointsOther) allPainPoints.push(data.painPointsOther);

  const allTools = [...data.tools];
  if (data.toolsOther) allTools.push(data.toolsOther);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Your Buyer Persona</h2>
        <p className="text-muted-foreground">Here's your complete buyer persona profile</p>
      </div>

      <Card className="border-2 shadow-xl mb-6">
        <CardHeader className="hero-gradient text-primary-foreground pb-16">
          <div className="flex flex-col items-center">
            <Avatar className="w-32 h-32 border-4 border-primary-foreground shadow-lg">
              <AvatarImage src={data.avatar} />
              <AvatarFallback className="bg-secondary text-secondary-foreground text-4xl">
                {data.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <h3 className="text-3xl font-bold mt-4">{data.name}</h3>
            <p className="text-xl opacity-90">{data.role}</p>
            <div className="flex gap-4 mt-2 text-sm opacity-80">
              <span>Age: {data.age}</span>
              <span>•</span>
              <span>{data.education}</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="grid md:grid-cols-2 gap-6 p-6 -mt-10">
          {/* Industry & Business */}
          <Card className="shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-semibold text-lg">Industry & Business</h4>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Industry:</span>
                  <Badge variant="secondary">{data.industry}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Company Size:</span>
                  <Badge variant="secondary">{data.businessSize}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Career Info */}
          <Card className="shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-semibold text-lg">Career Information</h4>
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-muted-foreground block">Job Title:</span>
                  <span className="font-medium">{data.jobTitle}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block">Reports To:</span>
                  <span className="font-medium">{data.reportsTo}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Goals */}
          <Card className="shadow-md md:col-span-2">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-semibold text-lg">Goals & Objectives</h4>
              </div>
              <p className="text-sm">{data.goals}</p>
              <div className="mt-3">
                <span className="text-sm text-muted-foreground block mb-2">Job Measured By:</span>
                <p className="text-sm">{data.jobMeasurement}</p>
              </div>
            </CardContent>
          </Card>

          {/* Challenges */}
          <Card className="shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-semibold text-lg">Challenges</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {allChallenges.map((challenge, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {challenge}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pain Points */}
          <Card className="shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-semibold text-lg">Pain Points</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {allPainPoints.map((painPoint, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {painPoint}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tools */}
          <Card className="shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Wrench className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-semibold text-lg">Tools Used</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {allTools.map((tool, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {tool}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Communication */}
          <Card className="shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-semibold text-lg">Communication</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {data.communication.map((channel, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {channel}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Information Sources */}
          <Card className="shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-semibold text-lg">Information Sources</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {data.infoSources.map((source, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {source}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Social Networks */}
          <Card className="shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Share2 className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-semibold text-lg">Social Networks</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {data.socialNetworks.map((network, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {network}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-center">
        <Button variant="hero" size="lg" onClick={handleExport}>
          <Download className="mr-2 h-4 w-4" />
          Export to PDF
        </Button>
        <Button variant="outline" size="lg" onClick={onReset}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Create Another Persona
        </Button>
      </div>
    </div>
  );
}