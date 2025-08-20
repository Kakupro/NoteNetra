import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      question: "What\'s included in the device cost?",
      answer: `The device cost includes the NoteNetra hardware unit, power adapter, setup guide, and 1-year hardware warranty. The device comes pre-configured and ready to use out of the box. Installation support is included for Professional and Enterprise plans.`
    },
    {
      question: "Are there any setup or installation fees?",
      answer: `Setup fees vary by plan:\n• Starter: Self-service setup (₹0)\n• Professional: ₹2,500 including 2 hours of remote assistance\n• Enterprise: ₹5,000 including on-site installation and 8 hours of training\n\nAll plans include comprehensive setup documentation and video tutorials.`
    },
    {
      question: "Can I upgrade or downgrade my plan?",
      answer: `Yes, you can change your plan at any time. Upgrades take effect immediately, while downgrades take effect at the next billing cycle. When upgrading, you'll only pay the prorated difference. Downgrading may result in feature limitations based on your new plan.`
    },
    {
      question: "What happens if I exceed my transaction limit?",
      answer: `If you exceed your monthly transaction limit:\n• Starter: Additional transactions at ₹0.50 each\n• Professional: Additional transactions at ₹0.25 each\n• Enterprise: No additional charges (unlimited)\n\nWe'll notify you when you reach 80% of your limit and suggest plan upgrades if needed.`
    },
    {
      question: "Is there a money-back guarantee?",
      answer: `Yes, we offer a 30-day money-back guarantee on all plans. If you're not satisfied with NoteNetra, return the device in original condition within 30 days for a full refund. Monthly subscription fees are also refunded for the unused period.`
    },
    {
      question: "What payment methods do you accept?",
      answer: `We accept all major payment methods:\n• Credit/Debit Cards (Visa, MasterCard, RuPay)\n• UPI payments\n• Net Banking\n• Digital wallets (Paytm, PhonePe, Google Pay)\n• Bank transfers (NEFT/RTGS)\n\nFor Enterprise plans, we also offer invoice-based payments with NET 30 terms.`
    },
    {
      question: "How does the credit score improvement work?",
      answer: `NoteNetra tracks all your business transactions and creates a comprehensive financial profile. This data is shared with credit bureaus and lending partners to:\n• Establish transaction history\n• Demonstrate business stability\n• Show cash flow patterns\n• Build creditworthiness over time\n\nTypical improvements range from 50-150 points over 6-12 months.`
    },
    {
      question: "Can I use multiple devices for different locations?",
      answer: `Yes, multi-location support is available:\n• Starter: Single location only\n• Professional: Up to 3 locations\n• Enterprise: Unlimited locations\n\nEach additional device requires a separate hardware purchase, but all locations are managed through a single dashboard with consolidated reporting.`
    }
  ];

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="bg-card rounded-2xl border border-border shadow-card p-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="HelpCircle" size={32} color="var(--color-primary)" strokeWidth={2} />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">Frequently Asked Questions</h3>
        <p className="text-muted-foreground">
          Get answers to common questions about NoteNetra pricing and features
        </p>
      </div>
      <div className="space-y-4">
        {faqs?.map((faq, index) => (
          <div
            key={index}
            className="border border-border rounded-lg overflow-hidden transition-smooth hover:shadow-card"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/50 transition-micro"
            >
              <span className="font-semibold text-foreground pr-4">{faq?.question}</span>
              <Icon
                name={openFAQ === index ? "ChevronUp" : "ChevronDown"}
                size={20}
                color="var(--color-muted-foreground)"
                strokeWidth={2}
                className="flex-shrink-0 transition-smooth"
              />
            </button>
            
            {openFAQ === index && (
              <div className="px-6 pb-4 border-t border-border bg-muted/20">
                <div className="pt-4 text-muted-foreground whitespace-pre-line leading-relaxed">
                  {faq?.answer}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Contact Support */}
      <div className="mt-8 p-6 bg-primary/5 border border-primary/20 rounded-lg text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Icon name="MessageCircle" size={20} color="var(--color-primary)" strokeWidth={2} />
          <span className="font-semibold text-primary">Still have questions?</span>
        </div>
        <p className="text-muted-foreground mb-4">
          Our team is here to help you choose the right plan for your business
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="mailto:support@notenetra.com"
            className="inline-flex items-center justify-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-micro"
          >
            <Icon name="Mail" size={16} strokeWidth={2} />
            <span>Email Support</span>
          </a>
          <a
            href="tel:+911800123456"
            className="inline-flex items-center justify-center space-x-2 px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-micro"
          >
            <Icon name="Phone" size={16} strokeWidth={2} />
            <span>Call Us</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;