import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult, setPersistence, browserLocalPersistence } from 'firebase/auth';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Logo from '../../components/ui/Logo';
import Icon from '../../components/AppIcon';

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      email: '',
      password: '',
    }
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const auth = getAuth();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    try {
      // Prefer redirect to avoid popup issues
      await signInWithRedirect(auth, provider);
    } catch (error) {
      console.error('Google login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Complete sign-in if we came back from a redirect flow
  useEffect(() => {
    let isMounted = true;
    // Ensure persistent session
    setPersistence(auth, browserLocalPersistence).catch((e) => console.error('Set persistence error:', e));
    getRedirectResult(auth)
      .then((result) => {
        if (!isMounted) return;
        if (result?.user) {
          navigate('/dashboard');
        }
      })
      .catch((err) => console.error('Google redirect result error:', err));
    return () => { isMounted = false; };
  }, [auth, navigate]);

  return (
    <>
      <Helmet>
        <title>Welcome Back to NoteNetra - Sign In to Your Account</title>
        <meta 
          name="description" 
          content="Sign in to your NoteNetra account to access your business dashboard, track transactions, and manage your MSME growth journey." 
        />
        <meta name="keywords" content="NoteNetra login, sign in, MSME dashboard, business account, secure login" />
        <link rel="canonical" href="/login-page" />
      </Helmet>

      <div className="min-h-screen bg-dark-bg-primary flex flex-col">
        {/* Header with Logo */}
        <header className="w-full py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <Logo />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 -mt-16">
          <div className="w-full max-w-md space-y-8">
            {/* Login Card */}
            <div className="bg-dark-bg-card rounded-xl shadow-interactive border border-dark-border-primary p-8 space-y-6">
              {/* Header */}
              <div className="text-center space-y-2">
                <h1 className="text-2xl font-bold text-dark-text-primary">
                  Welcome Back to NoteNetra
                </h1>
                <p className="text-dark-text-muted">
                  Sign in to access your business dashboard
                </p>
              </div>

              {/* Google Login Button */}
              <Button
                variant="outline"
                fullWidth
                onClick={handleGoogleLogin}
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
                  <span className="px-2 bg-dark-bg-card text-dark-text-muted">Or continue with email</span>
                </div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Email Field */}
                <Input
                  label="Email Address"
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

                {/* Password Field */}
                <Input
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  required
                  error={errors?.password?.message}
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters'
                    }
                  })}
                />

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Input
                      type="checkbox"
                      id="remember-me"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e?.target?.checked)}
                    />
                    <label htmlFor="remember-me" className="text-sm text-dark-text-muted">
                      Remember me
                    </label>
                  </div>
                  <Link 
                    to="#" 
                    className="text-sm text-dark-accent-primary hover:text-dark-accent-hover transition-colors"
                  >
                    Forgot Password?
                  </Link>
                </div>

                {/* Sign In Button */}
                <Button
                  type="submit"
                  fullWidth
                  loading={isLoading}
                  className="transition-micro hover-lift"
                >
                  Sign In
                </Button>
              </form>

              {/* Trust Indicators */}
              <div className="border-t border-dark-border-primary pt-6">
                <div className="flex items-center justify-center space-x-4 text-xs text-dark-text-muted">
                  <div className="flex items-center space-x-1">
                    <Icon name="Shield" size={14} />
                    <span>SSL Secure</span>
                  </div>
                  <div className="w-1 h-1 bg-dark-text-muted rounded-full"></div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Lock" size={14} />
                    <span>Bank-Grade Security</span>
                  </div>
                </div>
              </div>

              {/* Sign Up Link */}
              <div className="text-center">
                <p className="text-sm text-dark-text-muted">
                  New to NoteNetra?{' '}
                  <Link 
                    to="/register-page" 
                    className="text-dark-accent-primary hover:text-dark-accent-hover font-medium transition-colors"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>

            {/* Additional Info */}
            <div className="text-center text-xs text-dark-text-muted space-y-2">
              <p>By signing in, you agree to our Terms of Service and Privacy Policy</p>
              <p>© {new Date()?.getFullYear()} NoteNetra. Empowering MSMEs across India.</p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default LoginPage;