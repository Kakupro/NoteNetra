import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const WorkflowSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const workflowSteps = [
    {
      id: 1,
      title: 'Transaction Capture',
      subtitle: 'Cash & UPI Scanning',
      description: 'NoteNetra device automatically detects and logs every cash transaction and UPI payment in real-time with 99.9% accuracy.',
      icon: 'Scan',
      color: 'from-blue-500 to-cyan-600',
      details: [
        'AI-powered cash detection',
        'UPI payment integration',
        'Real-time transaction logging',
        'Automatic categorization'
      ]
    },
    {
      id: 2,
      title: 'Smart Processing',
      subtitle: 'Device Intelligence',
      description: 'Advanced algorithms process transaction data, extract customer insights, and update your business dashboard instantly.',
      icon: 'Cpu',
      color: 'from-purple-500 to-violet-600',
      details: [
        'Intelligent data processing',
        'Customer pattern analysis',
        'Inventory tracking',
        'Business insights generation'
      ]
    },
    {
      id: 3,
      title: 'Credit & Growth',
      subtitle: 'Loan Eligibility',
      description: 'Build credit history through transaction patterns and unlock loan opportunities with banks and financial institutions.',
      icon: 'TrendingUp',
      color: 'from-green-500 to-emerald-600',
      details: [
        'Credit score building',
        'Loan eligibility assessment',
        'Financial institution partnerships',
        'Growth opportunity alerts'
      ]
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef?.current) {
      observer?.observe(sectionRef?.current);
    }

    return () => observer?.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % workflowSteps?.length);
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [isVisible, workflowSteps?.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-muted/30 to-primary/5">
      <div className="max-w-7xl mx-auto content-spacing">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20 mb-4">
              <Icon name="Workflow" size={16} className="mr-2" />
              How It Works
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Simple 3-Step Process to
              <span className="block text-primary">Transform Your Business</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From transaction capture to loan eligibility - see how NoteNetra converts every sale into business growth opportunities.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="relative"
        >
          {/* Progress Bar */}
          <motion.div variants={itemVariants} className="flex justify-center mb-12">
            <div className="flex items-center space-x-4">
              {workflowSteps?.map((step, index) => (
                <React.Fragment key={step?.id}>
                  <motion.button
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                      activeStep === index
                        ? 'bg-primary text-white shadow-lg scale-110'
                        : activeStep > index
                        ? 'bg-accent text-white' :'bg-muted text-muted-foreground'
                    }`}
                    onClick={() => setActiveStep(index)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {activeStep > index ? (
                      <Icon name="Check" size={20} />
                    ) : (
                      step?.id
                    )}
                  </motion.button>
                  
                  {index < workflowSteps?.length - 1 && (
                    <div className="w-16 h-1 bg-border rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-primary rounded-full"
                        animate={{
                          width: activeStep > index ? '100%' : '0%'
                        }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </motion.div>

          {/* Step Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Visual */}
            <motion.div variants={itemVariants} className="relative">
              <div className="relative w-full h-96 flex items-center justify-center">
                {/* Main Visual Container */}
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                  transition={{ duration: 0.6 }}
                  className="relative w-80 h-80"
                >
                  {/* Step Visualization */}
                  <div className={`w-full h-full rounded-3xl bg-gradient-to-br ${workflowSteps?.[activeStep]?.color} p-8 shadow-2xl`}>
                    <div className="flex flex-col items-center justify-center h-full text-white">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center mb-6"
                      >
                        <Icon 
                          name={workflowSteps?.[activeStep]?.icon} 
                          size={40} 
                          color="white" 
                          strokeWidth={2}
                        />
                      </motion.div>
                      
                      <h3 className="text-2xl font-bold mb-2 text-center">
                        {workflowSteps?.[activeStep]?.title}
                      </h3>
                      
                      <p className="text-white/80 text-center">
                        {workflowSteps?.[activeStep]?.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <motion.div
                    animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute -top-4 -right-4 w-16 h-16 bg-white rounded-xl shadow-lg flex items-center justify-center"
                  >
                    <Icon name="Zap" size={24} className="text-primary" />
                  </motion.div>

                  <motion.div
                    animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                    className="absolute -bottom-4 -left-4 w-16 h-16 bg-white rounded-xl shadow-lg flex items-center justify-center"
                  >
                    <Icon name="Target" size={24} className="text-accent" />
                  </motion.div>
                </motion.div>

                {/* Background Glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${workflowSteps?.[activeStep]?.color} rounded-3xl blur-3xl opacity-20 -z-10`}></div>
              </div>
            </motion.div>

            {/* Right Side - Content */}
            <motion.div variants={itemVariants} className="space-y-6">
              <motion.div
                key={`content-${activeStep}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${workflowSteps?.[activeStep]?.color} flex items-center justify-center`}>
                    <span className="text-white font-bold text-sm">{workflowSteps?.[activeStep]?.id}</span>
                  </div>
                  <h3 className="text-3xl font-bold text-foreground">
                    {workflowSteps?.[activeStep]?.title}
                  </h3>
                </div>

                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  {workflowSteps?.[activeStep]?.description}
                </p>

                <div className="space-y-3">
                  {workflowSteps?.[activeStep]?.details?.map((detail, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-3"
                    >
                      <div className="w-6 h-6 bg-accent/20 text-accent rounded-full flex items-center justify-center">
                        <Icon name="Check" size={14} />
                      </div>
                      <span className="text-foreground">{detail}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="pt-6"
              >
                <button
                  className="px-8 py-4 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  onClick={() => window.location.href = '/contact-page'}
                >
                  <div className="flex items-center space-x-2">
                    <Icon name="ArrowRight" size={20} />
                    <span>Start Your Journey</span>
                  </div>
                </button>
              </motion.div>
            </motion.div>
          </div>

          {/* Loan Eligibility Popup Simulation */}
          <motion.div
            variants={itemVariants}
            className="mt-16 relative"
          >
            <div className="bg-card rounded-2xl border border-border p-8 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center">
                    <Icon name="CreditCard" size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-foreground">Loan Eligibility Alert</h4>
                    <p className="text-sm text-muted-foreground">Based on your transaction history</p>
                  </div>
                </div>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-3 h-3 bg-green-500 rounded-full"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">₹5,00,000</div>
                  <div className="text-sm text-muted-foreground">Eligible Amount</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent mb-1">12.5%</div>
                  <div className="text-sm text-muted-foreground">Interest Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-warning mb-1">24 hrs</div>
                  <div className="text-sm text-muted-foreground">Approval Time</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WorkflowSection;