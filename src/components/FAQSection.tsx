import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is a buyer persona?",
    answer: "A buyer persona is a semi-fictional representation of your ideal customer based on market research and real data. It includes demographic information, behavior patterns, motivations, goals, and pain points that help you better understand and target your audience.",
  },
  {
    question: "How many personas can I create?",
    answer: "You can create unlimited buyer personas with our tool. It's completely free with no restrictions. Create as many as you need for different customer segments, markets, or products.",
  },
  {
    question: "Is this tool really free?",
    answer: "Yes! Our Buyer Persona Generator is 100% free to use. No credit card required, no hidden fees, and no limitations. We believe every business should have access to tools that help them understand their customers better.",
  },
  {
    question: "Can I share the persona with my team?",
    answer: "Absolutely! You can export your personas as JSON files and share them with your team members, stakeholders, or clients. The exported file contains all the information you've entered in an organized format.",
  },
];

export function FAQSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about our buyer persona tool
            </p>
          </div>
          
          <Accordion type="single" collapsible className="space-y-4 animate-slide-in">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card border-2 rounded-lg px-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}