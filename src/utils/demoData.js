// Comprehensive Demo Data for NoteNetra Dashboard
// This ensures consistency across all pages

export const demoData = {
  // KPI Data for Overview
  kpiData: [
    {
      title: "Monthly Revenue",
      value: "₹2,45,680",
      change: "+12.5%",
      trend: "up",
      icon: "TrendingUp",
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20"
    },
    {
      title: "Total Transactions",
      value: "1,247",
      change: "+8.3%",
      trend: "up",
      icon: "Receipt",
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/10",
      borderColor: "border-cyan-500/20"
    },
    {
      title: "Credit Score",
      value: "742",
      change: "+15 pts",
      trend: "up",
      icon: "Award",
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/10",
      borderColor: "border-cyan-500/20"
    },
    {
      title: "Loan Eligibility",
      value: "₹8,50,000",
      change: "+₹1,20,000",
      trend: "up",
      icon: "Banknote",
      color: "text-amber-400",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/20"
    }
  ],

  // Revenue Data for Charts
  revenueData: [
    { month: 'Jan', revenue: 185000, transactions: 890 },
    { month: 'Feb', revenue: 195000, transactions: 920 },
    { month: 'Mar', revenue: 210000, transactions: 1050 },
    { month: 'Apr', revenue: 225000, transactions: 1180 },
    { month: 'May', revenue: 240000, transactions: 1220 },
    { month: 'Jun', revenue: 245680, transactions: 1247 }
  ],

  // Payment Method Data
  paymentMethodData: [
    { name: 'UPI', value: 65, color: '#0891b2' },
    { name: 'Cash', value: 30, color: '#10B981' },
    { name: 'Card', value: 5, color: '#F59E0B' }
  ],

  // Credit Score History
  creditScoreHistory: [
    { month: 'Jan', score: 680 },
    { month: 'Feb', score: 695 },
    { month: 'Mar', score: 710 },
    { month: 'Apr', score: 725 },
    { month: 'May', score: 735 },
    { month: 'Jun', score: 742 }
  ],

  // Comprehensive Transaction Data
  transactions: [
    {
      id: "TXN001",
      date: "15 Jun 2024",
      time: "10:30 AM",
      customer: "Rajesh Kumar",
      amount: 1250,
      type: "UPI",
      transactionType: "credit",
      status: "completed",
      items: "Mobile Charger, USB Cable"
    },
    {
      id: "TXN002",
      date: "15 Jun 2024",
      time: "11:15 AM",
      customer: "Priya Sharma",
      amount: 850,
      type: "Cash",
      transactionType: "credit",
      status: "completed",
      items: "Rice (5kg), Cooking Oil"
    },
    {
      id: "TXN003",
      date: "15 Jun 2024",
      time: "12:00 PM",
      customer: "Amit Patel",
      amount: 2100,
      type: "UPI",
      transactionType: "credit",
      status: "completed",
      items: "LED Bulbs (Pack of 4)"
    },
    {
      id: "TXN004",
      date: "14 Jun 2024",
      time: "09:45 AM",
      customer: "Sneha Reddy",
      amount: 3200,
      type: "Card",
      transactionType: "credit",
      status: "completed",
      items: "Cotton Shirts (2 pieces)"
    },
    {
      id: "TXN005",
      date: "14 Jun 2024",
      time: "02:30 PM",
      customer: "Vikram Singh",
      amount: 1800,
      type: "UPI",
      transactionType: "credit",
      status: "completed",
      items: "Hardware Tools Set"
    },
    {
      id: "TXN006",
      date: "14 Jun 2024",
      time: "04:15 PM",
      customer: "Anjali Desai",
      amount: 950,
      type: "Cash",
      transactionType: "credit",
      status: "completed",
      items: "Groceries, Vegetables"
    },
    {
      id: "TXN007",
      date: "13 Jun 2024",
      time: "10:00 AM",
      customer: "Rahul Verma",
      amount: 2800,
      type: "UPI",
      transactionType: "credit",
      status: "completed",
      items: "Electronics Accessories"
    },
    {
      id: "TXN008",
      date: "13 Jun 2024",
      time: "01:45 PM",
      customer: "Meera Kapoor",
      amount: 1650,
      type: "Card",
      transactionType: "credit",
      status: "completed",
      items: "Beauty Products"
    },
    {
      id: "TXN009",
      date: "13 Jun 2024",
      time: "03:20 PM",
      customer: "Arjun Malhotra",
      amount: 4200,
      type: "UPI",
      transactionType: "credit",
      status: "completed",
      items: "Home Appliances"
    },
    {
      id: "TXN010",
      date: "12 Jun 2024",
      time: "11:30 AM",
      customer: "Zara Khan",
      amount: 1350,
      type: "Cash",
      transactionType: "credit",
      status: "completed",
      items: "Stationery Items"
    },
    {
      id: "TXN011",
      date: "12 Jun 2024",
      time: "09:30 AM",
      customer: "Suresh Iyer",
      amount: 2800,
      type: "UPI",
      transactionType: "credit",
      status: "completed",
      items: "Laptop Accessories"
    },
    {
      id: "TXN012",
      date: "11 Jun 2024",
      time: "03:45 PM",
      customer: "Lakshmi Devi",
      amount: 1650,
      type: "Cash",
      transactionType: "credit",
      status: "completed",
      items: "Kitchen Items"
    },
    {
      id: "TXN013",
      date: "11 Jun 2024",
      time: "11:20 AM",
      customer: "Mohan Das",
      amount: 3200,
      type: "Card",
      transactionType: "credit",
      status: "completed",
      items: "Office Supplies"
    },
    {
      id: "TXN014",
      date: "10 Jun 2024",
      time: "02:15 PM",
      customer: "Kavya Reddy",
      amount: 950,
      type: "UPI",
      transactionType: "credit",
      status: "completed",
      items: "Personal Care"
    },
    {
      id: "TXN015",
      date: "10 Jun 2024",
      time: "10:00 AM",
      customer: "Ravi Teja",
      amount: 4200,
      type: "Cash",
      transactionType: "credit",
      status: "completed",
      items: "Automotive Parts"
    }
  ],

  // Customer Metrics
  customerMetrics: [
    { metric: 'New Customers', value: 47, change: '+12%', icon: 'UserPlus', color: 'text-green-400' },
    { metric: 'Returning Customers', value: 156, change: '+8%', icon: 'Users', color: 'text-cyan-400' },
    { metric: 'Average Order Value', value: '₹1,970', change: '+15%', icon: 'ShoppingCart', color: 'text-cyan-400' },
    { metric: 'Customer Retention', value: '78%', change: '+5%', icon: 'Heart', color: 'text-pink-400' }
  ],

  // Top Products
  topProducts: [
    { name: 'Mobile Chargers', sales: 145, revenue: 43500, trend: 'up' },
    { name: 'Rice (25kg)', sales: 89, revenue: 35600, trend: 'up' },
    { name: 'Cotton Shirts', sales: 67, revenue: 26800, trend: 'down' },
    { name: 'LED Bulbs', sales: 234, revenue: 23400, trend: 'up' },
    { name: 'Cooking Oil (5L)', sales: 78, revenue: 19500, trend: 'stable' }
  ],

  // Category Breakdown
  categoryBreakdown: [
    { category: 'Electronics', amount: 89500, percentage: 36.4, color: '#0891b2' },
    { category: 'Groceries', amount: 62300, percentage: 25.4, color: '#10B981' },
    { category: 'Clothing', amount: 45200, percentage: 18.4, color: '#F59E0B' },
    { category: 'Hardware', amount: 28400, percentage: 11.6, color: '#0d9488' },
    { category: 'Others', amount: 20280, percentage: 8.2, color: '#EF4444' }
  ],

  // Loan Eligibility Data
  loanEligibility: [
    {
      type: 'Working Capital Loan',
      amount: 850000,
      interest: '12.5%',
      tenure: '12 months',
      status: 'eligible',
      icon: 'Briefcase'
    },
    {
      type: 'Equipment Loan',
      amount: 500000,
      interest: '11.8%',
      tenure: '24 months',
      status: 'eligible',
      icon: 'Settings'
    },
    {
      type: 'Business Expansion Loan',
      amount: 1200000,
      interest: '13.2%',
      tenure: '36 months',
      status: 'under-review',
      icon: 'TrendingUp'
    },
    {
      type: 'Emergency Credit Line',
      amount: 300000,
      interest: '15.0%',
      tenure: '6 months',
      status: 'eligible',
      icon: 'Shield'
    }
  ],

  // Recent Transactions for Overview
  recentTransactions: [
    {
      id: "TXN001",
      mode: "UPI",
      time: "2024-06-15T10:30:00",
      amount: 1250,
      type: "credit"
    },
    {
      id: "TXN002",
      mode: "Cash",
      time: "2024-06-15T11:15:00",
      amount: 850,
      type: "credit"
    },
    {
      id: "TXN003",
      mode: "UPI",
      time: "2024-06-15T12:00:00",
      amount: 2100,
      type: "credit"
    },
    {
      id: "TXN004",
      mode: "Card",
      time: "2024-06-14T09:45:00",
      amount: 3200,
      type: "credit"
    },
    {
      id: "TXN005",
      mode: "UPI",
      time: "2024-06-14T14:30:00",
      amount: 1800,
      type: "credit"
    }
  ]
};

// Helper functions for consistent data formatting
export const formatCurrency = (amount) => {
  return `₹${amount.toLocaleString('en-IN')}`;
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

export const formatTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

export const getTransactionStats = (transactions) => {
  const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);
  const totalCredit = transactions.filter(t => t.transactionType === 'credit').reduce((sum, t) => sum + t.amount, 0);
  const totalDebit = transactions.filter(t => t.transactionType === 'debit').reduce((sum, t) => sum + t.amount, 0);
  
  return {
    totalAmount,
    totalCredit,
    totalDebit,
    totalTransactions: transactions.length,
    balance: totalCredit - totalDebit
  };
};
