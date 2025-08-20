import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import PricingCard from './components/PricingCard';
import ROICalculator from './components/ROICalculator';
import FeatureComparison from './components/FeatureComparison';
import FAQSection from './components/FAQSection';
import TrustSignals from './components/TrustSignals';

const PricingPage = () => {
  const navigate = useNavigate();
  const [showStickyButton, setShowStickyButton] = useState(false);

  const pricingPlans = [
    {
      id: 'starter',
      name: 'Starter',
      price: 2999,
      monthlyFee: 749,
      setupCost: 0,
      description: 'Perfect for small businesses starting their digital journey',
      transactionLimit: 500000,
      features: [
        'Cash & UPI transaction logging',
        'Basic dashboard access',
        '3-month transaction history',
        'Email support',
        'Self-service setup',
        'Basic sales reports',
        'Mobile app access',
        'Data backup & security'
      ]
    },
    {
      id: 'professional',
      name: 'Professional',
      price: 5999,
      monthlyFee: 1499,
      setupCost: 1999,
      description: 'Ideal for growing businesses with multiple locations',
      transactionLimit: 2000000,
      badge: 'Most Popular',
      features: [
        'Everything in Starter',
        '12-month transaction history',
        'Multi-location support (up to 3)',
        'Staff account management (3 accounts)',
        'Customer analytics & insights',
        'Inventory tracking',
        'Phone & email support',
        '2 hours setup assistance',
        'Real-time dashboards',
        'Export reports (Excel/PDF)',
        'Basic API access',
        '2 accounting software integrations'
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 9999,
      monthlyFee: 3299,
      setupCost: 2999,
      description: 'Complete solution for established businesses',
      transactionLimit: 'unlimited',
      features: [
        'Everything in Professional',
        'Unlimited transaction history',
        'Unlimited locations',
        'Unlimited staff accounts',
        'Custom business rules',
        'Profit margin analysis',
        'Predictive analytics',
        'Custom report builder',
        'Priority support',
        'Dedicated account manager',
        '8 hours setup & training',
        'Monthly business reviews',
        'E-commerce platform sync',
        'ONDC marketplace integration',
        'Banking API integration',
        'Custom webhook support',
        'Third-party app marketplace'
      ]
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      setShowStickyButton(scrollPosition > windowHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOrderClick = (plan) => {
    // Navigate to contact page with plan information
    navigate('/contact-page', { 
      state: { 
        selectedPlan: plan,
        source: 'pricing'
      }
    });
  };

  const handleGetStarted = () => {
    navigate('/contact-page');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="content-spacing">
        {/* Breadcrumb */}
        <Breadcrumb />

        {/* Hero Section */}
        <section className="text-center py-16">
          <div className="max-w-4xl mx-auto">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="DollarSign" size={40} color="var(--color-primary)" strokeWidth={2} />
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Simple, Transparent Pricing
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Choose the perfect NoteNetra plan for your MSME business. 
              <br className="hidden sm:block" />
              Start building credit visibility and unlock growth opportunities today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="default"
                size="lg"
                onClick={() => document.getElementById('pricing-cards')?.scrollIntoView({ behavior: 'smooth' })}
                iconName="ArrowDown"
                iconPosition="right"
                className="transition-smooth hover-lift"
              >
                View Plans
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/dashboard-demo')}
                iconName="Play"
                iconPosition="left"
                className="transition-smooth hover-lift"
              >
                Try Demo First
              </Button>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section id="pricing-cards" className="py-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Choose Your Plan
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                All plans include the NoteNetra device, dashboard access, and our credit-building technology. 
                Upgrade or downgrade anytime as your business grows.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 mb-16">
              {pricingPlans?.map((plan, index) => (
                <PricingCard
                  key={plan?.id}
                  plan={plan}
                  isPopular={plan?.id === 'professional'}
                  onOrderClick={handleOrderClick}
                />
              ))}
            </div>

            {/* Value Proposition */}
            <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8 text-center border border-primary/20">
              <div className="max-w-3xl mx-auto">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Every Plan Includes Credit Building
                </h3>
                <p className="text-muted-foreground mb-6">
                  All NoteNetra plans automatically track your business transactions and build your credit profile. 
                  See improvements in 3-6 months and unlock loan eligibility worth 30% of your annual transaction volume.
                </p>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                  <div className="p-4">
                    <div className="text-2xl font-bold text-primary mb-1">50-150</div>
                    <div className="text-sm text-muted-foreground">Credit Score Improvement</div>
                  </div>
                  <div className="p-4">
                    <div className="text-2xl font-bold text-primary mb-1">3-6</div>
                    <div className="text-sm text-muted-foreground">Months to See Results</div>
                  </div>
                  <div className="p-4">
                    <div className="text-2xl font-bold text-primary mb-1">30%</div>
                    <div className="text-sm text-muted-foreground">Loan Eligibility Ratio</div>
                  </div>
                  <div className="p-4">
                    <div className="text-2xl font-bold text-primary mb-1">10K+</div>
                    <div className="text-sm text-muted-foreground">MSMEs Trust Us</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ROI Calculator */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto">
            <ROICalculator />
          </div>
        </section>

        {/* Feature Comparison */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto">
            <FeatureComparison />
          </div>
        </section>

        {/* Trust Signals */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto">
            <TrustSignals />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto">
            <FAQSection />
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-12 text-white">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl opacity-90 mb-8">
                Join 10,000+ MSMEs who've improved their credit scores and unlocked growth with NoteNetra
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={handleGetStarted}
                  iconName="ShoppingCart"
                  iconPosition="left"
                  className="bg-white text-primary hover:bg-gray-100 transition-smooth hover-lift"
                >
                  Order Your Device
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate('/dashboard-demo')}
                  iconName="Monitor"
                  iconPosition="left"
                  className="border-white text-white hover:bg-white/10 transition-smooth hover-lift"
                >
                  See Live Demo
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* Sticky CTA Button */}
      {showStickyButton && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            variant="default"
            size="lg"
            onClick={handleGetStarted}
            iconName="ShoppingCart"
            iconPosition="left"
            className="shadow-interactive transition-smooth hover-lift"
          >
            Get Started
          </Button>
        </div>
      )}
      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-7xl mx-auto content-spacing">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Zap" size={20} color="white" strokeWidth={2.5} />
                </div>
                <span className="text-xl font-bold text-foreground">NoteNetra</span>
              </div>
              <p className="text-muted-foreground">
                Transforming MSME transactions into business growth opportunities through smart credit visibility.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
              <div className="space-y-2">
                <button onClick={() => navigate('/landing-page')} className="block text-muted-foreground hover:text-primary transition-micro">
                  Home
                </button>
                <button onClick={() => navigate('/features-page')} className="block text-muted-foreground hover:text-primary transition-micro">
                  Features
                </button>
                <button onClick={() => navigate('/dashboard-demo')} className="block text-muted-foreground hover:text-primary transition-micro">
                  Demo
                </button>
                <button onClick={() => navigate('/contact-page')} className="block text-muted-foreground hover:text-primary transition-micro">
                  Contact
                </button>
              </div>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <div className="space-y-2">
                <a href="mailto:support@notenetra.com" className="block text-muted-foreground hover:text-primary transition-micro">
                  Email Support
                </a>
                <a href="tel:+911800123456" className="block text-muted-foreground hover:text-primary transition-micro">
                  Phone Support
                </a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-micro">
                  Help Center
                </a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-micro">
                  Documentation
                </a>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Contact</h4>
              <div className="space-y-2 text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Icon name="Mail" size={16} strokeWidth={2} />
                  <span>support@notenetra.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Phone" size={16} strokeWidth={2} />
                  <span>+91 1800 123 456</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="MapPin" size={16} strokeWidth={2} />
                  <span>Mumbai, India</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; {new Date()?.getFullYear()} NoteNetra. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PricingPage;