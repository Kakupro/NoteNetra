import React from 'react';
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import Icon from '../../../components/AppIcon';
import { demoData } from '../../../utils/demoData';

const CreditScoreView = () => {
  const currentScore = 742;
  const previousScore = 680;
  const scoreImprovement = currentScore - previousScore;

  const creditHistory = demoData.creditScoreHistory.map(item => ({
    month: `${item.month} 2024`,
    score: item.score,
    factors: getFactorsForScore(item.score)
  }));

  const loanEligibility = demoData.loanEligibility;

  function getFactorsForScore(score) {
    if (score >= 740) return 'Excellent credit utilization';
    if (score >= 700) return 'Good payment history';
    if (score >= 680) return 'Regular transactions';
    return 'Initial assessment';
  }

  const scoringFactors = [
    {
      factor: 'Transaction Consistency',
      score: 85,
      impact: 'High',
      description: 'Regular daily transactions showing business activity',
      color: 'bg-green-500'
    },
    {
      factor: 'Payment Method Diversity',
      score: 78,
      impact: 'Medium',
      description: 'Using multiple payment methods (UPI, Cash, Cards)',
      color: 'bg-blue-500'
    },
    {
      factor: 'Revenue Growth',
      score: 92,
      impact: 'High',
      description: 'Consistent month-over-month revenue increase',
      color: 'bg-green-500'
    },
    {
      factor: 'Digital Adoption',
      score: 70,
      impact: 'Medium',
      description: 'Active use of digital payment systems',
      color: 'bg-yellow-500'
    },
    {
      factor: 'Business Documentation',
      score: 65,
      impact: 'Low',
      description: 'Invoice generation and record keeping',
      color: 'bg-orange-500'
    }
  ];

  const getScoreColor = (score) => {
    if (score >= 750) return 'text-green-400';
    if (score >= 700) return 'text-blue-400';
    if (score >= 650) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBackground = (score) => {
    if (score >= 750) return 'bg-green-500/10 border-green-500/20';
    if (score >= 700) return 'bg-blue-500/10 border-blue-500/20';
    if (score >= 650) return 'bg-yellow-500/10 border-yellow-500/20';
    return 'bg-red-500/10 border-red-500/20';
  };

  const CircularProgress = ({ score, maxScore = 850 }) => {
    const percentage = (score / maxScore) * 100;
    const circumference = 2 * Math.PI * 45;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative w-32 h-32">
        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="#374151"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke={score >= 750 ? '#10b981' : score >= 700 ? '#3b82f6' : '#f59e0b'}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className={`text-2xl font-bold ${getScoreColor(score)}`}>{score}</div>
            <div className="text-xs text-dark-text-muted">/{maxScore}</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6 bg-dark-bg-primary">
      {/* Credit Score Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Score */}
        <div className={`rounded-xl border p-6 ${getScoreBackground(currentScore)}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-dark-text-primary">Current Credit Score</h3>
            <Icon name="Award" size={24} color="var(--color-primary)" />
          </div>
          <div className="flex items-center justify-center mb-4">
            <CircularProgress score={currentScore} />
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 text-green-400 font-medium">
              <Icon name="TrendingUp" size={16} />
              <span>+{scoreImprovement} points</span>
            </div>
            <p className="text-sm text-dark-text-secondary mt-1">Since January 2024</p>
          </div>
        </div>

        {/* Score Range */}
        <div className="bg-dark-bg-card rounded-xl border border-dark-border-primary p-6">
          <h3 className="text-lg font-semibold text-dark-text-primary mb-4">Score Range</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-dark-text-secondary">Excellent (750+)</span>
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-dark-text-secondary">Good (700-749)</span>
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-dark-text-secondary">Fair (650-699)</span>
              <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-dark-text-secondary">Poor (&lt;650)</span>
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-blue-500/10 rounded-lg">
            <p className="text-sm text-blue-400 font-medium">Your Score: Good Range</p>
            <p className="text-xs text-blue-300 mt-1">You're close to excellent! Keep up the good work.</p>
          </div>
        </div>

        {/* Next Milestone */}
        <div className="bg-dark-bg-card rounded-xl border border-dark-border-primary p-6">
          <h3 className="text-lg font-semibold text-dark-text-primary mb-4">Next Milestone</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">750</div>
            <p className="text-sm text-dark-text-secondary mb-4">Excellent Credit Score</p>
            <div className="w-full bg-dark-bg-tertiary rounded-full h-2 mb-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${((currentScore - 700) / (750 - 700)) * 100}%` }}
              ></div>
            </div>
            <p className="text-xs text-dark-text-muted">8 points to go</p>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center space-x-2 text-sm text-dark-text-secondary">
              <Icon name="CheckCircle" size={14} color="var(--color-success)" />
              <span>Maintain transaction consistency</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-dark-text-secondary">
              <Icon name="CheckCircle" size={14} color="var(--color-success)" />
              <span>Increase digital payment usage</span>
            </div>
          </div>
        </div>
      </div>
      {/* Credit Score History */}
      <div className="bg-dark-bg-card rounded-xl border border-dark-border-primary p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-dark-text-primary">Credit Score History</h3>
          <div className="flex items-center space-x-2 text-sm text-green-400 font-medium">
            <Icon name="TrendingUp" size={16} />
            <span>+{scoreImprovement} points improvement</span>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={creditHistory}>
              <defs>
                <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis domain={[650, 800]} stroke="#9ca3af" />
              <Tooltip 
                formatter={(value) => [value, 'Credit Score']}
                labelStyle={{ color: '#ffffff' }}
                contentStyle={{ backgroundColor: '#1e1e1e', border: '1px solid #333333' }}
              />
              <Area
                type="monotone"
                dataKey="score"
                stroke="#8B5CF6"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#scoreGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Scoring Factors */}
      <div className="bg-dark-bg-card rounded-xl border border-dark-border-primary p-6">
        <h3 className="text-lg font-semibold text-dark-text-primary mb-6">Scoring Factors</h3>
        <div className="space-y-4">
          {scoringFactors?.map((factor, index) => (
            <div key={index} className="border border-dark-border-primary rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-dark-text-primary">{factor?.factor}</h4>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    factor?.impact === 'High' ? 'bg-red-500/10 text-red-400' :
                    factor?.impact === 'Medium'? 'bg-yellow-500/10 text-yellow-400' : 'bg-green-500/10 text-green-400'
                  }`}>
                    {factor?.impact} Impact
                  </span>
                  <span className="font-bold text-dark-text-primary">{factor?.score}/100</span>
                </div>
              </div>
              <div className="w-full bg-dark-bg-tertiary rounded-full h-2 mb-2">
                <div 
                  className={`h-2 rounded-full ${factor?.color} transition-all duration-1000`}
                  style={{ width: `${factor?.score}%` }}
                ></div>
              </div>
              <p className="text-sm text-dark-text-secondary">{factor?.description}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Loan Eligibility */}
      <div className="bg-dark-bg-card rounded-xl border border-dark-border-primary p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-dark-text-primary">Loan Eligibility</h3>
          <div className="flex items-center space-x-2 text-sm text-blue-400">
            <Icon name="Info" size={16} />
            <span>Based on current credit score</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {loanEligibility?.map((loan, index) => (
            <div key={index} className="border border-dark-border-primary rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                    <Icon name={loan?.icon} size={20} color="var(--color-primary)" />
                  </div>
                  <h4 className="font-medium text-dark-text-primary">{loan?.type}</h4>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  loan?.status === 'eligible' ? 'bg-green-500/10 text-green-400' :
                  loan?.status === 'under-review' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-red-500/10 text-red-400'
                }`}>
                  {loan?.status === 'eligible' ? 'Eligible' :
                   loan?.status === 'under-review' ? 'Under Review' : 'Not Eligible'}
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-dark-text-secondary">Amount:</span>
                  <span className="font-medium text-dark-text-primary">₹{loan?.amount?.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-dark-text-secondary">Interest Rate:</span>
                  <span className="font-medium text-dark-text-primary">{loan?.interest}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-dark-text-secondary">Tenure:</span>
                  <span className="font-medium text-dark-text-primary">{loan?.tenure}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreditScoreView;