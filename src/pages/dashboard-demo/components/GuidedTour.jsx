import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GuidedTour = ({ isActive, onClose, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const tourSteps = [
    {
      title: "Welcome to NoteNetra Dashboard",
      content: "This interactive demo showcases how our smart device transforms your business transactions into valuable insights and credit opportunities.",
      target: "header",
      position: "bottom"
    },
    {
      title: "Navigation Menu",
      content: "Use the sidebar to explore different sections: Overview for key metrics, Transactions for detailed logs, Credit Score for loan eligibility, and Reports for business analytics.",
      target: "sidebar",
      position: "right"
    },
    {
      title: "Key Performance Indicators",
      content: "These cards display your most important business metrics at a glance - revenue, transactions, credit score, and loan eligibility amounts.",
      target: "kpi-cards",
      position: "bottom"
    },
    {
      title: "Interactive Charts",
      content: "Hover over charts and graphs to see detailed information. These visualizations help you understand trends and make informed business decisions.",
      target: "charts",
      position: "top"
    },
    {
      title: "Credit Score Tracking",
      content: "Monitor your business credit score improvement over time. Higher scores unlock better loan terms and higher eligibility amounts.",
      target: "credit-section",
      position: "top"
    },
    {
      title: "Ready to Get Started?",
      content: "This demo shows real potential of NoteNetra\'s platform. Order your device today to start building your business credit profile and unlock growth opportunities.",
      target: "cta-section",
      position: "top"
    }
  ];

  useEffect(() => {
    if (isActive) {
      setIsVisible(true);
      setCurrentStep(0);
    } else {
      setIsVisible(false);
    }
  }, [isActive]);

  const nextStep = () => {
    if (currentStep < tourSteps?.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeTour();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const skipTour = () => {
    setIsVisible(false);
    onClose();
  };

  const completeTour = () => {
    setIsVisible(false);
    onComplete();
  };

  if (!isVisible) return null;

  const currentTourStep = tourSteps?.[currentStep];

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300">
        {/* Tour Tooltip */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-dark-bg-card rounded-xl shadow-2xl border border-dark-border-primary p-6 max-w-md w-full mx-4 animate-fade-in">
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-dark-text-secondary">
                Step {currentStep + 1} of {tourSteps?.length}
              </span>
              <button
                onClick={skipTour}
                className="text-dark-text-muted hover:text-dark-text-primary transition-colors"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / tourSteps?.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Content */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              {currentTourStep?.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {currentTourStep?.content}
            </p>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              iconName="ChevronLeft"
              iconPosition="left"
            >
              Previous
            </Button>

            <div className="flex items-center space-x-2">
              {tourSteps?.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentStep ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            {currentStep === tourSteps?.length - 1 ? (
              <Button
                variant="default"
                onClick={completeTour}
                iconName="CheckCircle"
                iconPosition="right"
              >
                Get Started
              </Button>
            ) : (
              <Button
                variant="default"
                onClick={nextStep}
                iconName="ChevronRight"
                iconPosition="right"
              >
                Next
              </Button>
            )}
          </div>

          {/* Skip Option */}
          <div className="text-center mt-4">
            <button
              onClick={skipTour}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Skip tour
            </button>
          </div>
        </div>

        {/* Spotlight Effect (Optional Enhancement) */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="relative w-full h-full">
            {/* This could be enhanced to highlight specific elements */}
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white bg-opacity-10 rounded-full blur-xl animate-pulse" />
          </div>
        </div>
      </div>
    </>
  );
};

export default GuidedTour;