import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContactInfo = () => {
  const contactMethods = [
    {
      icon: 'Phone',
      title: 'Sales Inquiries',
      primary: '+91 98765 43210',
      secondary: '+91 87654 32109',
      description: 'Mon-Fri, 9:00 AM - 6:00 PM IST',
      action: () => window.open('tel:+919876543210')
    },
    {
      icon: 'Mail',
      title: 'Email Support',
      primary: 'sales@notenetra.com',
      secondary: 'support@notenetra.com',
      description: 'Response within 24 hours',
      action: () => window.open('mailto:sales@notenetra.com')
    },
    {
      icon: 'MapPin',
      title: 'Business Address',
      primary: 'NoteNetra Technologies Pvt Ltd',
      secondary: 'Sector 62, Noida, UP 201309',
      description: 'Visit by appointment only',
      action: () => window.open('https://maps.google.com/?q=28.6139,77.2090')
    },
    {
      icon: 'Clock',
      title: 'Business Hours',
      primary: 'Monday - Friday: 9:00 AM - 6:00 PM',
      secondary: 'Saturday: 10:00 AM - 4:00 PM',
      description: 'Sunday: Closed',
      action: null
    }
  ];

  const socialLinks = [
    {
      icon: 'Linkedin',
      name: 'LinkedIn',
      url: 'https://linkedin.com/company/notenetra',
      color: '#0077B5'
    },
    {
      icon: 'Twitter',
      name: 'Twitter',
      url: 'https://twitter.com/notenetra',
      color: '#1DA1F2'
    },
    {
      icon: 'Youtube',
      name: 'YouTube',
      url: 'https://youtube.com/@notenetra',
      color: '#FF0000'
    },
    {
      icon: 'Instagram',
      name: 'Instagram',
      url: 'https://instagram.com/notenetra',
      color: '#E4405F'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Contact Methods */}
      <div className="bg-card rounded-xl shadow-card p-8 border border-border">
        <h2 className="text-2xl font-semibold text-foreground mb-6">
          Contact Information
        </h2>
        
        <div className="space-y-6">
          {contactMethods?.map((method, index) => (
            <div
              key={index}
              className={`flex items-start space-x-4 p-4 rounded-lg transition-micro ${
                method?.action ? 'hover:bg-muted cursor-pointer' : 'bg-muted/50'
              }`}
              onClick={method?.action}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon 
                  name={method?.icon} 
                  size={24} 
                  color="var(--color-primary)" 
                  strokeWidth={2} 
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground mb-1">
                  {method?.title}
                </h3>
                <p className="text-sm text-foreground font-medium mb-1">
                  {method?.primary}
                </p>
                {method?.secondary && (
                  <p className="text-sm text-muted-foreground mb-1">
                    {method?.secondary}
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  {method?.description}
                </p>
              </div>
              {method?.action && (
                <Icon 
                  name="ExternalLink" 
                  size={16} 
                  className="text-muted-foreground" 
                  strokeWidth={2} 
                />
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Google Maps */}
      <div className="bg-card rounded-xl shadow-card overflow-hidden border border-border">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Our Location
          </h3>
          <p className="text-muted-foreground text-sm">
            Visit our office in Noida for in-person consultations and device demonstrations.
          </p>
        </div>
        <div className="h-64 relative">
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title="NoteNetra Office Location"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=28.6139,77.2090&z=14&output=embed"
            className="border-0"
          />
        </div>
      </div>
      {/* Social Media */}
      <div className="bg-card rounded-xl shadow-card p-8 border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Follow Us
        </h3>
        <p className="text-muted-foreground text-sm mb-6">
          Stay updated with the latest news, product updates, and industry insights.
        </p>
        
        <div className="grid grid-cols-2 gap-4">
          {socialLinks?.map((social, index) => (
            <Button
              key={index}
              variant="outline"
              onClick={() => window.open(social?.url, '_blank')}
              iconName={social?.icon}
              iconPosition="left"
              className="justify-start transition-micro hover-lift"
            >
              {social?.name}
            </Button>
          ))}
        </div>
      </div>
      {/* Trust Signals */}
      <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-6 border border-border">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon name="Shield" size={24} color="var(--color-success)" strokeWidth={2} />
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">
              Trusted by 500+ MSMEs
            </h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Icon name="Check" size={16} color="var(--color-success)" strokeWidth={2} />
                <span>ISO 27001 Certified for Data Security</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Check" size={16} color="var(--color-success)" strokeWidth={2} />
                <span>RBI Approved Payment Gateway Partner</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Check" size={16} color="var(--color-success)" strokeWidth={2} />
                <span>MSME Registration: UDYAM-UP-06-0123456</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Check" size={16} color="var(--color-success)" strokeWidth={2} />
                <span>24/7 Customer Support Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;