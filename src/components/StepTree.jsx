import React, { useEffect, useState } from "react";
import { API_ADMIN } from "../config/endPoint";

const StepThree = ({ formData, setFormData,  }) => {

  const [agent, setAgent] = useState([]);
  const [compte, setCompte] = useState([]);

  const fetchAgent = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${API_ADMIN}/agent/liste`, {
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
      console.log(data.listeAgent);
      setAgent(Array.isArray(data.listeAgent) ? data.listeAgent : []);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs", error);
    }
  };

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
    fetchAgent();
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  return (
    <div>
      <h3 className="text-xl font-bold mb-2">Etape 3: Informations supplémentaires</h3>
      <form>
        <label className="block text-lg mb-2">
          Type de Compte:
          <select
            name="typeCompte"
            value={formData.typeCompte}
            onChange={handleChange}
            className="w-full px-3 py-3 border rounded focus:border-blue-500 focus:border-2 focus:outline-none"
          >
            <option value="" disabled>Select compte</option>
            {compte.map((compte, index) => (
              <option key={index} value={compte._id}>
                {compte.name}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-lg mb-2">
          Montant à cotiser:
          <input
            type="number"
            name="montant"
            value={formData.montant}
            onChange={handleChange}
            min="200"
            className="w-full px-3 py-3 border rounded focus:border-blue-500 focus:border-2 focus:outline-none"
          />
        </label>

        <label className="block text-lg mb-2">
          Agent:
          <select
            name="agentId"
            value={formData.agentId}
            onChange={handleChange}
            className="w-full px-3 py-3 border rounded focus:border-blue-500 focus:border-2 focus:outline-none"
          >
            <option value="" disabled>Selectionner agent</option>
            {agent.map((agent, index) => (
              <option key={index} value={agent._id}>
                {`${agent.nom} ${agent.prenom} - ${agent.zone.join(", ")}`}
              </option>
            ))}
          </select>

        </label>

        <label className="block mb-2">
          Notes:
          <textarea
            name="note"
            value={formData.note}
            onChange={handleChange}
            className="w-full px-3 py-3 border rounded focus:border-blue-500 focus:border-2 focus:outline-none"
          ></textarea>
        </label>
      </form>
    </div>
  );
};

export default StepThree;
