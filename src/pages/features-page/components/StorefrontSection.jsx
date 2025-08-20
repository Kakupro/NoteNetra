import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const StorefrontSection = () => {
  const [activeTab, setActiveTab] = useState('ondc');

  const storefrontFeatures = [
    {
      icon: 'Store',
      title: 'ONDC Integration',
      description: 'Seamlessly connect to India\'s Open Network for Digital Commerce for nationwide reach.',
      benefits: ['Access to 100M+ customers', 'Zero commission fees', 'Government-backed platform']
    },
    {
      icon: 'Smartphone',
      title: 'Mobile-First Design',
      description: 'Responsive storefront optimized for mobile shopping experiences across all devices.',
      benefits: ['Mobile-optimized checkout', 'Fast loading times', 'Touch-friendly interface']
    },
    {
      icon: 'CreditCard',
      title: 'Multi-Payment Gateway',
      description: 'Accept payments through UPI, cards, wallets, and cash-on-delivery options.',
      benefits: ['15+ payment methods', 'Instant settlements', 'Fraud protection']
    },
    {
      icon: 'BarChart3',
      title: 'Analytics Dashboard',
      description: 'Track sales performance, customer behavior, and inventory management in real-time.',
      benefits: ['Real-time insights', 'Customer analytics', 'Inventory tracking']
    }
  ];

  const marketplaceStats = [
    { label: 'Active Customers', value: '100M+', icon: 'Users' },
    { label: 'Daily Orders', value: '2.5M+', icon: 'ShoppingCart' },
    { label: 'Partner Stores', value: '50K+', icon: 'Store' },
    { label: 'Cities Covered', value: '500+', icon: 'MapPin' }
  ];

  const integrationSteps = [
    {
      step: 1,
      title: 'Product Catalog Sync',
      description: 'Automatically sync your existing inventory with ONDC-compatible product listings.',
      icon: 'Package'
    },
    {
      step: 2,
      title: 'Store Setup',
      description: 'Create your digital storefront with customizable themes and branding options.',
      icon: 'Paintbrush'
    },
    {
      step: 3,
      title: 'Go Live',
      description: 'Launch your store on ONDC network and start receiving orders from across India.',
      icon: 'Rocket'
    }
  ];

  const tabContent = {
    ondc: {
      title: 'ONDC Marketplace',
      description: 'Connect to India\'s largest digital commerce network',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
      features: ['Government-backed platform', 'Zero commission model', 'Pan-India reach', 'Standardized APIs']
    },
    ecommerce: {
      title: 'E-commerce Platform',
      description: 'Build your own branded online store',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop',
      features: ['Custom domain', 'Brand customization', 'SEO optimization', 'Social media integration']
    },
    mobile: {
      title: 'Mobile App',
      description: 'Native mobile app for your customers',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop',
      features: ['Push notifications', 'Offline browsing', 'Location-based services', 'Loyalty programs']
    }
  };

  return (
    <section id="storefront" className="py-16 lg:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto content-spacing">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Icon name="Store" size={16} strokeWidth={2} />
            <span>Digital Storefront</span>
          </div>
          
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            Expand Your Reach with
            <span className="text-primary block">ONDC Integration</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transform your local business into a nationwide digital commerce powerhouse with seamless ONDC integration and multi-channel selling capabilities.
          </p>
        </div>

        {/* Marketplace Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {marketplaceStats?.map((stat, index) => (
            <div key={index} className="bg-card rounded-xl shadow-card border border-border p-6 text-center hover:shadow-interactive transition-smooth hover-lift">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Icon name={stat?.icon} size={24} color="var(--color-accent)" strokeWidth={2} />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">{stat?.value}</div>
              <div className="text-sm text-muted-foreground">{stat?.label}</div>
            </div>
          ))}
        </div>

        {/* Platform Tabs */}
        <div className="bg-card rounded-2xl shadow-card border border-border overflow-hidden mb-16">
          <div className="flex border-b border-border">
            {Object.entries(tabContent)?.map(([key, content]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-micro ${
                  activeTab === key
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {content?.title}
              </button>
            ))}
          </div>
          
          <div className="p-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  {tabContent?.[activeTab]?.title}
                </h3>
                <p className="text-lg text-muted-foreground mb-6">
                  {tabContent?.[activeTab]?.description}
                </p>
                
                <ul className="space-y-3 mb-8">
                  {tabContent?.[activeTab]?.features?.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <Icon name="Check" size={16} color="var(--color-accent)" strokeWidth={2} />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button
                  variant="default"
                  iconName="ExternalLink"
                  iconPosition="right"
                >
                  Learn More
                </Button>
              </div>
              
              <div className="relative">
                <div className="aspect-[4/3] bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl overflow-hidden">
                  <Image
                    src={tabContent?.[activeTab]?.image}
                    alt={tabContent?.[activeTab]?.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {storefrontFeatures?.map((feature, index) => (
            <div key={index} className="bg-card rounded-xl shadow-card border border-border p-8 hover:shadow-interactive transition-smooth hover-lift">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={feature?.icon} size={24} color="var(--color-accent)" strokeWidth={2} />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-3">{feature?.title}</h3>
                  <p className="text-muted-foreground mb-4">{feature?.description}</p>
                  
                  <ul className="space-y-2">
                    {feature?.benefits?.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Icon name="Check" size={14} color="var(--color-accent)" strokeWidth={2} />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Integration Process */}
        <div className="bg-card rounded-2xl shadow-card border border-border p-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-foreground mb-4">Get Online in 3 Simple Steps</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Launch your digital storefront and start selling on ONDC network within minutes, not months.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {integrationSteps?.map((step, index) => (
              <div key={index} className="relative text-center">
                {index < integrationSteps?.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-accent to-transparent transform translate-x-4 -translate-y-1/2" />
                )}
                
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Icon name={step?.icon} size={28} color="var(--color-accent)" strokeWidth={2} />
                </div>
                
                <div className="text-2xl font-bold text-accent mb-2">Step {step?.step}</div>
                <h4 className="text-lg font-semibold text-foreground mb-3">{step?.title}</h4>
                <p className="text-sm text-muted-foreground">{step?.description}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button
              variant="default"
              size="lg"
              iconName="Rocket"
              iconPosition="left"
              className="transition-micro hover-lift"
            >
              Start Your Digital Journey
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorefrontSection;