// Step3.js
import React from 'react';

const Step3 = ({ formData, setFormData, nextStep, prevStep,errors }) => {
  const { cni, montant } = formData;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Step 3: Identification</h2>
      <div className="grid grid-cols-1 gap-4">
        <input
          type="text"
          placeholder="ID (CNI)"
          value={cni}
          onChange={(e) => setFormData({ ...formData, cni: e.target.value })}
          className={`p-4 border rounded-md ${errors.cni ? 'border-red-500' : 'border-gray-300'}`}
        />
        <input
          type="number"
          placeholder="Amount"
          value={montant}
          onChange={(e) => setFormData({ ...formData, montant: e.target.value })}
          className={`p-4 border rounded-md ${errors.montant ? 'border-red-500' : 'border-gray-300'}`}
        />
      </div>
      <div className="flex justify-between mt-4">
        <button 
          onClick={prevStep} 
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
        >
          Back
        </button>
        <button 
          onClick={nextStep} 
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step3;
