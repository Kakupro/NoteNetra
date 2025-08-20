import React from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ContactForm from './components/ContactForm';
import ContactInfo from './components/ContactInfo';
import FAQSection from './components/FAQSection';
import Icon from '../../components/AppIcon';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto content-spacing py-8">
        <Breadcrumb />
        
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Icon name="MessageCircle" size={16} strokeWidth={2} />
            <span>Get in Touch</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Let's Transform Your Business Together
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Ready to digitize your transactions and unlock new growth opportunities? 
            Our team is here to guide you through every step of your digital transformation journey.
          </p>
        </div>

        {/* Main Contact Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Form - Takes 2 columns on large screens */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
          
          {/* Contact Information - Takes 1 column on large screens */}
          <div className="lg:col-span-1">
            <ContactInfo />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <FAQSection />
        </div>

        {/* Bottom CTA Section */}
        <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-8 md:p-12 text-center text-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Join 500+ MSMEs who have already transformed their business operations with NoteNetra. 
              Start your digital journey today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => window.open('/dashboard-demo', '_blank')}
                className="inline-flex items-center space-x-2 bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-micro hover-lift"
              >
                <Icon name="Play" size={20} strokeWidth={2} />
                <span>Watch Live Demo</span>
              </button>
              
              <button
                onClick={() => window.open('tel:+919876543210')}
                className="inline-flex items-center space-x-2 border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary transition-micro hover-lift"
              >
                <Icon name="Phone" size={20} strokeWidth={2} />
                <span>Schedule Call</span>
              </button>
            </div>

            <div className="mt-8 pt-8 border-t border-white/20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold mb-1">24 Hours</div>
                  <div className="text-sm opacity-80">Average Response Time</div>
                </div>
                <div>
                  <div className="text-2xl font-bold mb-1">500+</div>
                  <div className="text-sm opacity-80">Happy Customers</div>
                </div>
                <div>
                  <div className="text-2xl font-bold mb-1">99.9%</div>
                  <div className="text-sm opacity-80">Uptime Guarantee</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactPage;