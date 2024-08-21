// StepIndicator.js
import React from 'react';

const StepIndicator = ({ step }) => {
  const steps = ['Personal Info', 'Contact Info', 'Identification', 'Account Info'];

  return (
    <div className="flex justify-between mb-8">
      {steps.map((label, index) => (
        <div
          key={index}
          className={`flex-1 text-center p-2 rounded-full text-sm font-medium ${
            step === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'
          }`}
        >
          Step {index + 1}: {label}
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
