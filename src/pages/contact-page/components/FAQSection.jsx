import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      question: "What is included in the NoteNetra device package?",
      answer: `The NoteNetra starter package includes:\n• Smart IoT device with cash and UPI scanning capabilities\n• Pre-configured dashboard access for 12 months\n• Installation and setup support\n• Training session for your team\n• 24/7 technical support\n• Integration with existing POS systems\n• Compliance with RBI guidelines and data security standards`
    },
    {
      question: "How long does implementation take?",
      answer: `Implementation timeline:\n• Device delivery: 3-5 business days\n• Installation and setup: 2-4 hours on-site\n• Team training: 1-2 hours\n• Full integration: 1-2 business days\n• Go-live support: Immediate\n\nMost businesses are fully operational within one week of ordering.`
    },
    {
      question: "What are the pricing options and payment terms?",
      answer: `Flexible pricing options:\n• Starter Plan: ₹15,000 one-time + ₹2,500/month\n• Professional Plan: ₹25,000 one-time + ₹4,500/month\n• Enterprise Plan: Custom pricing based on requirements\n\nPayment terms:\n• 50% advance, 50% on delivery\n• EMI options available through partner banks\n• Volume discounts for multiple devices`
    },
    {
      question: "How does NoteNetra improve loan eligibility?",
      answer: `NoteNetra enhances creditworthiness by:\n• Creating digital transaction records for cash sales\n• Generating automated financial reports\n• Building credit history through documented revenue\n• Providing lenders with real-time business insights\n• Maintaining compliance with banking requirements\n• Offering transparent cash flow documentation\n\nMany customers see loan approval rates improve by 60-80%.`
    },
    {
      question: "What technical support is provided?",
      answer: `Comprehensive support includes:\n• 24/7 phone and email support\n• Remote troubleshooting and diagnostics\n• On-site support for critical issues\n• Regular software updates and maintenance\n• Training resources and documentation\n• Dedicated account manager for Enterprise plans\n• Community forum and knowledge base access`
    },
    {
      question: "Is my business data secure with NoteNetra?",
      answer: `Data security is our top priority:\n• ISO 27001 certified security protocols\n• End-to-end encryption for all transactions\n• Compliance with RBI data localization requirements\n• Regular security audits and penetration testing\n• GDPR-compliant data handling practices\n• Secure cloud infrastructure with 99.9% uptime\n• Role-based access controls and audit trails`
    }
  ];

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="bg-card rounded-xl shadow-card p-8 border border-border">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Frequently Asked Questions
        </h2>
        <p className="text-muted-foreground">
          Get answers to common questions about NoteNetra's platform, implementation, and support.
        </p>
      </div>
      <div className="space-y-4">
        {faqs?.map((faq, index) => (
          <div
            key={index}
            className="border border-border rounded-lg overflow-hidden transition-micro hover:shadow-interactive"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-4 text-left flex items-center justify-between bg-muted/30 hover:bg-muted/50 transition-micro"
            >
              <h3 className="font-medium text-foreground pr-4">
                {faq?.question}
              </h3>
              <div className={`transition-micro ${openFAQ === index ? 'rotate-180' : ''}`}>
                <Icon 
                  name="ChevronDown" 
                  size={20} 
                  color="var(--color-muted-foreground)" 
                  strokeWidth={2} 
                />
              </div>
            </button>
            
            {openFAQ === index && (
              <div className="px-6 py-4 bg-card border-t border-border">
                <div className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                  {faq?.answer}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-8 p-6 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border border-border">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon name="HelpCircle" size={24} color="var(--color-primary)" strokeWidth={2} />
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">
              Still have questions?
            </h4>
            <p className="text-muted-foreground text-sm mb-4">
              Our team is here to help. Get personalized answers to your specific business needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => window.open('tel:+919876543210')}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-micro text-sm font-medium"
              >
                <Icon name="Phone" size={16} strokeWidth={2} />
                <span>Call Sales Team</span>
              </button>
              <button
                onClick={() => window.open('mailto:support@notenetra.com')}
                className="inline-flex items-center space-x-2 px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-micro text-sm font-medium"
              >
                <Icon name="Mail" size={16} strokeWidth={2} />
                <span>Email Support</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;