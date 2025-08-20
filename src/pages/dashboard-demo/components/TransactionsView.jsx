import React, { useState, useEffect } from 'react';
import { database } from '../../../firebase';
import { ref, onValue } from 'firebase/database';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import { demoData, getTransactionStats } from '../../../utils/demoData';

const TransactionsView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [dateRange, setDateRange] = useState('7days');
  const [transactions, setTransactions] = useState(demoData.transactions); // Use demo data
  const userId = "8Z642cHB2pXTGv8BnCbrzMYGWz23"; // Updated user ID to match Firebase

  useEffect(() => {
    const transactionsRef = ref(database, `transactions/${userId}`);
    
    const unsubscribe = onValue(transactionsRef, (snapshot) => {
      const data = snapshot.val();
      const loadedTransactions = [];
      if (data) {
        Object.keys(data).forEach((key) => {
          const transaction = data[key];
          const [datePart, timePart] = transaction.time.split(', ');
          
          loadedTransactions.push({
            id: key, 
            date: datePart,
            time: timePart,
            customer: `User ${transaction.userID || 'N/A'}`, 
            amount: transaction.amount,
            type: transaction.mode, // Use 'mode' for payment type (Cash, UPI, Card)
            transactionType: transaction.type, // 'credit' or 'debit'
            status: 'completed', 
            items: 'Notes Transaction' 
          });
        });
      }
      setTransactions(loadedTransactions);
    }, (error) => {
      console.error("Error fetching transactions:", error);
    });

    return () => {
      unsubscribe();
    };
  }, [userId]);

  const typeOptions = [
    { value: 'all', label: 'All Modes' },
    { value: 'UPI', label: 'UPI' },
    { value: 'Cash', label: 'Cash' },
    { value: 'Card', label: 'Card' },
    { value: 'credit', label: 'Credit (Type)' }, // Add type for credit/debit
    { value: 'debit', label: 'Debit (Type)' }
  ];

  const dateOptions = [
    { value: '7days', label: 'Last 7 days' },
    { value: '30days', label: 'Last 30 days' },
    { value: '90days', label: 'Last 90 days' }
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'UPI': return 'Smartphone';
      case 'Cash': return 'Banknote';
      case 'Card': return 'CreditCard';
      case 'credit': return 'TrendingUp'; // Icon for credit
      case 'debit': return 'TrendingDown'; // Icon for debit
      default: return 'Receipt';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'UPI': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      case 'Cash': return 'text-green-400 bg-green-500/10 border-green-500/20';
      case 'Card': return 'text-purple-400 bg-purple-500/10 border-purple-500/20';
      case 'credit': return 'text-teal-400 bg-teal-500/10 border-teal-500/20'; // Color for credit
      case 'debit': return 'text-red-400 bg-red-500/10 border-red-500/20'; // Color for debit
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
    }
  };

  const filteredTransactions = transactions?.filter(transaction => {
    const matchesSearch = transaction?.customer?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         transaction?.items?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         transaction?.id?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesType = filterType === 'all' || transaction?.type === filterType || transaction?.transactionType === filterType; // Check both mode and transactionType
    return matchesSearch && matchesType;
  });

  const stats = getTransactionStats(filteredTransactions);
  const { totalAmount, totalCredit, totalDebit, totalTransactions, balance } = stats;

  return (
    <div className="p-6 space-y-6">
      {/* Header with Summary */}
      <div className="bg-dark-bg-card rounded-xl border border-dark-border-primary p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-dark-text-primary">Transaction History</h2>
          <Button
            variant="outline"
            iconName="Download"
            iconPosition="left"
            onClick={() => alert('Export functionality would be implemented here')}
          >
            Export
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Icon name="Receipt" size={24} color="#0891b2" />
              <div>
                <p className="text-sm text-cyan-400">Total Transactions</p>
                <p className="text-2xl font-bold text-cyan-300">{totalTransactions}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Icon name="TrendingUp" size={24} color="#10b981" />
              <div>
                <p className="text-sm text-green-400">Total Credit</p>
                <p className="text-2xl font-bold text-green-300">₹{totalCredit?.toLocaleString('en-IN')}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Icon name="TrendingDown" size={24} color="#ef4444" />
              <div>
                <p className="text-sm text-red-400">Total Debit</p>
                <p className="text-2xl font-bold text-red-300">₹{totalDebit?.toLocaleString('en-IN')}</p>
              </div>
            </div>
          </div>

          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Icon name="Calculator" size={24} color="#8B5CF6" />
              <div>
                <p className="text-sm text-purple-400">Balance</p>
                <p className="text-2xl font-bold text-purple-300">
                  ₹{(totalCredit - totalDebit)?.toLocaleString('en-IN')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Filters */}
      <div className="bg-dark-bg-card rounded-xl border border-dark-border-primary p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            type="search"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            className="w-full"
          />
          
          <Select
            options={typeOptions}
            value={filterType}
            onChange={setFilterType}
            placeholder="Filter by mode/type"
          />
          
          <Select
            options={dateOptions}
            value={dateRange}
            onChange={setDateRange}
            placeholder="Select date range"
          />
        </div>
      </div>
      {/* Transactions Table */}
      <div className="bg-dark-bg-card rounded-xl border border-dark-border-primary overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-dark-bg-tertiary border-b border-dark-border-primary">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-dark-text-primary">Transaction ID</th>
                <th className="text-left py-4 px-6 font-semibold text-dark-text-primary">Date & Time</th>
                <th className="text-left py-4 px-6 font-semibold text-dark-text-primary">Customer</th>
                <th className="text-left py-4 px-6 font-semibold text-dark-text-primary">Items</th>
                <th className="text-left py-4 px-6 font-semibold text-dark-text-primary">Mode</th> {/* Changed from Type to Mode */}
                <th className="text-left py-4 px-6 font-semibold text-dark-text-primary">Type</th> {/* New column for credit/debit */}
                <th className="text-right py-4 px-6 font-semibold text-dark-text-primary">Amount</th>
                <th className="text-center py-4 px-6 font-semibold text-dark-text-primary">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions?.map((transaction, index) => (
                <tr 
                  key={transaction?.id} 
                  className={`border-b border-dark-border-primary hover:bg-dark-bg-tertiary transition-colors ${
                    index % 2 === 0 ? 'bg-dark-bg-card' : 'bg-dark-bg-secondary'
                  }`}
                >
                  <td className="py-4 px-6">
                    <span className="font-mono text-sm text-cyan-400">{transaction?.id}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm">
                      <div className="font-medium text-dark-text-primary">{transaction?.date}</div>
                      <div className="text-dark-text-secondary">{transaction?.time}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-medium text-dark-text-primary">{transaction?.customer}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-dark-text-secondary max-w-xs truncate" title={transaction?.items}>
                      {transaction?.items}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium border ${getTypeColor(transaction?.type)}`}>
                      <Icon name={getTypeIcon(transaction?.type)} size={14} />
                      <span>{transaction?.type}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium border ${getTypeColor(transaction?.transactionType)}`}>
                      <Icon name={getTypeIcon(transaction?.transactionType)} size={14} />
                      <span>{transaction?.transactionType?.charAt(0).toUpperCase() + transaction?.transactionType?.slice(1)}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <span className="font-bold text-dark-text-primary">₹{transaction?.amount?.toLocaleString('en-IN')}</span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                      <Icon name="CheckCircle" size={14} />
                      <span>Completed</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredTransactions?.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Search" size={48} color="#9ca3af" className="mx-auto mb-4" />
            <h3 className="text-lg font-medium text-dark-text-primary mb-2">No transactions found</h3>
            <p className="text-dark-text-secondary">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionsView;