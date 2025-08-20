// MSME Credit Score (Cash Transactions Only)
// Inputs: array of transactions with fields: { time, amount, type: 'credit'|'debit', ... }
// Output: { score0to100, score300to900, metricScores, rawMetrics }

// Weights aligned with the requested model
const WEIGHTS = {
  avgInflow: 0.25,
  consistency: 0.20,
  inflowOutflowRatio: 0.20,
  frequency: 0.15,
  trend: 0.10,
  lowCashEvents: 0.10,
};

const DEFAULT_TARGET_AVG_MONTHLY_INFLOW = 200000; // tune to your context
const LOW_CASH_ROLLING_WINDOW_DAYS = 7;

function clip01(x) {
  return Math.max(0, Math.min(1, x));
}

function safeDiv(n, d) {
  return d === 0 ? 0 : n / d;
}

function formatDateYYYYMMDD(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function ymKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  return `${y}-${m}`;
}

function computeAvgInflowScore(avgMonthlyInflow, target = DEFAULT_TARGET_AVG_MONTHLY_INFLOW) {
  return 100 * clip01(avgMonthlyInflow / Math.max(1, target));
}

function computeConsistencyScore(avg, std) {
  if (avg <= 0) return 0;
  const cv = std / avg; // lower is better
  return 100 * clip01(1 - cv);
}

function computeRatioScore(ratio) {
  if (ratio <= 0.8) return 0;
  if (ratio >= 1.3) return 100;
  if (ratio < 1.0) {
    // 0.8 -> 0, 1.0 -> 50
    return ((ratio - 0.8) / 0.2) * 50;
  }
  // 1.0 -> 50, 1.3 -> 100
  return 50 + ((ratio - 1.0) / 0.3) * 50;
}

function computeFrequencyScore(daysWithTxn, totalDays) {
  return 100 * clip01(safeDiv(daysWithTxn, totalDays));
}

function computeTrendScore(last3MonthlyInflow) {
  if (!last3MonthlyInflow || last3MonthlyInflow.length < 2) return 50;
  const first = last3MonthlyInflow[0] || 0;
  const last = last3MonthlyInflow[last3MonthlyInflow.length - 1] || 0;
  if (first <= 0) return last > 0 ? 100 : 50;
  const pct = (last - first) / first; // -0.5 => 0, 0 => 0.5, +0.5 => 1.0
  return 50 + 50 * clip01((pct + 0.5) / 1.0);
}

function computeLowCashScore(daily) {
  // daily: array of { date: 'YYYY-MM-DD', inflow, outflow }
  // compute rolling 7-day net; count windows < 0
  const dates = daily.map(d => d.date).sort();
  const index = new Map();
  dates.forEach((dateStr, i) => index.set(dateStr, i));
  const vals = dates.map(dateStr => {
    const rec = daily.find(d => d.date === dateStr) || { inflow: 0, outflow: 0 };
    return (rec.inflow || 0) - (rec.outflow || 0);
  });
  const rolling = [];
  for (let i = 0; i < vals.length; i++) {
    let sum = 0;
    for (let k = Math.max(0, i - (LOW_CASH_ROLLING_WINDOW_DAYS - 1)); k <= i; k++) sum += vals[k];
    rolling.push(sum);
  }
  const lowEvents = rolling.filter(v => v < 0).length;
  const norm = Math.max(1, vals.length / LOW_CASH_ROLLING_WINDOW_DAYS);
  const eventRate = lowEvents / norm;
  const score = 100 * clip01(1 - eventRate);
  return { score, eventRate };
}

export function computeCreditScoreFromTransactions(transactions, options = {}) {
  const targetAvgMonthlyInflow = options.targetAvgMonthlyInflow ?? DEFAULT_TARGET_AVG_MONTHLY_INFLOW;

  // Normalize transactions to inflow/outflow by day
  const dailyMap = new Map(); // dateStr -> { inflow, outflow }
  const monthlyMap = new Map(); // ym -> inflow

  let minDate = null;
  let maxDate = null;
  let totalInflow = 0;
  let totalOutflow = 0;

  (transactions || []).forEach(tx => {
    const dt = new Date(tx.time);
    if (isNaN(dt)) return;
    const dateStr = formatDateYYYYMMDD(dt);
    const ym = ymKey(dt);
    const isCredit = String(tx.type).toLowerCase() === 'credit';
    const amount = Number(tx.amount) || 0;

    const dailyRec = dailyMap.get(dateStr) || { inflow: 0, outflow: 0 };
    if (isCredit) {
      dailyRec.inflow += amount;
      totalInflow += amount;
      const m = monthlyMap.get(ym) || 0;
      monthlyMap.set(ym, m + amount);
    } else {
      dailyRec.outflow += amount;
      totalOutflow += amount;
      // outflow does not affect monthly inflow
    }
    dailyMap.set(dateStr, dailyRec);

    if (!minDate || dt < minDate) minDate = dt;
    if (!maxDate || dt > maxDate) maxDate = dt;
  });

  // Build arrays
  const daily = Array.from(dailyMap.entries()).map(([date, v]) => ({ date, ...v })).sort((a, b) => a.date.localeCompare(b.date));
  const monthlyInflow = Array.from(monthlyMap.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([, v]) => v);

  const avgMonthlyInflow = monthlyInflow.length ? monthlyInflow.reduce((a, b) => a + b, 0) / monthlyInflow.length : 0;
  const mean = avgMonthlyInflow;
  const variance = monthlyInflow.length > 1
    ? monthlyInflow.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / monthlyInflow.length
    : 0;
  const stdMonthlyInflow = Math.sqrt(variance);

  // Frequency: days with any tx divided by total days in range
  let totalDays = 0;
  if (minDate && maxDate) {
    const msPerDay = 24 * 60 * 60 * 1000;
    totalDays = Math.max(1, Math.round((maxDate - minDate) / msPerDay) + 1);
  }
  const daysWithTxn = daily.filter(d => (d.inflow || 0) > 0 || (d.outflow || 0) > 0).length;

  // Trend over last 3 months (inflow)
  const last3 = monthlyInflow.slice(-3);
  const trendScore = computeTrendScore(last3);
  let trendPct = 0;
  if (last3.length >= 2 && last3[0] > 0) trendPct = ((last3[last3.length - 1] - last3[0]) / last3[0]) * 100;

  // Low cash events
  const { score: lowCashScore, eventRate: lowCashEventRate } = computeLowCashScore(daily);

  // Metric scores 0..100
  const metricScores = {
    avgInflow: computeAvgInflowScore(avgMonthlyInflow, targetAvgMonthlyInflow),
    consistency: computeConsistencyScore(avgMonthlyInflow, stdMonthlyInflow),
    inflowOutflowRatio: computeRatioScore(safeDiv(totalInflow, totalOutflow)),
    frequency: computeFrequencyScore(daysWithTxn, totalDays),
    trend: trendScore,
    lowCashEvents: lowCashScore,
  };

  const score0to100 = (
    metricScores.avgInflow * WEIGHTS.avgInflow +
    metricScores.consistency * WEIGHTS.consistency +
    metricScores.inflowOutflowRatio * WEIGHTS.inflowOutflowRatio +
    metricScores.frequency * WEIGHTS.frequency +
    metricScores.trend * WEIGHTS.trend +
    metricScores.lowCashEvents * WEIGHTS.lowCashEvents
  );
  const score300to900 = Math.round(300 + score0to100 * 6);

  const rawMetrics = {
    avgMonthlyInflow,
    stdMonthlyInflow,
    inflowOutflowRatio: safeDiv(totalInflow, totalOutflow),
    txnFrequencyPct: totalDays ? (daysWithTxn / totalDays) * 100 : 0,
    trendLast3mPct: trendPct,
    lowCashEventRate: lowCashEventRate,
  };

  return {
    score0to100: Math.round(score0to100 * 100) / 100,
    score300to900,
    metricScores,
    rawMetrics,
    weights: WEIGHTS,
  };
}
