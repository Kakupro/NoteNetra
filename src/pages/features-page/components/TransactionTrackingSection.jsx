import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';



const TransactionTrackingSection = () => {
  const [activeDemo, setActiveDemo] = useState('cash');

  const trackingFeatures = [
    {
      icon: 'Banknote',
      title: 'Cash Transaction Detection',
      description: 'Advanced computer vision technology automatically detects and logs cash transactions with 99.2% accuracy.',
      benefits: ['Real-time cash flow monitoring', 'Automated transaction categorization', 'Fraud detection alerts']
    },
    {
      icon: 'Smartphone',
      title: 'UPI Integration',
      description: 'Seamless integration with all major UPI platforms for comprehensive digital payment tracking.',
      benefits: ['Multi-platform UPI support', 'Instant transaction verification', 'Automated reconciliation']
    },
    {
      icon: 'BarChart3',
      title: 'Analytics Dashboard',
      description: 'Real-time insights into transaction patterns, peak hours, and customer behavior analytics.',
      benefits: ['Live transaction monitoring', 'Predictive analytics', 'Custom reporting tools']
    }
  ];

  const demoOptions = [
    { id: 'cash', label: 'Cash Scanning', icon: 'Banknote' },
    { id: 'upi', label: 'UPI Tracking', icon: 'Smartphone' },
    { id: 'analytics', label: 'Live Analytics', icon: 'BarChart3' }
  ];

  return (
    <section id="transaction-tracking" className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto content-spacing">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Icon name="Activity" size={16} strokeWidth={2} />
            <span>Transaction Tracking</span>
          </div>
          
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            Never Miss a Transaction
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our intelligent device captures every cash and digital transaction, providing complete visibility into your business operations.
          </p>
        </div>

        {/* Interactive Demo Section */}
        <div className="bg-card rounded-2xl shadow-card border border-border p-8 mb-16">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Demo Controls */}
            <div className="lg:w-1/3">
              <h3 className="text-2xl font-bold text-foreground mb-6">Live Demo</h3>
              <div className="space-y-4">
                {demoOptions?.map((option) => (
                  <button
                    key={option?.id}
                    onClick={() => setActiveDemo(option?.id)}
                    className={`w-full flex items-center space-x-3 p-4 rounded-lg text-left transition-micro ${
                      activeDemo === option?.id
                        ? 'bg-primary text-primary-foreground shadow-interactive'
                        : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon 
                      name={option?.icon} 
                      size={20} 
                      color={activeDemo === option?.id ? 'white' : 'currentColor'}
                      strokeWidth={2}
                    />
                    <span className="font-medium">{option?.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Demo Visualization */}
            <div className="lg:w-2/3">
              <div className="relative bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-8 min-h-[300px] flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mb-6 mx-auto animate-pulse">
                    <Icon name="Monitor" size={40} color="var(--color-primary)" strokeWidth={2} />
                  </div>
                  <h4 className="text-xl font-bold text-foreground mb-2">
                    {activeDemo === 'cash' && 'Cash Transaction Scanning'}
                    {activeDemo === 'upi' && 'UPI Payment Tracking'}
                    {activeDemo === 'analytics' && 'Real-time Analytics'}
                  </h4>
                  <p className="text-muted-foreground mb-4">
                    {activeDemo === 'cash' && 'Watch as our device automatically detects and logs cash transactions'}
                    {activeDemo === 'upi' && 'See how UPI payments are instantly captured and categorized'}
                    {activeDemo === 'analytics' && 'View live transaction data and business insights'}
                  </p>
                  <div className="inline-flex items-center space-x-2 text-sm text-accent">
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                    <span>Live Demo Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {trackingFeatures?.map((feature, index) => (
            <div key={index} className="bg-card rounded-xl shadow-card border border-border p-8 hover:shadow-interactive transition-smooth hover-lift">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <Icon name={feature?.icon} size={24} color="var(--color-primary)" strokeWidth={2} />
              </div>
              
              <h3 className="text-xl font-bold text-foreground mb-4">{feature?.title}</h3>
              <p className="text-muted-foreground mb-6">{feature?.description}</p>
              
              <ul className="space-y-2">
                {feature?.benefits?.map((benefit, benefitIndex) => (
                  <li key={benefitIndex} className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Icon name="Check" size={16} color="var(--color-accent)" strokeWidth={2} />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Technical Specifications */}
        <div className="mt-16 bg-muted/50 rounded-2xl p-8">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            <div className="lg:w-1/2">
              <h3 className="text-2xl font-bold text-foreground mb-6">Technical Specifications</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-card rounded-lg p-4">
                  <div className="text-2xl font-bold text-primary mb-1">99.2%</div>
                  <div className="text-sm text-muted-foreground">Detection Accuracy</div>
                </div>
                <div className="bg-card rounded-lg p-4">
                  <div className="text-2xl font-bold text-primary mb-1">&lt;2s</div>
                  <div className="text-sm text-muted-foreground">Processing Time</div>
                </div>
                <div className="bg-card rounded-lg p-4">
                  <div className="text-2xl font-bold text-primary mb-1">24/7</div>
                  <div className="text-sm text-muted-foreground">Monitoring</div>
                </div>
                <div className="bg-card rounded-lg p-4">
                  <div className="text-2xl font-bold text-primary mb-1">100+</div>
                  <div className="text-sm text-muted-foreground">Currencies Supported</div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2">
              <h4 className="text-lg font-semibold text-foreground mb-4">Integration Details</h4>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <Icon name="Check" size={16} color="var(--color-accent)" strokeWidth={2} />
                  <span className="text-muted-foreground">Compatible with all major POS systems</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Icon name="Check" size={16} color="var(--color-accent)" strokeWidth={2} />
                  <span className="text-muted-foreground">Real-time API integration</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Icon name="Check" size={16} color="var(--color-accent)" strokeWidth={2} />
                  <span className="text-muted-foreground">Cloud-based data synchronization</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Icon name="Check" size={16} color="var(--color-accent)" strokeWidth={2} />
                  <span className="text-muted-foreground">Multi-device support</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransactionTrackingSection;