import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FeatureHero = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16 lg:py-24">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="max-w-7xl mx-auto content-spacing relative">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Icon name="Zap" size={16} strokeWidth={2} />
            <span>Comprehensive Platform Features</span>
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Transform Your MSME with
            <span className="text-primary block">Smart Technology</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
            Discover how NoteNetra's intelligent platform converts every transaction into business growth opportunities through advanced analytics, automated invoicing, and credit visibility.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="default"
              size="lg"
              iconName="Play"
              iconPosition="left"
              className="transition-micro hover-lift"
            >
              Watch Demo
            </Button>
            <Button
              variant="outline"
              size="lg"
              iconName="Download"
              iconPosition="left"
              className="transition-micro hover-lift"
            >
              Feature Guide
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureHero;