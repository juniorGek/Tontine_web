// Step4.js
import React, { useEffect, useState } from 'react';
import { API_ADMIN } from '../../config/endPoint';

const Step4 = ({ formData, setFormData, prevStep, handleSubmit }) => {
  const { typeCompte, note } = formData;
  const [compte, setCompte] = useState([]);


  const fetchCompte = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${API_ADMIN}/compte/liste`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      console.log(data.categories);
      setCompte(Array.isArray(data.categories) ? data.categories : []);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs", error);
    }
  };

  useEffect(() => {
    fetchCompte();
  }, []);







  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Step 4: Account Information</h2>
      <div className="grid grid-cols-1 gap-4">
        <select
          value={typeCompte}
          onChange={(e) => setFormData({ ...formData, typeCompte: e.target.value })}
          className="p-4 border border-gray-300 rounded-md"
        >
          <option value="" disabled>Select compte</option>
            {compte.map((compte, index) => (
              <option key={index} value={compte._id}>
                {compte.name}
              </option>
            ))}
        </select>
        <textarea
          placeholder="Note"
          value={note}
          onChange={(e) => setFormData({ ...formData, note: e.target.value })}
          className="p-4 border border-gray-300 rounded-md"
        ></textarea>
      </div>
      <div className="flex justify-between mt-4">
        <button 
          onClick={prevStep} 
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
        >
          Back
        </button>
        <button 
          onClick={handleSubmit} 
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Step4;
