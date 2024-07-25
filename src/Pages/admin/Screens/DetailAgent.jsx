import React, { useEffect, useState } from "react";
import SideBar from "../global/SideBar";
import { useParams } from "react-router-dom";
import { API_ADMIN } from "../../../config/endPoint";
import axios from "axios";

const DetailAgent = ({ user }) => {
  const { id } = useParams();
  const [agentDetails, setAgentDetails] = useState(null);
  const [formData, setFormData] = useState({ email: '', identite: '', enabled: false });
  const token = localStorage.getItem("token");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token"); // Remplacez 'your_token_here' par le token réel
      try {
        const response = await fetch(`${API_ADMIN}/agent/details/${id}`, {
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
        console.log(data);
        setAgentDetails(data);
      } catch (error) {
        toast.error("Erreur lors de la récupération des utilisateurs");
      }
    };

    fetchUsers();
  }, [id]);

  const handleModalOpen = () => {
    setIsModalOpen(true);
    setFormData({
      email: agentDetails.email,
      identite: agentDetails.identite,
      enabled: agentDetails.status,
    });
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSwitchChange = () => {
    setFormData({ ...formData, enabled: !formData.enabled });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Logique pour soumettre les modifications à l'API
    console.log('Form data:', formData);
    handleModalClose();
  };









  if (!agentDetails) {
    return (
      <SideBar user={user}>
        <div className="flex justify-center items-center h-full">
          <div className="text-gray-600">Loading...</div>
        </div>
      </SideBar>
    );
  }

  return (
    <SideBar user={user}>
      <div className="p-6 bg-white shadow-md rounded-lg w-full mx-auto mt-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Agent Details</h1>
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden">
              <img
                src={agentDetails.avatarUrl}
                alt="Agent Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="ml-6">
              <h2 className="text-xl font-semibold text-gray-700 flex items-center">
                {agentDetails.nom} {agentDetails.prenom}
                <span
                  className={`ml-2 w-3 h-3 rounded-full ${
                    agentDetails.status ? "bg-green-500" : "bg-red-500"
                  }`}
                ></span>
              </h2>
              <p className="text-gray-500">{agentDetails.email}</p>
              <p>{agentDetails.genre} </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-700">Telephone</h3>
              <p className="text-gray-600">{agentDetails.telephone}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-700">Adresse</h3>
              <p className="text-gray-600">{agentDetails.adresse}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-700">Role</h3>
              <p className="text-gray-600">Agent de collecte</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-700">
                Numero d'identite
              </h3>
              <p className="text-gray-600">{agentDetails.identite}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-700">
                Zone Affecte
              </h3>
              <ul className="list-disc list-inside text-gray-600">
                {agentDetails.zone.map((zone, index) => (
                  <li key={index}>{zone}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-4 mt-6">
            <button onClick={handleModalOpen} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
              Modifier
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg">
              Supprimer
            </button>
          </div>
        </div>
      </div>

      {/* modal */}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-2xl font-bold mb-4">Modifier les détails de l'agent</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  className="w-full px-4 py-2 border rounded-lg"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Numéro d'identité</label>
                <input
                  type="text"
                  name="identite"
                  className="w-full px-4 py-2 border rounded-lg"
                  value={formData.identite}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4 flex items-center">
                <label className="block text-gray-700 mr-4">Enabled</label>
                <div
                  className={`w-10 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer ${
                    formData.enabled ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                  onClick={handleSwitchChange}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform ${
                      formData.enabled ? 'translate-x-4' : ''
                    }`}
                  ></div>
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                <button type="button" onClick={handleModalClose} className="bg-gray-500 text-white px-4 py-2 rounded-lg">Annuler</button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Enregistrer</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </SideBar>
  );
};

export default DetailAgent;
