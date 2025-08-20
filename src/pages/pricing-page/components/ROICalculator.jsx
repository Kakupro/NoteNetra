import React, { useState, useEffect } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ROICalculator = () => {
  const [monthlyTransactions, setMonthlyTransactions] = useState('');
  const [averageTicket, setAverageTicket] = useState('');
  const [currentCreditScore, setCurrentCreditScore] = useState('');
  const [results, setResults] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateROI = () => {
    if (!monthlyTransactions || !averageTicket || !currentCreditScore) return;

    setIsCalculating(true);
    
    // Simulate calculation delay
    setTimeout(() => {
      const monthlyVolume = parseInt(monthlyTransactions) * parseInt(averageTicket);
      const annualVolume = monthlyVolume * 12;
      
      // Mock calculations based on transaction volume
      const creditScoreImprovement = Math.min(150, Math.floor(annualVolume / 100000) * 25 + 50);
      const newCreditScore = Math.min(850, parseInt(currentCreditScore) + creditScoreImprovement);
      const loanEligibility = Math.floor(annualVolume * 0.3); // 30% of annual volume
      const timeToImprovement = Math.max(3, 12 - Math.floor(annualVolume / 500000));
      
      setResults({
        monthlyVolume,
        annualVolume,
        creditScoreImprovement,
        newCreditScore,
        loanEligibility,
        timeToImprovement
      });
      setIsCalculating(false);
    }, 1500);
  };

  const resetCalculator = () => {
    setMonthlyTransactions('');
    setAverageTicket('');
    setCurrentCreditScore('');
    setResults(null);
  };

  return (
    <div className="bg-card rounded-2xl border border-border shadow-card p-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Calculator" size={32} color="var(--color-accent)" strokeWidth={2} />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">ROI Calculator</h3>
        <p className="text-muted-foreground">
          Calculate your potential credit score improvement and loan eligibility
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <Input
            label="Monthly Transactions"
            type="number"
            placeholder="e.g., 500"
            value={monthlyTransactions}
            onChange={(e) => setMonthlyTransactions(e?.target?.value)}
            description="Average number of transactions per month"
          />

          <Input
            label="Average Transaction Value"
            type="number"
            placeholder="e.g., 2500"
            value={averageTicket}
            onChange={(e) => setAverageTicket(e?.target?.value)}
            description="Average value per transaction in ₹"
          />

          <Input
            label="Current Credit Score"
            type="number"
            placeholder="e.g., 650"
            value={currentCreditScore}
            onChange={(e) => setCurrentCreditScore(e?.target?.value)}
            description="Your current credit score (300-850)"
            min="300"
            max="850"
          />

          <div className="flex space-x-3">
            <Button
              variant="default"
              onClick={calculateROI}
              loading={isCalculating}
              disabled={!monthlyTransactions || !averageTicket || !currentCreditScore}
              iconName="Calculator"
              iconPosition="left"
              className="flex-1"
            >
              Calculate ROI
            </Button>
            <Button
              variant="outline"
              onClick={resetCalculator}
              iconName="RotateCcw"
              iconPosition="left"
            >
              Reset
            </Button>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          {results ? (
            <div className="space-y-4">
              <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="TrendingUp" size={20} color="var(--color-success)" strokeWidth={2} />
                  <span className="font-semibold text-success">Projected Improvements</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monthly Volume:</span>
                    <span className="font-medium">₹{results?.monthlyVolume?.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Annual Volume:</span>
                    <span className="font-medium">₹{results?.annualVolume?.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Award" size={20} color="var(--color-primary)" strokeWidth={2} />
                  <span className="font-semibold text-primary">Credit Score Impact</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Current Score:</span>
                    <span className="font-medium">{currentCreditScore}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Projected Score:</span>
                    <span className="font-medium text-success">{results?.newCreditScore}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Improvement:</span>
                    <span className="font-medium text-success">+{results?.creditScoreImprovement}</span>
                  </div>
                </div>
              </div>

              <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Banknote" size={20} color="var(--color-accent)" strokeWidth={2} />
                  <span className="font-semibold text-accent">Loan Eligibility</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Potential Loan:</span>
                    <span className="font-medium">₹{results?.loanEligibility?.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Timeline:</span>
                    <span className="font-medium">{results?.timeToImprovement} months</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 bg-muted/50 rounded-lg border-2 border-dashed border-border">
              <div className="text-center">
                <Icon name="BarChart3" size={48} className="text-muted-foreground mx-auto mb-4" strokeWidth={1.5} />
                <p className="text-muted-foreground">Enter your business details to see projected ROI</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ROICalculator;