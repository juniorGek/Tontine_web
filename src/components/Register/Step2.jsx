// Step2.js
import React from 'react';

const Step2 = ({ formData, setFormData, nextStep, prevStep, errors }) => {
  const { email, adresse, tel } = formData;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Step 2: Contact Information</h2>
      <div className="grid grid-cols-1 gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={`p-4 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
        />
        <div className='text-red-400 font-medium ' >{errors.email} </div>
        <input
          type="text"
          placeholder="Address"
          value={adresse}
          onChange={(e) => setFormData({ ...formData, adresse: e.target.value })}
          className={`p-4 border rounded-md ${errors.adresse ? 'border-red-500' : 'border-gray-300'}`}
        />
        
        <input
          type="text"
          placeholder="Phone Number"
          value={tel}
          onChange={(e) => setFormData({ ...formData, tel: e.target.value })}
          className={`p-4 border rounded-md ${errors.tel ? 'border-red-500' : 'border-gray-300'}`}
        />
        <div className='text-red-400 font-medium ' >{errors.tel} </div>
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

export default Step2;
