import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import FeaturesShowcase from './components/FeaturesShowcase';
import DashboardPreview from './components/DashboardPreview';
import WorkflowSection from './components/WorkflowSection';
import CTASection from './components/CTASection';

const LandingPage = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>NoteNetra - Transform Your Offline Business Into Digital Growth</title>
        <meta 
          name="description" 
          content="NoteNetra's smart IIoT platform converts cash and UPI transactions into business insights, credit visibility, and loan eligibility for MSMEs across India. Setup in 5 minutes, bank-grade security, 24/7 support." 
        />
        <meta name="keywords" content="MSME, business growth, credit score, loan eligibility, transaction tracking, IIoT platform, digital transformation, India" />
        <meta property="og:title" content="NoteNetra - Smart IIoT Platform for MSMEs" />
        <meta property="og:description" content="Transform your offline business into digital growth opportunities with NoteNetra's plug-and-play device." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="/landing-page" />
      </Helmet>
      <div className="min-h-screen bg-dark-bg-primary">
        <Header />
        
        <main>
          {/* Hero Section with 3D Device and Animated Headlines */}
          <HeroSection />
          
          {/* Features Showcase with 3D Icons */}
          <FeaturesShowcase />
          
          {/* Live Dashboard Preview with Interactive Elements */}
          <DashboardPreview />
          
          {/* 3-Step Workflow Demonstration */}
          <WorkflowSection />
          
          {/* Call-to-Action Section with Testimonials */}
          <CTASection />
        </main>

        {/* Footer */}
        <footer className="bg-dark-bg-secondary border-t border-dark-border-primary py-12">
          <div className="max-w-7xl mx-auto content-spacing">
            <div className="grid md:grid-cols-4 gap-8">
              {/* Company Info */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-dark-accent-primary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">N</span>
                  </div>
                  <span className="text-xl font-bold text-dark-text-primary">NoteNetra</span>
                </div>
                <p className="text-dark-text-muted text-sm leading-relaxed">
                  Empowering MSMEs across India with smart transaction tracking and credit building solutions.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-dark-text-muted hover:text-dark-accent-primary transition-colors">
                    <span className="sr-only">Facebook</span>
                    <div className="w-8 h-8 bg-dark-bg-tertiary rounded-lg flex items-center justify-center hover:bg-dark-accent-primary hover:text-white transition-colors">
                      <span className="text-sm font-bold">f</span>
                    </div>
                  </a>
                  <a href="#" className="text-dark-text-muted hover:text-dark-accent-primary transition-colors">
                    <span className="sr-only">Twitter</span>
                    <div className="w-8 h-8 bg-dark-bg-tertiary rounded-lg flex items-center justify-center hover:bg-dark-accent-primary hover:text-white transition-colors">
                      <span className="text-sm font-bold">t</span>
                    </div>
                  </a>
                  <a href="#" className="text-dark-text-muted hover:text-dark-accent-primary transition-colors">
                    <span className="sr-only">LinkedIn</span>
                    <div className="w-8 h-8 bg-dark-bg-tertiary rounded-lg flex items-center justify-center hover:bg-dark-accent-primary hover:text-white transition-colors">
                      <span className="text-sm font-bold">in</span>
                    </div>
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
  <h4 className="font-semibold text-dark-text-primary mb-4">Quick Links</h4>
  <ul className="space-y-2 text-sm">
    <li>
      <a href="/features-page" className="text-dark-text-muted hover:text-dark-accent-primary hover:text-opacity-70 transition-colors">
        Features
      </a>
    </li>
    <li>
      <a href="/pricing-page" className="text-dark-text-muted hover:text-dark-accent-primary hover:text-opacity-70 transition-colors">
        Pricing
      </a>
    </li>
    <li>
      <a href="/dashboard-demo" className="text-dark-text-muted hover:text-dark-accent-primary hover:text-opacity-70 transition-colors">
        Demo
      </a>
    </li>
    <li>
      <a href="/contact-page" className="text-dark-text-muted hover:text-dark-accent-primary hover:text-opacity-70 transition-colors">
        Contact
      </a>
    </li>
  </ul>
</div>


              {/* Support */}
              <div>
                <h4 className="font-semibold text-foreground mb-4">Support</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Help Center</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Documentation</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">API Reference</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Status Page</a></li>
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h4 className="font-semibold text-foreground mb-4">Contact</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>+91 88888 88888</li>
                  <li>support@notenetra.com</li>
                  <li>Mumbai, Maharashtra</li>
                  <li>India</li>
                </ul>
              </div>
            </div>

            <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-muted-foreground">
                © {new Date()?.getFullYear()} NoteNetra. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</a>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LandingPage;