import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PricingCard = ({ plan, isPopular = false, onOrderClick }) => {
  const {
    name,
    price,
    monthlyFee,
    description,
    features,
    transactionLimit,
    setupCost,
    badge
  } = plan;

  return (
    <div className={`relative bg-card rounded-2xl border transition-smooth hover-lift ${
      isPopular 
        ? 'border-primary shadow-interactive scale-105' 
        : 'border-border shadow-card hover:shadow-interactive'
    }`}>
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-primary text-primary-foreground px-6 py-2 rounded-full text-sm font-semibold shadow-interactive">
            {badge || 'Most Popular'}
          </div>
        </div>
      )}
      <div className="p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-foreground mb-2">{name}</h3>
          <p className="text-muted-foreground mb-6">{description}</p>
          
          {/* Pricing */}
          <div className="space-y-2">
            <div className="flex items-center justify-center space-x-2">
              <span className="text-4xl font-bold text-foreground">₹{price?.toLocaleString('en-IN')}</span>
              <span className="text-muted-foreground">device</span>
            </div>
            <div className="text-muted-foreground">
              + ₹{monthlyFee?.toLocaleString('en-IN')}/month dashboard
            </div>
            {setupCost > 0 && (
              <div className="text-sm text-muted-foreground">
                Setup: ₹{setupCost?.toLocaleString('en-IN')}
              </div>
            )}
          </div>
        </div>

        {/* Transaction Limit */}
        <div className="bg-muted rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Transaction Limit</span>
            <span className="font-semibold text-foreground">
              {transactionLimit === 'unlimited' ? 'Unlimited' : `₹${transactionLimit?.toLocaleString('en-IN')}/month`}
            </span>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-4 mb-8">
          {features?.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-0.5">
                <Icon 
                  name="Check" 
                  size={18} 
                  color="var(--color-success)" 
                  strokeWidth={2.5}
                />
              </div>
              <span className="text-sm text-foreground">{feature}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <Button
          variant={isPopular ? "default" : "outline"}
          fullWidth
          size="lg"
          onClick={() => onOrderClick(plan)}
          iconName="ShoppingCart"
          iconPosition="left"
          className="transition-smooth hover-lift"
        >
          Order Now
        </Button>
      </div>
    </div>
  );
};

export default PricingCard;