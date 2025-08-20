import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const DashboardPreview = () => {
  const [activeCard, setActiveCard] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const dashboardCards = [
    {
      id: 'revenue',
      title: 'Total Revenue',
      value: '₹2,45,680',
      change: '+12.5%',
      trend: 'up',
      icon: 'TrendingUp',
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'transactions',
      title: 'Transactions Today',
      value: '156',
      change: '+8.2%',
      trend: 'up',
      icon: 'Activity',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      id: 'credit',
      title: 'Credit Score',
      value: '785',
      change: '+15 pts',
      trend: 'up',
      icon: 'Award',
      color: 'from-purple-500 to-violet-600'
    },
    {
      id: 'customers',
      title: 'Active Customers',
      value: '1,247',
      change: '+5.8%',
      trend: 'up',
      icon: 'Users',
      color: 'from-orange-500 to-red-600'
    }
  ];

  const recentTransactions = [
    {
      id: 1,
      type: 'UPI',
      customer: 'Rajesh Kumar',
      amount: '₹1,250',
      time: '2 mins ago',
      status: 'completed'
    },
    {
      id: 2,
      type: 'Cash',
      customer: 'Priya Sharma',
      amount: '₹850',
      time: '5 mins ago',
      status: 'completed'
    },
    {
      id: 3,
      type: 'UPI',
      customer: 'Amit Patel',
      amount: '₹2,100',
      time: '8 mins ago',
      status: 'completed'
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
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
    <section ref={sectionRef} className="py-20 bg-background">
      <div className="max-w-7xl mx-auto content-spacing">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium border border-accent/20 mb-4">
              <Icon name="Monitor" size={16} className="mr-2" />
              Live Dashboard Preview
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Real-Time Business
              <span className="block text-primary">Intelligence</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get instant insights into your business performance with our intuitive dashboard that transforms transaction data into actionable intelligence.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="relative"
        >
          {/* Dashboard Container */}
          <div className="relative bg-card rounded-3xl border border-border shadow-2xl overflow-hidden">
            {/* Dashboard Header */}
            <motion.div variants={itemVariants} className="bg-muted/50 px-8 py-6 border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                    <Icon name="Zap" size={20} color="white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">NoteNetra Dashboard</h3>
                    <p className="text-sm text-muted-foreground">Real-time business insights</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-muted-foreground">Live</span>
                </div>
              </div>
            </motion.div>

            <div className="p-8">
              {/* Stats Cards Grid */}
              <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {dashboardCards?.map((card) => (
                  <motion.div
                    key={card?.id}
                    className="group relative bg-background rounded-xl p-6 border border-border hover:border-primary/30 transition-all duration-300 cursor-pointer"
                    onMouseEnter={() => setActiveCard(card?.id)}
                    onMouseLeave={() => setActiveCard(null)}
                    whileHover={{ y: -5 }}
                  >
                    {/* Glow Effect */}
                    <motion.div
                      animate={{
                        opacity: activeCard === card?.id ? 0.1 : 0,
                        scale: activeCard === card?.id ? 1.1 : 1
                      }}
                      transition={{ duration: 0.3 }}
                      className={`absolute inset-0 rounded-xl bg-gradient-to-br ${card?.color} -z-10`}
                    />

                    <div className="flex items-center justify-between mb-4">
                      <motion.div
                        animate={{
                          scale: activeCard === card?.id ? 1.1 : 1,
                          rotate: activeCard === card?.id ? 5 : 0
                        }}
                        transition={{ duration: 0.3 }}
                        className={`w-12 h-12 rounded-lg bg-gradient-to-br ${card?.color} flex items-center justify-center shadow-lg`}
                      >
                        <Icon name={card?.icon} size={20} color="white" />
                      </motion.div>
                      <div className={`flex items-center space-x-1 text-sm font-medium ${
                        card?.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        <Icon name={card?.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} size={16} />
                        <span>{card?.change}</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm text-muted-foreground mb-1">{card?.title}</h4>
                      <p className="text-2xl font-bold text-foreground">{card?.value}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Recent Transactions */}
              <motion.div variants={itemVariants} className="bg-background rounded-xl border border-border p-6">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-lg font-bold text-foreground">Recent Transactions</h4>
                  <button className="text-primary hover:text-primary/80 text-sm font-medium transition-colors">
                    View All
                  </button>
                </div>

                <div className="space-y-4">
                  {recentTransactions?.map((transaction, index) => (
                    <motion.div
                      key={transaction?.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          transaction?.type === 'UPI' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                        }`}>
                          <Icon name={transaction?.type === 'UPI' ? 'Smartphone' : 'Banknote'} size={18} />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{transaction?.customer}</p>
                          <p className="text-sm text-muted-foreground">{transaction?.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-foreground">{transaction?.amount}</p>
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-xs text-green-600 capitalize">{transaction?.status}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Floating Action Button */}
          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-primary text-white px-8 py-4 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => window.open('/dashboard-demo', '_blank')}
          >
            <div className="flex items-center align-middle space-x-2">
              <Icon name="ExternalLink" size={20} />
              <span>Try Interactive Demo</span>
            </div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default DashboardPreview;