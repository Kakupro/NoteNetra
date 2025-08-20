import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ComparisonSection = () => {
  const [activeComparison, setActiveComparison] = useState('traditional');

  const comparisonData = {
    traditional: {
      title: 'Traditional Methods vs NoteNetra',
      subtitle: 'See how NoteNetra outperforms conventional business management approaches',
      categories: [
        {
          category: 'Transaction Tracking',
          traditional: {
            method: 'Manual ledger books',
            time: '2-3 hours daily',
            accuracy: '70-80%',
            cost: '₹15,000/month',
            icon: 'BookOpen',
            issues: ['Human errors', 'Time consuming', 'No real-time data']
          },
          notenetra: {
            method: 'Automated AI detection',
            time: 'Real-time',
            accuracy: '99.2%',
            cost: '₹2,999/month',
            icon: 'Zap',
            benefits: ['Zero errors', 'Instant updates', 'Complete visibility']
          }
        },
        {
          category: 'Credit Assessment',
          traditional: {
            method: 'Bank statements & documents',
            time: '15-30 days',
            accuracy: 'Historical data only',
            cost: 'Multiple visits',
            icon: 'FileText',
            issues: ['Lengthy process', 'Document hassles', 'Limited data']
          },
          notenetra: {
            method: 'AI-powered real-time analysis',
            time: 'Instant',
            accuracy: 'Predictive insights',
            cost: 'Automated',
            icon: 'TrendingUp',
            benefits: ['Instant results', 'No paperwork', 'Comprehensive analysis']
          }
        },
        {
          category: 'Invoice Generation',
          traditional: {
            method: 'Manual creation',
            time: '15 minutes per invoice',
            accuracy: 'Prone to errors',
            cost: '₹50 per invoice',
            icon: 'Edit',
            issues: ['Time intensive', 'Formatting errors', 'No automation']
          },
          notenetra: {
            method: 'One-click automation',
            time: '5 seconds',
            accuracy: '100% accurate',
            cost: '₹2 per invoice',
            icon: 'FileText',
            benefits: ['Instant generation', 'Professional format', 'Multi-language']
          }
        }
      ]
    },
    competitors: {
      title: 'NoteNetra vs Competitors',
      subtitle: 'Compare NoteNetra with other business management solutions in the market',
      categories: [
        {
          category: 'Hardware Integration',
          competitor: {
            method: 'Software-only solutions',
            features: 'Limited tracking',
            setup: 'Complex integration',
            cost: '₹5,000-10,000/month',
            icon: 'Monitor',
            limitations: ['No physical tracking', 'Manual data entry', 'Integration issues']
          },
          notenetra: {
            method: 'Hardware + Software combo',
            features: 'Complete automation',
            setup: 'Plug & play',
            cost: '₹2,999/month',
            icon: 'Cpu',
            advantages: ['Physical transaction capture', 'Zero manual entry', 'Seamless integration']
          }
        },
        {
          category: 'MSME Focus',
          competitor: {
            method: 'Enterprise-focused',
            features: 'Complex features',
            support: 'Limited local support',
            cost: 'High pricing tiers',
            icon: 'Building',
            limitations: ['Over-complicated', 'Expensive', 'Poor local support']
          },
          notenetra: {
            method: 'MSME-specific design',
            features: 'Simple & effective',
            support: '24/7 Hindi support',
            cost: 'Affordable pricing',
            icon: 'Users',
            advantages: ['Easy to use', 'Cost-effective', 'Local language support']
          }
        }
      ]
    }
  };

  const currentData = comparisonData?.[activeComparison];

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto content-spacing">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Icon name="BarChart3" size={16} strokeWidth={2} />
            <span>Comparison Analysis</span>
          </div>
          
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            Why Choose NoteNetra?
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            See how NoteNetra stands out from traditional methods and competitor solutions with superior technology and MSME-focused approach.
          </p>

          {/* Comparison Toggle */}
          <div className="inline-flex bg-muted rounded-lg p-1">
            <button
              onClick={() => setActiveComparison('traditional')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-micro ${
                activeComparison === 'traditional' ?'bg-primary text-primary-foreground shadow-interactive' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              vs Traditional Methods
            </button>
            <button
              onClick={() => setActiveComparison('competitors')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-micro ${
                activeComparison === 'competitors' ?'bg-primary text-primary-foreground shadow-interactive' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              vs Competitors
            </button>
          </div>
        </div>

        {/* Comparison Content */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-foreground mb-2">{currentData?.title}</h3>
            <p className="text-muted-foreground">{currentData?.subtitle}</p>
          </div>

          <div className="space-y-8">
            {currentData?.categories?.map((category, index) => (
              <div key={index} className="bg-card rounded-2xl shadow-card border border-border overflow-hidden">
                <div className="bg-muted/50 px-8 py-4 border-b border-border">
                  <h4 className="text-xl font-bold text-foreground">{category?.category}</h4>
                </div>
                
                <div className="grid lg:grid-cols-2">
                  {/* Traditional/Competitor Side */}
                  <div className="p-8 border-r border-border lg:border-r lg:border-b-0 border-b">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
                        <Icon 
                          name={activeComparison === 'traditional' ? category?.traditional?.icon : category?.competitor?.icon} 
                          size={20} 
                          color="var(--color-error)" 
                          strokeWidth={2} 
                        />
                      </div>
                      <div>
                        <h5 className="font-semibold text-foreground">
                          {activeComparison === 'traditional' ? 'Traditional Method' : 'Competitors'}
                        </h5>
                        <p className="text-sm text-muted-foreground">
                          {activeComparison === 'traditional' ? category?.traditional?.method : category?.competitor?.method}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-4 mb-6">
                      {activeComparison === 'traditional' ? (
                        <>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Time Required:</span>
                            <span className="text-sm font-medium text-foreground">{category?.traditional?.time}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Accuracy:</span>
                            <span className="text-sm font-medium text-foreground">{category?.traditional?.accuracy}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Monthly Cost:</span>
                            <span className="text-sm font-medium text-foreground">{category?.traditional?.cost}</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Features:</span>
                            <span className="text-sm font-medium text-foreground">{category?.competitor?.features}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Setup:</span>
                            <span className="text-sm font-medium text-foreground">{category?.competitor?.setup}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Cost:</span>
                            <span className="text-sm font-medium text-foreground">{category?.competitor?.cost}</span>
                          </div>
                        </>
                      )}
                    </div>
                    
                    <div>
                      <h6 className="text-sm font-semibold text-error mb-2">
                        {activeComparison === 'traditional' ? 'Issues:' : 'Limitations:'}
                      </h6>
                      <ul className="space-y-1">
                        {(activeComparison === 'traditional' ? category?.traditional?.issues : category?.competitor?.limitations)?.map((issue, issueIndex) => (
                          <li key={issueIndex} className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Icon name="X" size={12} color="var(--color-error)" strokeWidth={2} />
                            <span>{issue}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* NoteNetra Side */}
                  <div className="p-8">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                        <Icon name={category?.notenetra?.icon} size={20} color="var(--color-success)" strokeWidth={2} />
                      </div>
                      <div>
                        <h5 className="font-semibold text-foreground">NoteNetra Solution</h5>
                        <p className="text-sm text-muted-foreground">{category?.notenetra?.method}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4 mb-6">
                      {activeComparison === 'traditional' ? (
                        <>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Time Required:</span>
                            <span className="text-sm font-medium text-success">{category?.notenetra?.time}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Accuracy:</span>
                            <span className="text-sm font-medium text-success">{category?.notenetra?.accuracy}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Monthly Cost:</span>
                            <span className="text-sm font-medium text-success">{category?.notenetra?.cost}</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Features:</span>
                            <span className="text-sm font-medium text-success">{category?.notenetra?.features}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Setup:</span>
                            <span className="text-sm font-medium text-success">{category?.notenetra?.setup}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Cost:</span>
                            <span className="text-sm font-medium text-success">{category?.notenetra?.cost}</span>
                          </div>
                        </>
                      )}
                    </div>
                    
                    <div>
                      <h6 className="text-sm font-semibold text-success mb-2">
                        {activeComparison === 'traditional' ? 'Benefits:' : 'Advantages:'}
                      </h6>
                      <ul className="space-y-1">
                        {(activeComparison === 'traditional' ? category?.notenetra?.benefits : category?.notenetra?.advantages)?.map((benefit, benefitIndex) => (
                          <li key={benefitIndex} className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Icon name="Check" size={12} color="var(--color-success)" strokeWidth={2} />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ROI Summary */}
        <div className="bg-gradient-to-br from-success/5 to-primary/5 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-6">
            Average ROI with NoteNetra
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="bg-card rounded-xl p-6 shadow-card">
              <div className="text-3xl font-bold text-success mb-2">300%</div>
              <div className="text-sm text-muted-foreground">Return on Investment</div>
              <div className="text-xs text-muted-foreground mt-1">Within 6 months</div>
            </div>
            <div className="bg-card rounded-xl p-6 shadow-card">
              <div className="text-3xl font-bold text-primary mb-2">₹50K</div>
              <div className="text-sm text-muted-foreground">Monthly Savings</div>
              <div className="text-xs text-muted-foreground mt-1">On operational costs</div>
            </div>
            <div className="bg-card rounded-xl p-6 shadow-card">
              <div className="text-3xl font-bold text-accent mb-2">85%</div>
              <div className="text-sm text-muted-foreground">Time Reduction</div>
              <div className="text-xs text-muted-foreground mt-1">In manual processes</div>
            </div>
          </div>
          
          <Button
            variant="default"
            size="lg"
            iconName="Calculator"
            iconPosition="left"
            className="transition-micro hover-lift"
          >
            Calculate Your ROI
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;