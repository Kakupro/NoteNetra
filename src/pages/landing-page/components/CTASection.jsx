import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CTASection = () => {
  const [hoveredButton, setHoveredButton] = useState(null);

  const benefits = [
    {
      icon: 'Zap',
      text: 'Setup in 5 minutes'
    },
    {
      icon: 'Shield',
      text: 'Bank-grade security'
    },
    {
      icon: 'Users',
      text: '24/7 support'
    },
    {
      icon: 'TrendingUp',
      text: 'Instant ROI tracking'
    }
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      business: 'Kumar Electronics',
      rating: 5,
      text: `NoteNetra transformed my small electronics shop. Within 3 months, I got approved for a ₹3 lakh business loan based on my transaction history.`
    },
    {
      name: 'Priya Sharma',
      business: 'Sharma Textiles',
      rating: 5,
      text: `The device is so easy to use. My credit score improved from 650 to 780 in just 6 months. Now banks approach me for loans!`
    },
    {
      name: 'Amit Patel',
      business: 'Patel General Store',
      rating: 5,
      text: `Best investment for my business. The dashboard shows everything - sales, customers, inventory. Got ₹5 lakh loan approved in 24 hours.`
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto content-spacing">
        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20 mb-6">
            <Icon name="Rocket" size={16} className="mr-2" />
            Ready to Transform Your Business?
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Start Building Your
            <span className="block text-primary">Credit History Today</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            Join 10,000+ MSMEs who have already transformed their businesses with NoteNetra. 
            Get your device delivered within 48 hours and start tracking transactions immediately.
          </p>

          {/* Benefits Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {benefits?.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center space-y-2"
              >
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                  <Icon name={benefit?.icon} size={20} />
                </div>
                <span className="text-sm font-medium text-foreground">{benefit?.text}</span>
              </motion.div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <motion.div
              onMouseEnter={() => setHoveredButton('order')}
              onMouseLeave={() => setHoveredButton(null)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="default"
                size="xl"
                iconName="ShoppingCart"
                iconPosition="left"
                className="relative overflow-hidden group shadow-lg"
                onClick={() => window.location.href = '/contact-page'}
              >
                <span className="relative z-10 text-lg font-semibold">Order NoteNetra Device</span>
                <motion.div
                  animate={{
                    scale: hoveredButton === 'order' ? 1.1 : 1,
                    opacity: hoveredButton === 'order' ? 0.2 : 0
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-primary to-accent"
                />
              </Button>
            </motion.div>

            <motion.div
              onMouseEnter={() => setHoveredButton('demo')}
              onMouseLeave={() => setHoveredButton(null)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                size="xl"
                iconName="Play"
                iconPosition="left"
                className="group border-2 hover:border-primary hover:text-primary"
                onClick={() => window.open('/dashboard-demo', '_blank')}
              >
                <span className="text-lg font-semibold">Try Live Demo</span>
              </Button>
            </motion.div>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 mt-8 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} className="text-green-600" />
              <span>RBI Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Award" size={16} className="text-blue-600" />
              <span>ISO 27001 Certified</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={16} className="text-purple-600" />
              <span>10,000+ Happy Customers</span>
            </div>
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Trusted by MSMEs Across India
            </h3>
            <p className="text-muted-foreground">
              See how NoteNetra has helped businesses like yours grow and access credit
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials?.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card rounded-2xl p-6 border border-border shadow-card hover:shadow-interactive transition-all duration-300"
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial?.rating)]?.map((_, i) => (
                    <Icon key={i} name="Star" size={16} className="text-yellow-500 fill-current" />
                  ))}
                </div>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  "{testimonial?.text}"
                </p>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold">
                    {testimonial?.name?.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial?.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial?.business}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary to-accent rounded-3xl p-8 lg:p-12 text-center text-white relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10">
            <h3 className="text-3xl lg:text-4xl font-bold mb-4">
              Don't Wait. Your Competition Won't.
            </h3>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Every day you delay is a day of lost credit history and missed loan opportunities. 
              Start building your financial future today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="secondary"
                size="lg"
                iconName="Phone"
                iconPosition="left"
                className="bg-white text-primary hover:bg-gray-100"
                onClick={() => window.location.href = 'tel:+918888888888'}
              >
                Call Now: +91 88888 88888
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName="MessageCircle"
                iconPosition="left"
                className="border-white text-white hover:bg-white hover:text-primary"
                onClick={() => window.location.href = '/contact-page'}
              >
                Get Free Consultation
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;