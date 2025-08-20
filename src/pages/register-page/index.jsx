import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Logo from '../../components/ui/Logo';
import Icon from '../../components/AppIcon';

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors }, watch, getValues } = useForm({
    defaultValues: {
      businessName: '',
      ownerName: '',
      email: '',
      phone: '',
      businessType: '',
      password: '',
      confirmPassword: '',
    }
  });

  const password = watch('password');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const businessTypes = [
    'Retail Store',
    'Restaurant/Cafe',
    'Grocery Store',
    'Electronics Shop',
    'Clothing Store',
    'Medical Store',
    'Automobile Service',
    'Beauty Salon',
    'Trading Business',
    'Manufacturing',
    'Other'
  ];

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: '', color: '' };
    
    let strength = 0;
    if (password?.length >= 8) strength++;
    if (/[A-Z]/?.test(password)) strength++;
    if (/[0-9]/?.test(password)) strength++;
    if (/[^A-Za-z0-9]/?.test(password)) strength++;
    
    const levels = [
      { strength: 0, label: 'Very Weak', color: 'text-error' },
      { strength: 1, label: 'Weak', color: 'text-warning' },
      { strength: 2, label: 'Fair', color: 'text-warning' },
      { strength: 3, label: 'Good', color: 'text-primary' },
      { strength: 4, label: 'Strong', color: 'text-success' },
    ];
    
    return levels?.[strength] || levels?.[0];
  };

  const passwordStrength = getPasswordStrength(password);

  const onSubmit = async (data) => {
    if (!acceptTerms || !acceptPrivacy) {
      alert('Please accept the Terms of Service and Privacy Policy to continue.');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Registration attempt:', { 
        ...data, 
        acceptTerms, 
        acceptPrivacy,
        timestamp: new Date()?.toISOString()
      });
      
      // For now, redirect to login with success message
      navigate('/login-page?registered=true');
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setIsLoading(true);
    try {
      // Simulate Google OAuth
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Google signup initiated');
      navigate('/dashboard-demo');
    } catch (error) {
      console.error('Google signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Create Your NoteNetra Account - Join Thousands of Growing MSMEs</title>
        <meta 
          name="description" 
          content="Join NoteNetra and transform your offline business into digital growth opportunities. Setup takes just 5 minutes with bank-grade security." 
        />
        <meta name="keywords" content="NoteNetra signup, register, create account, MSME registration, business growth" />
        <link rel="canonical" href="/register-page" />
      </Helmet>

      <div className="min-h-screen bg-dark-bg-primary flex flex-col">
        {/* Header with Logo */}
        <header className="w-full py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <Logo />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 -mt-16 py-12">
          <div className="w-full max-w-lg space-y-8">
            {/* Registration Card */}
            <div className="bg-dark-bg-card rounded-xl shadow-interactive border border-dark-border-primary p-8 space-y-6">
              {/* Header */}
              <div className="text-center space-y-2">
                <h1 className="text-2xl font-bold text-dark-text-primary">
                  Create Your NoteNetra Account
                </h1>
                <p className="text-dark-text-muted">
                  Join thousands of MSMEs growing with smart insights
                </p>
              </div>

              {/* Google Signup Button */}
              <Button
                variant="outline"
                fullWidth
                onClick={handleGoogleSignup}
                disabled={isLoading}
                className="transition-micro hover-lift"
              >
                <div className="flex items-center space-x-3">
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>Continue with Google</span>
                </div>
              </Button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-dark-border-primary" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-dark-bg-card text-dark-text-muted">Or register with details</span>
                </div>
              </div>

              {/* Registration Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Business Name */}
                <Input
                  label="Business Name"
                  placeholder="Enter your business name"
                  required
                  error={errors?.businessName?.message}
                  {...register('businessName', {
                    required: 'Business name is required',
                    minLength: {
                      value: 2,
                      message: 'Business name must be at least 2 characters'
                    }
                  })}
                />

                {/* Owner Name */}
                <Input
                  label="Owner Full Name"
                  placeholder="Enter your full name"
                  required
                  error={errors?.ownerName?.message}
                  {...register('ownerName', {
                    required: 'Owner name is required',
                    minLength: {
                      value: 2,
                      message: 'Name must be at least 2 characters'
                    }
                  })}
                />

                {/* Email */}
                <Input
                  label="Business Email"
                  type="email"
                  placeholder="your@business-email.com"
                  required
                  error={errors?.email?.message}
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Please enter a valid email address'
                    }
                  })}
                />

                {/* Phone */}
                <Input
                  label="Mobile Number"
                  type="tel"
                  placeholder="+91 98765 43210"
                  required
                  error={errors?.phone?.message}
                  {...register('phone', {
                    required: 'Mobile number is required',
                    pattern: {
                      value: /^(\+91[\s-]?)?[0]?(91)?[789]\d{9}$/,
                      message: 'Please enter a valid Indian mobile number'
                    }
                  })}
                />

                {/* Business Type */}
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none text-foreground">
                    Business Type <span className="text-destructive ml-1">*</span>
                  </label>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    {...register('businessType', {
                      required: 'Please select your business type'
                    })}
                  >
                    <option value="">Select business type</option>
                    {businessTypes?.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors?.businessType && (
                    <p className="text-sm text-destructive">
                      {errors?.businessType?.message}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-1">
                  <Input
                    label="Password"
                    type="password"
                    placeholder="Create a strong password"
                    required
                    error={errors?.password?.message}
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 8,
                        message: 'Password must be at least 8 characters'
                      }
                    })}
                  />
                  {password && (
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-muted rounded-full h-1">
                        <div
                          className={`h-1 rounded-full transition-all ${
                            passwordStrength?.strength === 1 ? 'bg-error w-1/4' :
                            passwordStrength?.strength === 2 ? 'bg-warning w-2/4' :
                            passwordStrength?.strength === 3 ? 'bg-primary w-3/4' :
                            passwordStrength?.strength === 4 ? 'bg-success w-full': 'bg-error w-1/4'
                          }`}
                        />
                      </div>
                      <span className={`text-xs ${passwordStrength?.color}`}>
                        {passwordStrength?.label}
                      </span>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <Input
                  label="Confirm Password"
                  type="password"
                  placeholder="Confirm your password"
                  required
                  error={errors?.confirmPassword?.message}
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: (value) => {
                      const { password } = getValues();
                      return password === value || 'Passwords do not match';
                    }
                  })}
                />

                {/* Terms and Privacy */}
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <Input
                      type="checkbox"
                      id="accept-terms"
                      checked={acceptTerms}
                      onChange={(e) => setAcceptTerms(e?.target?.checked)}
                      className="mt-1"
                    />
                    <label htmlFor="accept-terms" className="text-sm text-muted-foreground">
                      I agree to the{' '}
                      <button
                        type="button"
                        onClick={() => setShowTermsModal(true)}
                        className="text-primary hover:text-primary/80 underline"
                      >
                        Terms of Service
                      </button>
                    </label>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Input
                      type="checkbox"
                      id="accept-privacy"
                      checked={acceptPrivacy}
                      onChange={(e) => setAcceptPrivacy(e?.target?.checked)}
                      className="mt-1"
                    />
                    <label htmlFor="accept-privacy" className="text-sm text-muted-foreground">
                      I agree to the{' '}
                      <button
                        type="button"
                        onClick={() => setShowPrivacyModal(true)}
                        className="text-primary hover:text-primary/80 underline"
                      >
                        Privacy Policy
                      </button>
                    </label>
                  </div>
                </div>

                {/* Register Button */}
                <Button
                  type="submit"
                  fullWidth
                  loading={isLoading}
                  disabled={!acceptTerms || !acceptPrivacy}
                  className="transition-micro hover-lift"
                >
                  Create Account
                </Button>
              </form>

              {/* Trust Indicators */}
              <div className="border-t border-border pt-4">
                <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Icon name="Shield" size={14} />
                    <span>SSL Encrypted</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Lock" size={14} />
                    <span>GDPR Compliant</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="CheckCircle" size={14} />
                    <span>RBI Guidelines</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Users" size={14} />
                    <span>10,000+ MSMEs</span>
                  </div>
                </div>
              </div>

              {/* Login Link */}
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{' '}
                  <Link 
                    to="/login-page" 
                    className="text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    Login here
                  </Link>
                </p>
              </div>
            </div>

            {/* Additional Info */}
            <div className="text-center text-xs text-muted-foreground space-y-2">
              <p>Setup takes just 5 minutes • Free for first 30 days</p>
              <p>© {new Date()?.getFullYear()} NoteNetra. Empowering MSMEs across India.</p>
            </div>
          </div>
        </main>
      </div>

      {/* Terms Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-card rounded-lg shadow-lg max-w-lg w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Terms of Service</h3>
                <button
                  onClick={() => setShowTermsModal(false)}
                  className="p-2 hover:bg-muted rounded-lg"
                >
                  <Icon name="X" size={16} />
                </button>
              </div>
              <div className="prose prose-sm text-muted-foreground space-y-3">
                <p><strong>Last updated: {new Date()?.toLocaleDateString()}</strong></p>
                <p>By creating an account with NoteNetra, you agree to these terms.</p>
                <h4 className="font-semibold text-foreground">Service Usage</h4>
                <p>You may use NoteNetra to track business transactions, analyze financial data, and improve credit visibility for your MSME business.</p>
                <h4 className="font-semibold text-foreground">Data Security</h4>
                <p>We implement bank-grade security measures to protect your business data and financial information.</p>
                <h4 className="font-semibold text-foreground">Account Responsibility</h4>
                <p>You are responsible for maintaining the confidentiality of your account credentials and all activities under your account.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-card rounded-lg shadow-lg max-w-lg w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Privacy Policy</h3>
                <button
                  onClick={() => setShowPrivacyModal(false)}
                  className="p-2 hover:bg-muted rounded-lg"
                >
                  <Icon name="X" size={16} />
                </button>
              </div>
              <div className="prose prose-sm text-muted-foreground space-y-3">
                <p><strong>Last updated: {new Date()?.toLocaleDateString()}</strong></p>
                <h4 className="font-semibold text-foreground">Data Collection</h4>
                <p>We collect business transaction data, contact information, and usage analytics to provide our service.</p>
                <h4 className="font-semibold text-foreground">Data Usage</h4>
                <p>Your data is used to generate business insights, credit score improvements, and personalized recommendations.</p>
                <h4 className="font-semibold text-foreground">Data Protection</h4>
                <p>We never sell your data to third parties. All data is encrypted and stored securely in compliance with Indian data protection laws.</p>
                <h4 className="font-semibold text-foreground">Your Rights</h4>
                <p>You can request access, modification, or deletion of your data at any time through your account settings.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterPage;