import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InvoicingSection = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('professional');

  const invoiceFeatures = [
    {
      icon: 'Zap',
      title: 'One-Click Generation',
      description: 'Generate professional invoices instantly from transaction data with zero manual entry.',
      stats: '< 5 seconds'
    },
    {
      icon: 'Palette',
      title: 'Custom Templates',
      description: 'Choose from 20+ professional templates or create custom designs matching your brand.',
      stats: '20+ templates'
    },
    {
      icon: 'Globe',
      title: 'Multi-Language Support',
      description: 'Generate invoices in Hindi, English, and 10+ regional languages for diverse customers.',
      stats: '12 languages'
    },
    {
      icon: 'Shield',
      title: 'GST Compliance',
      description: 'Automatically calculate GST, generate compliant invoices, and maintain audit trails.',
      stats: '100% compliant'
    }
  ];

  const templates = [
    {
      id: 'professional',
      name: 'Professional',
      description: 'Clean, modern design perfect for B2B transactions',
      preview: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=400&fit=crop'
    },
    {
      id: 'colorful',
      name: 'Colorful',
      description: 'Vibrant design ideal for retail and consumer businesses',
      preview: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=400&fit=crop'
    },
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Simple, elegant layout focusing on essential information',
      preview: 'https://images.unsplash.com/photo-1554224154-26032fced8bd?w=300&h=400&fit=crop'
    }
  ];

  const automationSteps = [
    {
      step: '01',
      title: 'Transaction Detected',
      description: 'NoteNetra device automatically captures transaction details including amount, items, and customer information.',
      icon: 'Scan'
    },
    {
      step: '02',
      title: 'Data Processing',
      description: 'AI engine processes transaction data, applies tax calculations, and matches with inventory records.',
      icon: 'Cpu'
    },
    {
      step: '03',
      title: 'Invoice Generated',
      description: 'Professional invoice is automatically created and can be sent via WhatsApp, email, or SMS instantly.',
      icon: 'FileText'
    }
  ];

  return (
    <section id="invoicing" className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto content-spacing">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-warning/10 text-warning px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Icon name="FileText" size={16} strokeWidth={2} />
            <span>Smart Invoicing</span>
          </div>
          
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            Professional Invoices in
            <span className="text-primary block">One Click</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transform every transaction into a professional invoice automatically. No manual data entry, no formatting hassles – just perfect invoices every time.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {invoiceFeatures?.map((feature, index) => (
            <div key={index} className="bg-card rounded-xl shadow-card border border-border p-6 text-center hover:shadow-interactive transition-smooth hover-lift">
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Icon name={feature?.icon} size={24} color="var(--color-warning)" strokeWidth={2} />
              </div>
              
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature?.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{feature?.description}</p>
              
              <div className="bg-warning/10 text-warning px-3 py-1 rounded-full text-xs font-medium">
                {feature?.stats}
              </div>
            </div>
          ))}
        </div>

        {/* Template Showcase */}
        <div className="bg-card rounded-2xl shadow-card border border-border p-8 mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">Choose Your Invoice Style</h3>
            <p className="text-muted-foreground">
              Select from professionally designed templates or customize your own to match your brand identity.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {templates?.map((template) => (
              <div
                key={template?.id}
                className={`relative cursor-pointer rounded-lg overflow-hidden transition-smooth hover-lift ${
                  selectedTemplate === template?.id ? 'ring-2 ring-primary shadow-interactive' : 'hover:shadow-card'
                }`}
                onClick={() => setSelectedTemplate(template?.id)}
              >
                <div className="aspect-[3/4] bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                  <Icon name="FileText" size={48} className="text-muted-foreground/50" />
                </div>
                
                {selectedTemplate === template?.id && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="Check" size={14} color="white" strokeWidth={2} />
                  </div>
                )}
                
                <div className="p-4">
                  <h4 className="font-semibold text-foreground mb-1">{template?.name}</h4>
                  <p className="text-xs text-muted-foreground">{template?.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Button
              variant="outline"
              iconName="Palette"
              iconPosition="left"
            >
              Customize Template
            </Button>
          </div>
        </div>

        {/* Automation Process */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-foreground mb-4">Automated Invoice Generation</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              See how NoteNetra transforms a simple transaction into a professional invoice without any manual intervention.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {automationSteps?.map((step, index) => (
              <div key={index} className="relative">
                {index < automationSteps?.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-primary to-transparent transform translate-x-4 -translate-y-1/2" />
                )}
                
                <div className="bg-card rounded-xl shadow-card border border-border p-6 text-center hover:shadow-interactive transition-smooth">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Icon name={step?.icon} size={28} color="var(--color-primary)" strokeWidth={2} />
                  </div>
                  
                  <div className="text-3xl font-bold text-primary mb-2">{step?.step}</div>
                  <h4 className="text-lg font-semibold text-foreground mb-3">{step?.title}</h4>
                  <p className="text-sm text-muted-foreground">{step?.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ROI Calculator */}
        <div className="bg-gradient-to-br from-warning/5 to-accent/5 rounded-2xl p-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">Time & Cost Savings</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-card rounded-lg">
                  <div>
                    <div className="font-semibold text-foreground">Manual Invoice Creation</div>
                    <div className="text-sm text-muted-foreground">Traditional method</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-error">15 min</div>
                    <div className="text-sm text-muted-foreground">per invoice</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-card rounded-lg">
                  <div>
                    <div className="font-semibold text-foreground">NoteNetra Automation</div>
                    <div className="text-sm text-muted-foreground">AI-powered generation</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-accent">5 sec</div>
                    <div className="text-sm text-muted-foreground">per invoice</div>
                  </div>
                </div>
                
                <div className="bg-primary/10 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-primary mb-1">99.7%</div>
                  <div className="text-sm text-muted-foreground">Time Reduction</div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-card rounded-xl p-8 shadow-card">
                <h4 className="text-lg font-semibold text-foreground mb-4">Monthly Savings</h4>
                <div className="text-4xl font-bold text-accent mb-2">₹25,000</div>
                <div className="text-sm text-muted-foreground mb-6">For 100 invoices/month</div>
                
                <ul className="text-left space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center space-x-2">
                    <Icon name="Check" size={14} color="var(--color-accent)" strokeWidth={2} />
                    <span>Reduced manual labor costs</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Icon name="Check" size={14} color="var(--color-accent)" strokeWidth={2} />
                    <span>Eliminated printing expenses</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Icon name="Check" size={14} color="var(--color-accent)" strokeWidth={2} />
                    <span>Faster payment collection</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvoicingSection;