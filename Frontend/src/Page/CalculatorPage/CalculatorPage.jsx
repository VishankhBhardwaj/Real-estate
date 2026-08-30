import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import EmiCalculator from '../../Components/Calculator/EmiCalculator';

const CalculatorPage = () => {
  return (
    <div style={{ minHeight: '100vh', background: '#0d0d11', color: '#fff' }}>
      <Navbar />
      <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px' }}>
        <EmiCalculator initialPrice={15000000} />
      </div>
    </div>
  );
};

export default CalculatorPage;
