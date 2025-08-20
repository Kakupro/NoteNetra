import React, { useState } from 'react';
import CustomLogo from './CustomLogo';

const LogoSelector = ({ onLogoChange }) => {
  const [selectedDesign, setSelectedDesign] = useState('modern');

  const logoOptions = [
    { id: 'modern', name: 'Modern Tech', description: 'Blue to purple gradient with layered design' },
    { id: 'tech', name: 'Tech Check', description: 'Green to blue with checkmark symbol' },
    { id: 'finance', name: 'Finance Star', description: 'Emerald to teal with star pattern' },
    { id: 'minimal', name: 'Minimal', description: 'Simple slate design with lines' }
  ];

  const handleLogoChange = (design) => {
    setSelectedDesign(design);
    if (onLogoChange) {
      onLogoChange(design);
    }
  };

  return (
    <div className="bg-dark-bg-card rounded-lg border border-dark-border-primary p-4">
      <h3 className="text-lg font-semibold text-dark-text-primary mb-4">Choose Your Logo Design</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {logoOptions.map((option) => (
          <div
            key={option.id}
            onClick={() => handleLogoChange(option.id)}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
              selectedDesign === option.id
                ? 'border-dark-accent-primary bg-dark-accent-primary/10'
                : 'border-dark-border-primary hover:border-dark-accent-primary/50'
            }`}
          >
            <div className="flex items-center space-x-3 mb-2">
              <CustomLogo design={option.id} variant="icon-only" />
              <div>
                <h4 className="font-medium text-dark-text-primary">{option.name}</h4>
                <p className="text-sm text-dark-text-secondary">{option.description}</p>
              </div>
            </div>
            
            {selectedDesign === option.id && (
              <div className="text-xs text-dark-accent-primary font-medium">
                ✓ Currently Selected
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-dark-bg-tertiary rounded-lg">
        <h4 className="font-medium text-dark-text-primary mb-2">Preview:</h4>
        <div className="flex items-center space-x-4">
          <CustomLogo design={selectedDesign} />
          <CustomLogo design={selectedDesign} variant="icon-only" />
        </div>
      </div>
    </div>
  );
};

export default LogoSelector;
