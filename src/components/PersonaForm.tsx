import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  User, Briefcase, Target, AlertCircle, MessageSquare, BookOpen, 
  ArrowRight, ArrowLeft, Upload, CheckCircle 
} from "lucide-react";
import { toast } from "sonner";

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

const STEPS = [
  { number: 1, title: "Basic Info", icon: User },
  { number: 2, title: "Industry", icon: Briefcase },
  { number: 3, title: "Career", icon: Target },
  { number: 4, title: "Goals", icon: Target },
  { number: 5, title: "Pain Points", icon: AlertCircle },
  { number: 6, title: "Work Style", icon: MessageSquare },
  { number: 7, title: "Information", icon: BookOpen },
];

const CHALLENGE_OPTIONS = [
  "Limited budget to run multi-channel campaigns effectively",
  "Difficulty aligning marketing and sales goals",
  "Measuring ROI accurately across channels",
  "Recruiting and retaining skilled team members",
  "Keeping up with rapidly changing digital trends",
  "Managing stakeholder expectations"
];

const PAIN_POINT_OPTIONS = [
  "Inconsistent lead quality from campaigns",
  "Lack of integrated tools for tracking results",
  "Overwhelmed by managing too many platforms",
  "Not enough time to analyze performance data",
  "Poor communication between teams",
  "Difficulty proving marketing value to leadership"
];

const JOB_MEASUREMENT_OPTIONS = [
  "Lead generation volume",
  "Marketing campaign ROI",
  "Customer acquisition cost (CAC)",
  "Brand awareness metrics",
  "Sales pipeline contribution",
  "Engagement rate on digital channels"
];

const TOOL_OPTIONS = [
  "Slack", "Microsoft Teams", "Zoom", "Google Workspace", 
  "Salesforce", "HubSpot", "Asana", "Trello"
];

const COMMUNICATION_OPTIONS = [
  "Email", "Phone", "LinkedIn", "Text message", "Video call", "In-person"
];

const INFO_SOURCE_OPTIONS = [
  "Industry blogs", "Podcasts", "YouTube", "LinkedIn", "Twitter/X", 
  "Industry publications", "Webinars", "Conferences"
];

const SOCIAL_NETWORK_OPTIONS = [
  "LinkedIn", "Twitter/X", "Facebook", "Instagram", "YouTube", "TikTok"
];

export function PersonaForm({ onComplete }: { onComplete: (data: PersonaData) => void }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<PersonaData>({
    name: "",
    role: "",
    age: "",
    education: "",
    industry: "",
    industryOther: "",
    businessSize: "",
    jobTitle: "",
    jobMeasurement: "",
    jobMeasurementOther: "",
    reportsTo: "",
    goals: "",
    challenges: [],
    challengesOther: "",
    painPoints: [],
    painPointsOther: "",
    tools: [],
    toolsOther: "",
    communication: [],
    infoSources: [],
    socialNetworks: [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const progress = (currentStep / STEPS.length) * 100;

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.name) newErrors.name = "Name is required";
        if (!formData.role) newErrors.role = "Role is required";
        if (!formData.age) newErrors.age = "Age is required";
        if (!formData.education) newErrors.education = "Education is required";
        break;
      case 2:
        if (!formData.industry) newErrors.industry = "Industry is required";
        if (!formData.businessSize) newErrors.businessSize = "Business size is required";
        break;
      case 3:
        if (!formData.jobTitle) newErrors.jobTitle = "Job title is required";
        if (!formData.jobMeasurement) newErrors.jobMeasurement = "Job measurement is required";
        if (!formData.reportsTo) newErrors.reportsTo = "Reporting structure is required";
        break;
      case 4:
        if (!formData.goals) newErrors.goals = "Goals are required";
        if (formData.challenges.length === 0 && !formData.challengesOther) {
          newErrors.challenges = "Select at least one challenge";
        }
        break;
      case 5:
        if (formData.painPoints.length === 0 && !formData.painPointsOther) {
          newErrors.painPoints = "Select at least one pain point";
        }
        break;
      case 6:
        if (formData.tools.length === 0 && !formData.toolsOther) {
          newErrors.tools = "Select at least one tool";
        }
        if (formData.communication.length === 0) {
          newErrors.communication = "Select at least one communication channel";
        }
        break;
      case 7:
        if (formData.infoSources.length === 0) {
          newErrors.infoSources = "Select at least one information source";
        }
        if (formData.socialNetworks.length === 0) {
          newErrors.socialNetworks = "Select at least one social network";
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep === STEPS.length) {
        onComplete(formData);
        toast.success("Persona created successfully!");
      } else {
        setCurrentStep(currentStep + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      toast.error("Please fill in all required fields");
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors({});
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleArrayItem = (array: string[], item: string, key: keyof PersonaData) => {
    const newArray = array.includes(item)
      ? array.filter((i) => i !== item)
      : [...array, item];
    setFormData({ ...formData, [key]: newArray });
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-muted-foreground">
            Step {currentStep} of {STEPS.length}
          </span>
          <span className="text-sm font-medium text-primary">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Step Indicators */}
      <div className="flex justify-between mb-8 overflow-x-auto pb-2">
        {STEPS.map((step) => {
          const Icon = step.icon;
          const isActive = currentStep === step.number;
          const isCompleted = currentStep > step.number;
          
          return (
            <div
              key={step.number}
              className={`flex flex-col items-center min-w-[80px] ${
                isActive ? "opacity-100" : "opacity-50"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-smooth ${
                  isCompleted
                    ? "bg-primary text-primary-foreground"
                    : isActive
                    ? "bg-primary text-primary-foreground shadow-glow"
                    : "bg-muted"
                }`}
              >
                {isCompleted ? <CheckCircle className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
              </div>
              <span className="text-xs text-center font-medium">{step.title}</span>
            </div>
          );
        })}
      </div>

      {/* Form Content */}
      <Card className="border-2 shadow-lg animate-fade-in">
        <CardContent className="p-6 md:p-8">
          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-4">Tell us about your persona</h2>
              
              {/* Avatar Upload */}
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={formData.avatar} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                    {formData.name.charAt(0) || "?"}
                  </AvatarFallback>
                </Avatar>
                <Label htmlFor="avatar" className="cursor-pointer">
                  <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg hover:bg-muted/80 transition-smooth">
                    <Upload className="w-4 h-4" />
                    <span className="text-sm font-medium">Upload Avatar</span>
                  </div>
                  <Input
                    id="avatar"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarUpload}
                  />
                </Label>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Persona Name *</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Marketing Mary"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={errors.name ? "border-destructive" : ""}
                  />
                  {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
                </div>

                <div>
                  <Label htmlFor="role">Role/Title *</Label>
                  <Input
                    id="role"
                    placeholder="e.g., Marketing Manager"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className={errors.role ? "border-destructive" : ""}
                  />
                  {errors.role && <p className="text-sm text-destructive mt-1">{errors.role}</p>}
                </div>

                <div>
                  <Label htmlFor="age">Age *</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="e.g., 35"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className={errors.age ? "border-destructive" : ""}
                  />
                  {errors.age && <p className="text-sm text-destructive mt-1">{errors.age}</p>}
                </div>

                <div>
                  <Label htmlFor="education">Education Level *</Label>
                  <Select value={formData.education} onValueChange={(value) => setFormData({ ...formData, education: value })}>
                    <SelectTrigger className={errors.education ? "border-destructive" : ""}>
                      <SelectValue placeholder="Select education level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high-school">High School</SelectItem>
                      <SelectItem value="associate">Associate Degree</SelectItem>
                      <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                      <SelectItem value="master">Master's Degree</SelectItem>
                      <SelectItem value="doctorate">Doctorate</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.education && <p className="text-sm text-destructive mt-1">{errors.education}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Industry */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-4">Industry & Business</h2>
              
              <div>
                <Label htmlFor="industry">Industry *</Label>
                <Select value={formData.industry} onValueChange={(value) => setFormData({ ...formData, industry: value })}>
                  <SelectTrigger className={errors.industry ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="SaaS / Technology">SaaS / Technology</SelectItem>
                    <SelectItem value="Healthcare">Healthcare</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Retail">Retail</SelectItem>
                    <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.industry && <p className="text-sm text-destructive mt-1">{errors.industry}</p>}
              </div>

              {formData.industry === "Other" && (
                <div>
                  <Label htmlFor="industryOther">Please specify industry *</Label>
                  <Input
                    id="industryOther"
                    placeholder="Enter your industry"
                    value={formData.industryOther}
                    onChange={(e) => setFormData({ ...formData, industryOther: e.target.value })}
                  />
                </div>
              )}

              <div>
                <Label htmlFor="businessSize">Size of Business *</Label>
                <Select value={formData.businessSize} onValueChange={(value) => setFormData({ ...formData, businessSize: value })}>
                  <SelectTrigger className={errors.businessSize ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select business size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10 employees">1-10 employees</SelectItem>
                    <SelectItem value="11-50 employees">11-50 employees</SelectItem>
                    <SelectItem value="51-200 employees">51-200 employees</SelectItem>
                    <SelectItem value="201-500 employees">201-500 employees</SelectItem>
                    <SelectItem value="500+ employees">500+ employees</SelectItem>
                  </SelectContent>
                </Select>
                {errors.businessSize && <p className="text-sm text-destructive mt-1">{errors.businessSize}</p>}
              </div>
            </div>
          )}

          {/* Step 3: Career */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-4">Career Information</h2>
              
              <div>
                <Label htmlFor="jobTitle">Job Title *</Label>
                <Input
                  id="jobTitle"
                  placeholder="e.g., Senior Marketing Manager"
                  value={formData.jobTitle}
                  onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                  className={errors.jobTitle ? "border-destructive" : ""}
                />
                {errors.jobTitle && <p className="text-sm text-destructive mt-1">{errors.jobTitle}</p>}
              </div>

              <div>
                <Label>How is their job measured? *</Label>
                <div className="space-y-3 mt-2">
                  {JOB_MEASUREMENT_OPTIONS.map((metric) => (
                    <div key={metric} className="flex items-center space-x-2">
                      <Checkbox
                        id={`metric-${metric}`}
                        checked={formData.jobMeasurement.includes(metric)}
                        onCheckedChange={() => {
                          const current = formData.jobMeasurement ? formData.jobMeasurement.split(", ") : [];
                          const newValue = current.includes(metric)
                            ? current.filter(m => m !== metric).join(", ")
                            : [...current, metric].filter(Boolean).join(", ");
                          setFormData({ ...formData, jobMeasurement: newValue });
                        }}
                      />
                      <label htmlFor={`metric-${metric}`} className="text-sm cursor-pointer">
                        {metric}
                      </label>
                    </div>
                  ))}
                  <div>
                    <Label htmlFor="jobMeasurementOther" className="text-sm">Other (please specify)</Label>
                    <Input
                      id="jobMeasurementOther"
                      placeholder="Other measurement metrics..."
                      value={formData.jobMeasurementOther}
                      onChange={(e) => setFormData({ ...formData, jobMeasurementOther: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </div>
                {errors.jobMeasurement && <p className="text-sm text-destructive mt-1">{errors.jobMeasurement}</p>}
              </div>

              <div>
                <Label htmlFor="reportsTo">Who do they report to? *</Label>
                <Input
                  id="reportsTo"
                  placeholder="e.g., VP of Marketing"
                  value={formData.reportsTo}
                  onChange={(e) => setFormData({ ...formData, reportsTo: e.target.value })}
                  className={errors.reportsTo ? "border-destructive" : ""}
                />
                {errors.reportsTo && <p className="text-sm text-destructive mt-1">{errors.reportsTo}</p>}
              </div>
            </div>
          )}

          {/* Step 4: Goals & Challenges */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-4">Goals & Challenges</h2>
              
              <div>
                <Label htmlFor="goals">What are their goals/objectives? *</Label>
                <Textarea
                  id="goals"
                  placeholder="Describe their main professional goals..."
                  value={formData.goals}
                  onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                  className={errors.goals ? "border-destructive" : ""}
                  rows={4}
                />
                {errors.goals && <p className="text-sm text-destructive mt-1">{errors.goals}</p>}
              </div>

              <div>
                <Label>What are their biggest challenges? *</Label>
                <div className="space-y-3 mt-2">
                  {CHALLENGE_OPTIONS.map((challenge) => (
                    <div key={challenge} className="flex items-start space-x-2">
                      <Checkbox
                        id={`challenge-${challenge}`}
                        checked={formData.challenges.includes(challenge)}
                        onCheckedChange={() => toggleArrayItem(formData.challenges, challenge, "challenges")}
                        className="mt-1"
                      />
                      <label htmlFor={`challenge-${challenge}`} className="text-sm cursor-pointer leading-relaxed">
                        {challenge}
                      </label>
                    </div>
                  ))}
                  <div>
                    <Label htmlFor="challengesOther" className="text-sm">Other (please specify)</Label>
                    <Input
                      id="challengesOther"
                      placeholder="Other challenges..."
                      value={formData.challengesOther}
                      onChange={(e) => setFormData({ ...formData, challengesOther: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </div>
                {errors.challenges && <p className="text-sm text-destructive mt-1">{errors.challenges}</p>}
              </div>
            </div>
          )}

          {/* Step 5: Pain Points */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-4">Pain Points</h2>
              
              <div>
                <Label>What are their main pain points? *</Label>
                <div className="space-y-3 mt-2">
                  {PAIN_POINT_OPTIONS.map((painPoint) => (
                    <div key={painPoint} className="flex items-start space-x-2">
                      <Checkbox
                        id={`painPoint-${painPoint}`}
                        checked={formData.painPoints.includes(painPoint)}
                        onCheckedChange={() => toggleArrayItem(formData.painPoints, painPoint, "painPoints")}
                        className="mt-1"
                      />
                      <label htmlFor={`painPoint-${painPoint}`} className="text-sm cursor-pointer leading-relaxed">
                        {painPoint}
                      </label>
                    </div>
                  ))}
                  <div>
                    <Label htmlFor="painPointsOther" className="text-sm">Other (please specify)</Label>
                    <Input
                      id="painPointsOther"
                      placeholder="Other pain points..."
                      value={formData.painPointsOther}
                      onChange={(e) => setFormData({ ...formData, painPointsOther: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </div>
                {errors.painPoints && <p className="text-sm text-destructive mt-1">{errors.painPoints}</p>}
              </div>
            </div>
          )}

          {/* Step 6: Work Style */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-4">Work Style</h2>
              
              <div>
                <Label>What tools do they use? *</Label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {TOOL_OPTIONS.map((tool) => (
                    <div key={tool} className="flex items-center space-x-2">
                      <Checkbox
                        id={`tool-${tool}`}
                        checked={formData.tools.includes(tool)}
                        onCheckedChange={() => toggleArrayItem(formData.tools, tool, "tools")}
                      />
                      <label htmlFor={`tool-${tool}`} className="text-sm cursor-pointer">
                        {tool}
                      </label>
                    </div>
                  ))}
                </div>
                <div className="mt-3">
                  <Label htmlFor="toolsOther" className="text-sm">Other tools (please specify)</Label>
                  <Input
                    id="toolsOther"
                    placeholder="Other tools..."
                    value={formData.toolsOther}
                    onChange={(e) => setFormData({ ...formData, toolsOther: e.target.value })}
                    className="mt-1"
                  />
                </div>
                {errors.tools && <p className="text-sm text-destructive mt-1">{errors.tools}</p>}
              </div>

              <div>
                <Label>Preferred communication channels *</Label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {COMMUNICATION_OPTIONS.map((channel) => (
                    <div key={channel} className="flex items-center space-x-2">
                      <Checkbox
                        id={`comm-${channel}`}
                        checked={formData.communication.includes(channel)}
                        onCheckedChange={() => toggleArrayItem(formData.communication, channel, "communication")}
                      />
                      <label htmlFor={`comm-${channel}`} className="text-sm cursor-pointer">
                        {channel}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.communication && <p className="text-sm text-destructive mt-1">{errors.communication}</p>}
              </div>
            </div>
          )}

          {/* Step 7: Information Sources */}
          {currentStep === 7 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-4">Information & Social</h2>
              
              <div>
                <Label>Where do they consume professional information? *</Label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {INFO_SOURCE_OPTIONS.map((source) => (
                    <div key={source} className="flex items-center space-x-2">
                      <Checkbox
                        id={`info-${source}`}
                        checked={formData.infoSources.includes(source)}
                        onCheckedChange={() => toggleArrayItem(formData.infoSources, source, "infoSources")}
                      />
                      <label htmlFor={`info-${source}`} className="text-sm cursor-pointer">
                        {source}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.infoSources && <p className="text-sm text-destructive mt-1">{errors.infoSources}</p>}
              </div>

              <div>
                <Label>Which social platforms are they active on? *</Label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {SOCIAL_NETWORK_OPTIONS.map((network) => (
                    <div key={network} className="flex items-center space-x-2">
                      <Checkbox
                        id={`social-${network}`}
                        checked={formData.socialNetworks.includes(network)}
                        onCheckedChange={() => toggleArrayItem(formData.socialNetworks, network, "socialNetworks")}
                      />
                      <label htmlFor={`social-${network}`} className="text-sm cursor-pointer">
                        {network}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.socialNetworks && <p className="text-sm text-destructive mt-1">{errors.socialNetworks}</p>}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          size="lg"
          onClick={handleBack}
          disabled={currentStep === 1}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button
          variant="hero"
          size="lg"
          onClick={handleNext}
        >
          {currentStep === STEPS.length ? (
            <>
              Create Persona
              <CheckCircle className="ml-2 h-4 w-4" />
            </>
          ) : (
            <>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}