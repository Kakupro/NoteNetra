import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CTASection = () => {
  const ctaFeatures = [
    {
      icon: 'Zap',
      title: 'Quick Setup',
      description: 'Get started in under 30 minutes'
    },
    {
      icon: 'Shield',
      title: '30-Day Trial',
      description: 'Risk-free money-back guarantee'
    },
    {
      icon: 'Headphones',
      title: '24/7 Support',
      description: 'Expert assistance in Hindi & English'
    },
    {
      icon: 'TrendingUp',
      title: 'Proven Results',
      description: '42,000+ successful MSMEs'
    }
  ];

  const urgencyFactors = [
    'Limited stock: Only 500 devices available this month',
    'Early bird pricing: Save ₹1,000 on your first order',
    'Free installation: Worth ₹2,500, included at no cost',
    'Priority support: Skip the queue with premium assistance'
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="max-w-7xl mx-auto content-spacing relative">
        {/* Main CTA */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Icon name="Rocket" size={16} strokeWidth={2} />
            <span>Ready to Transform Your Business?</span>
          </div>
          
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
            Start Your Digital Journey
            <span className="text-primary block">Today</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Join thousands of successful MSMEs who have transformed their businesses with NoteNetra. 
            Get instant access to smart transaction tracking, AI-powered credit scoring, and automated invoicing.
          </p>

          {/* Primary CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button
              variant="default"
              size="xl"
              iconName="ShoppingCart"
              iconPosition="left"
              className="transition-micro hover-lift shadow-interactive"
            >
              Order Device Now - ₹2,999/month
            </Button>
            <Button
              variant="outline"
              size="xl"
              iconName="Play"
              iconPosition="left"
              className="transition-micro hover-lift"
            >
              Watch Live Demo
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} color="var(--color-success)" strokeWidth={2} />
              <span>30-day money-back guarantee</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Truck" size={16} color="var(--color-success)" strokeWidth={2} />
              <span>Free installation & setup</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={16} color="var(--color-success)" strokeWidth={2} />
              <span>42,000+ happy customers</span>
            </div>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {ctaFeatures?.map((feature, index) => (
            <div key={index} className="bg-card rounded-xl shadow-card border border-border p-6 text-center hover:shadow-interactive transition-smooth hover-lift">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Icon name={feature?.icon} size={24} color="var(--color-primary)" strokeWidth={2} />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{feature?.title}</h3>
              <p className="text-sm text-muted-foreground">{feature?.description}</p>
            </div>
          ))}
        </div>

        {/* Urgency Section */}
        <div className="bg-card rounded-2xl shadow-card border border-border p-8 mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Limited Time Offer - Act Now!
            </h3>
            <p className="text-muted-foreground">
              Don't miss out on these exclusive benefits available only this month.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {urgencyFactors?.map((factor, index) => (
              <div key={index} className="flex items-center space-x-3 p-4 bg-warning/5 rounded-lg border border-warning/20">
                <Icon name="Clock" size={16} color="var(--color-warning)" strokeWidth={2} />
                <span className="text-sm text-foreground">{factor}</span>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <div className="inline-flex items-center space-x-2 bg-error/10 text-error px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Icon name="Timer" size={16} strokeWidth={2} />
              <span>Offer expires in 7 days</span>
            </div>
            <div className="text-xs text-muted-foreground">
              *Terms and conditions apply. Limited to first 500 customers.
            </div>
          </div>
        </div>

        {/* Alternative CTAs */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* For Hesitant Customers */}
          <div className="bg-card rounded-xl shadow-card border border-border p-8 text-center">
            <Icon name="MessageCircle" size={48} className="mx-auto mb-4 text-primary" strokeWidth={1.5} />
            <h3 className="text-xl font-bold text-foreground mb-4">
              Still Have Questions?
            </h3>
            <p className="text-muted-foreground mb-6">
              Schedule a free consultation with our MSME experts. Get personalized advice for your business needs.
            </p>
            <Button
              variant="outline"
              fullWidth
              iconName="Calendar"
              iconPosition="left"
            >
              Schedule Free Consultation
            </Button>
          </div>

          {/* For Tech-Savvy Customers */}
          <div className="bg-card rounded-xl shadow-card border border-border p-8 text-center">
            <Icon name="Monitor" size={48} className="mx-auto mb-4 text-accent" strokeWidth={1.5} />
            <h3 className="text-xl font-bold text-foreground mb-4">
              Want to See It in Action?
            </h3>
            <p className="text-muted-foreground mb-6">
              Experience our live dashboard demo and see how NoteNetra can transform your business operations.
            </p>
            <Button
              variant="outline"
              fullWidth
              iconName="ExternalLink"
              iconPosition="right"
              onClick={() => window.open('/dashboard-demo', '_blank')}
            >
              Try Interactive Demo
            </Button>
          </div>
        </div>

        {/* Final Push */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Transform Your MSME Today
            </h3>
            <p className="text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
              Don't let your competitors get ahead. Join the digital revolution and unlock your business's true potential with NoteNetra's intelligent platform.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="secondary"
                size="lg"
                iconName="Phone"
                iconPosition="left"
                className="bg-white text-primary hover:bg-white/90"
              >
                Call Now: +91-9876543210
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName="MessageSquare"
                iconPosition="left"
                className="border-white text-white hover:bg-white/10"
              >
                WhatsApp Support
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;