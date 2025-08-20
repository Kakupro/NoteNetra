import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    inquiryType: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const inquiryOptions = [
    { value: 'sales', label: 'Sales Inquiry' },
    { value: 'support', label: 'Technical Support' },
    { value: 'partnership', label: 'Partnership Opportunity' },
    { value: 'demo', label: 'Demo Request' }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid business email address';
    }

    if (!formData?.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/?.test(formData?.phone?.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit Indian mobile number';
    }

    if (!formData?.company?.trim()) {
      newErrors.company = 'Company name is required';
    }

    if (!formData?.inquiryType) {
      newErrors.inquiryType = 'Please select an inquiry type';
    }

    if (!formData?.message?.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData?.message?.trim()?.length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const formatPhoneNumber = (value) => {
    const numbers = value?.replace(/\D/g, '');
    if (numbers?.length <= 10) {
      return numbers?.replace(/(\d{5})(\d{5})/, '$1 $2');
    }
    return numbers?.slice(0, 10)?.replace(/(\d{5})(\d{5})/, '$1 $2');
  };

  const handleInputChange = (field, value) => {
    if (field === 'phone') {
      value = formatPhoneNumber(value);
    }
    
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after success message
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        inquiryType: '',
        message: ''
      });
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <div className="bg-card rounded-xl shadow-card p-8 border border-border">
        <div className="text-center">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="CheckCircle" size={32} color="var(--color-success)" strokeWidth={2} />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Thank You for Contacting Us!
          </h3>
          <p className="text-muted-foreground mb-4">
            Your inquiry has been successfully submitted. Our team will respond within 24 hours during business days.
          </p>
          <div className="bg-muted rounded-lg p-4">
            <p className="text-sm text-muted-foreground">
              <strong>Next Steps:</strong><br />
              • You'll receive a confirmation email shortly<br />
              • Our team will review your inquiry<br />
              • Expect a personalized response within 1 business day
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl shadow-card p-8 border border-border">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Get in Touch
        </h2>
        <p className="text-muted-foreground">
          Ready to transform your business? Fill out the form below and our team will get back to you within 24 hours.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            value={formData?.name}
            onChange={(e) => handleInputChange('name', e?.target?.value)}
            error={errors?.name}
            required
          />

          <Input
            label="Business Email"
            type="email"
            placeholder="your.email@company.com"
            value={formData?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            error={errors?.email}
            description="We'll use this for all business communications"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Phone Number"
            type="tel"
            placeholder="98765 43210"
            value={formData?.phone}
            onChange={(e) => handleInputChange('phone', e?.target?.value)}
            error={errors?.phone}
            description="10-digit Indian mobile number"
            required
          />

          <Input
            label="Company Name"
            type="text"
            placeholder="Your company name"
            value={formData?.company}
            onChange={(e) => handleInputChange('company', e?.target?.value)}
            error={errors?.company}
            required
          />
        </div>

        <Select
          label="Inquiry Type"
          placeholder="Select your inquiry type"
          options={inquiryOptions}
          value={formData?.inquiryType}
          onChange={(value) => handleInputChange('inquiryType', value)}
          error={errors?.inquiryType}
          description="Help us route your inquiry to the right team"
          required
        />

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Message <span className="text-error">*</span>
          </label>
          <textarea
            placeholder="Tell us about your business needs, current challenges, or specific questions about NoteNetra..."
            value={formData?.message}
            onChange={(e) => handleInputChange('message', e?.target?.value)}
            rows={5}
            className={`w-full px-4 py-3 border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-micro resize-none ${
              errors?.message ? 'border-error' : 'border-border'
            }`}
            required
          />
          {errors?.message && (
            <p className="mt-1 text-sm text-error">{errors?.message}</p>
          )}
          <p className="mt-1 text-xs text-muted-foreground">
            Minimum 10 characters required
          </p>
        </div>

        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Shield" size={20} color="var(--color-primary)" strokeWidth={2} className="mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground mb-1">
                Privacy & Security
              </p>
              <p className="text-xs text-muted-foreground">
                Your information is secure and will only be used to respond to your inquiry. We never share personal data with third parties.
              </p>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isSubmitting}
          iconName="Send"
          iconPosition="right"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending Message...' : 'Send Message'}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;