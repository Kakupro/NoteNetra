import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-background via-muted/30 to-primary/5 flex items-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto content-spacing py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20">
                <Icon name="Zap" size={16} className="mr-2" />
                Smart IIoT Platform for MSMEs
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Transform Your
                <span className="block text-primary">Offline Business</span>
                Into Digital Growth
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                NoteNetra's plug-and-play device converts every cash and UPI transaction into valuable business insights, credit visibility, and loan eligibility for MSMEs across India.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="default"
                size="lg"
                iconName="ShoppingCart"
                iconPosition="left"
                className="group relative overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                onClick={() => window.location.href = '/contact-page'}
              >
                <span className="relative z-10">Order Device</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                iconName="Monitor"
                iconPosition="left"
                className="group transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-primary hover:text-primary"
                onClick={() => window.open('/dashboard-demo', '_blank')}
              >
                Try Dashboard
              </Button>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center space-x-8 pt-4">
              <div className="flex items-center space-x-2">
                <Icon name="Users" size={20} className="text-primary" />
                <span className="text-sm text-muted-foreground">10,000+ MSMEs</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="TrendingUp" size={20} className="text-accent" />
                <span className="text-sm text-muted-foreground">₹500Cr+ Tracked</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Award" size={20} className="text-warning" />
                <span className="text-sm text-muted-foreground">RBI Compliant</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - 3D Device Visualization */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            className="relative"
          >
            <div className="relative w-full h-96 lg:h-[500px] flex items-center justify-center">
              {/* 3D Device Container */}
              <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                {/* Rotating Device Mock */}
                <motion.div
                  animate={{ rotateY: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-full h-full relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl transform perspective-1000 rotateX-12">
                    {/* Device Screen */}
                    <div className="absolute top-8 left-8 right-8 bottom-8 bg-gradient-to-br from-primary to-accent rounded-xl p-4 flex flex-col justify-between">
                      <div className="text-white text-sm font-medium">NoteNetra Device</div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-white text-xs">
                          <span>Cash Transaction</span>
                          <span>₹2,500</span>
                        </div>
                        <div className="flex items-center justify-between text-white text-xs">
                          <span>UPI Payment</span>
                          <span>₹1,200</span>
                        </div>
                        <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-white rounded-full"
                            animate={{ width: ["0%", "100%", "0%"] }}
                            transition={{ duration: 3, repeat: Infinity }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-8 -right-8 bg-accent text-white p-3 rounded-lg shadow-lg"
                >
                  <Icon name="CreditCard" size={20} />
                </motion.div>

                <motion.div
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                  className="absolute -bottom-8 -left-8 bg-primary text-white p-3 rounded-lg shadow-lg"
                >
                  <Icon name="Smartphone" size={20} />
                </motion.div>
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-3xl -z-10"></div>
            </div>
          </motion.div>
        </div>
      </div>
      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center space-y-2 text-muted-foreground">
          <span className="text-sm">Scroll to explore</span>
          <Icon name="ChevronDown" size={20} />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;