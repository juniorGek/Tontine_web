import React from 'react';

const Step1 = ({ formData, setFormData, nextStep, errors }) => {
  const { nom, prenom, genre } = formData;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Step 1: Personal Information</h2>
      <div className="grid grid-cols-1 gap-4">
        <input
          type="text"
          placeholder="Nom"
          value={nom}
          onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
          className={`p-4 border rounded-md ${errors.nom ? 'border-red-500' : 'border-gray-300'}`}
        />
        <input
          type="text"
          placeholder="Prenom"
          value={prenom}
          onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
          className={`p-4 border rounded-md ${errors.prenom ? 'border-red-500' : 'border-gray-300'}`}
        />
        <select
          value={genre}
          onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
          className={`p-4 border rounded-md ${errors.genre ? 'border-red-500' : 'border-gray-300'}`}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <button 
        onClick={nextStep} 
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Next
      </button>
    </div>
  );
};

export default Step1;