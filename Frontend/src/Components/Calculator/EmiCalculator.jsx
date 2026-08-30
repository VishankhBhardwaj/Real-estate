import React, { useState, useMemo, useEffect } from 'react';
import styles from './EmiCalculator.module.css';
import { Calculator, DollarSign, Percent, Calendar, PieChart, TrendingUp, ArrowRight } from 'lucide-react';

const formatCurrency = (val) => {
  if (!val && val !== 0) return '₹0';
  if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
  if (val >= 100000) return `₹${(val / 100000).toFixed(2)} Lakh`;
  return `₹${Math.round(val).toLocaleString('en-IN')}`;
};

const EmiCalculator = ({ initialPrice = 10000000 }) => {
  const [propertyPrice, setPropertyPrice] = useState(initialPrice || 10000000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [loanTenureYears, setLoanTenureYears] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);
  const [activeTab, setActiveTab] = useState('emi');
  const [expectedRentalRate, setExpectedRentalRate] = useState(3.5);

  useEffect(() => {
    if (initialPrice && initialPrice > 0) {
      setPropertyPrice(initialPrice);
    }
  }, [initialPrice]);

  const calculations = useMemo(() => {
    const downPayment = (propertyPrice * downPaymentPercent) / 100;
    const principal = Math.max(0, propertyPrice - downPayment);
    const monthlyRate = interestRate / (12 * 100);
    const totalMonths = loanTenureYears * 12;

    let emi = 0;
    if (principal > 0 && monthlyRate > 0 && totalMonths > 0) {
      emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
            (Math.pow(1 + monthlyRate, totalMonths) - 1);
    }

    const totalPayment = emi * totalMonths;
    const totalInterest = Math.max(0, totalPayment - principal);
    const principalPercent = totalPayment > 0 ? (principal / totalPayment) * 100 : 0;
    const interestPercent = totalPayment > 0 ? (totalInterest / totalPayment) * 100 : 0;

    const annualRent = (propertyPrice * expectedRentalRate) / 100;
    const monthlyRent = annualRent / 12;
    const netCashflowMonthly = monthlyRent - emi;

    return {
      downPayment,
      principal,
      monthlyEmi: isNaN(emi) ? 0 : emi,
      totalInterest: isNaN(totalInterest) ? 0 : totalInterest,
      totalPayment: isNaN(totalPayment) ? 0 : totalPayment,
      principalPercent: isNaN(principalPercent) ? 0 : principalPercent,
      interestPercent: isNaN(interestPercent) ? 0 : interestPercent,
      annualRent,
      monthlyRent,
      netCashflowMonthly
    };
  }, [propertyPrice, downPaymentPercent, loanTenureYears, interestRate, expectedRentalRate]);

  return (
    <div className={styles.calculatorCard}>
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <div className={styles.iconCircle}>
            <Calculator size={22} />
          </div>
          <div>
            <h3 className={styles.title}>Luxury Mortgage & Investment Estimator</h3>
            <p className={styles.subtitle}>Calculate monthly loan EMIs, principal vs interest, and expected rental ROI</p>
          </div>
        </div>

        <div className={styles.tabSwitch}>
          <button 
            type="button"
            className={`${styles.tabBtn} ${activeTab === 'emi' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('emi')}
          >
            Loan EMI
          </button>
          <button 
            type="button"
            className={`${styles.tabBtn} ${activeTab === 'roi' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('roi')}
          >
            Rental ROI
          </button>
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.controlsSection}>
          <div className={styles.inputGroup}>
            <div className={styles.labelRow}>
              <label htmlFor="priceInput">Property Value</label>
              <span className={styles.valueHighlight}>{formatCurrency(propertyPrice)}</span>
            </div>
            <input
              id="priceInput"
              type="range"
              min="500000"
              max="50000000"
              step="250000"
              value={propertyPrice}
              onChange={(e) => setPropertyPrice(Number(e.target.value))}
              className={styles.rangeSlider}
            />
            <div className={styles.quickPresets}>
              <button type="button" onClick={() => setPropertyPrice(5000000)}>₹50 L</button>
              <button type="button" onClick={() => setPropertyPrice(10000000)}>₹1 Cr</button>
              <button type="button" onClick={() => setPropertyPrice(20000000)}>₹2 Cr</button>
              <button type="button" onClick={() => setPropertyPrice(35000000)}>₹3.5 Cr</button>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.labelRow}>
              <label htmlFor="downPaymentInput">Down Payment ({downPaymentPercent}%)</label>
              <span className={styles.valueHighlight}>{formatCurrency(calculations.downPayment)}</span>
            </div>
            <input
              id="downPaymentInput"
              type="range"
              min="10"
              max="80"
              step="5"
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className={styles.rangeSlider}
            />
          </div>

          <div className={styles.twoColumnInputs}>
            <div className={styles.inputGroup}>
              <div className={styles.labelRow}>
                <label htmlFor="interestRateInput">Interest Rate (% p.a.)</label>
                <span className={styles.valueHighlight}>{interestRate}%</span>
              </div>
              <input
                id="interestRateInput"
                type="range"
                min="6.5"
                max="14.0"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.labelRow}>
                <label htmlFor="tenureInput">Tenure ({loanTenureYears} Yrs)</label>
                <span className={styles.valueHighlight}>{loanTenureYears * 12} Mo</span>
              </div>
              <input
                id="tenureInput"
                type="range"
                min="1"
                max="30"
                step="1"
                value={loanTenureYears}
                onChange={(e) => setLoanTenureYears(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>
          </div>

          {activeTab === 'roi' && (
            <div className={styles.inputGroup}>
              <div className={styles.labelRow}>
                <label htmlFor="rentalRateInput">Expected Gross Rental Yield (%)</label>
                <span className={styles.valueHighlight}>{expectedRentalRate}% p.a.</span>
              </div>
              <input
                id="rentalRateInput"
                type="range"
                min="1.5"
                max="8.0"
                step="0.25"
                value={expectedRentalRate}
                onChange={(e) => setExpectedRentalRate(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>
          )}
        </div>

        <div className={styles.resultsSection}>
          {activeTab === 'emi' ? (
            <>
              <div className={styles.emiHighlightBox}>
                <span className={styles.emiLabel}>Estimated Monthly EMI</span>
                <h2 className={styles.emiAmount}>{formatCurrency(calculations.monthlyEmi)}<small>/mo</small></h2>
              </div>

              <div className={styles.progressSection}>
                <div className={styles.progressLabels}>
                  <span>Principal ({calculations.principalPercent.toFixed(0)}%)</span>
                  <span>Interest ({calculations.interestPercent.toFixed(0)}%)</span>
                </div>
                <div className={styles.progressBar}>
                  <div 
                    className={styles.principalFill} 
                    style={{ width: `${calculations.principalPercent}%` }}
                  />
                  <div 
                    className={styles.interestFill} 
                    style={{ width: `${calculations.interestPercent}%` }}
                  />
                </div>
              </div>

              <div className={styles.summaryGrid}>
                <div className={styles.summaryItem}>
                  <span className={styles.summaryLabel}>Loan Principal</span>
                  <span className={styles.summaryValue}>{formatCurrency(calculations.principal)}</span>
                </div>
                <div className={styles.summaryItem}>
                  <span className={styles.summaryLabel}>Total Interest</span>
                  <span className={styles.summaryValue}>{formatCurrency(calculations.totalInterest)}</span>
                </div>
                <div className={styles.summaryItem}>
                  <span className={styles.summaryLabel}>Down Payment</span>
                  <span className={styles.summaryValue}>{formatCurrency(calculations.downPayment)}</span>
                </div>
                <div className={styles.summaryItem}>
                  <span className={styles.summaryLabel}>Total Payment</span>
                  <span className={styles.summaryValue}>{formatCurrency(calculations.totalPayment)}</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className={styles.emiHighlightBox}>
                <span className={styles.emiLabel}>Est. Monthly Rental Income</span>
                <h2 className={styles.emiAmount}>{formatCurrency(calculations.monthlyRent)}<small>/mo</small></h2>
              </div>

              <div className={styles.summaryGrid}>
                <div className={styles.summaryItem}>
                  <span className={styles.summaryLabel}>Annual Rent</span>
                  <span className={styles.summaryValue}>{formatCurrency(calculations.annualRent)}</span>
                </div>
                <div className={styles.summaryItem}>
                  <span className={styles.summaryLabel}>Monthly EMI</span>
                  <span className={styles.summaryValue}>{formatCurrency(calculations.monthlyEmi)}</span>
                </div>
                <div className={styles.summaryItem}>
                  <span className={styles.summaryLabel}>Net Cash Flow</span>
                  <span 
                    className={styles.summaryValue}
                    style={{ color: calculations.netCashflowMonthly >= 0 ? '#10b981' : '#f87171' }}
                  >
                    {formatCurrency(calculations.netCashflowMonthly)}/mo
                  </span>
                </div>
                <div className={styles.summaryItem}>
                  <span className={styles.summaryLabel}>Gross Yield</span>
                  <span className={styles.summaryValue}>{expectedRentalRate}%</span>
                </div>
              </div>
            </>
          )}

          <div className={styles.disclaimer}>
            Rates are indicative. Actual loan terms depend on your financial profile and bank policies.
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmiCalculator;
