import React, { useEffect, useState } from "react";
import SideBar from "../../global/SideBar";
import { API_ADMIN } from "../../../../config/endPoint";
import { useParams } from "react-router-dom";
import Modal from "../../../../utils/CompteModal";

const formatDate = (dateString) => {
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", options);
};

const DetailClient = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [loadingAgent, setLoadingAgent] = useState(true);
  const [clientData, setClientData] = useState(null);
  const [listeAgent, setListeAgent] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  const fetchListeAgent = async () => {
    const token = localStorage.getItem("token"); // Remplacez 'your_token_here' par le token réel
    try {
      const response = await fetch(`${API_ADMIN}/agent/listeAgent`, {
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
      
      setListeAgent(data.listeAgent);
    } catch (error) {
      console.error("Error fetching client details:", error);
    } finally {
      setLoadingAgent(false);
    }
  };

  useEffect(() => {

    const fetchUsers = async () => {
      const token = localStorage.getItem("token"); // Remplacez 'your_token_here' par le token réel
      try {
        const response = await fetch(`${API_ADMIN}/waitclient/details/${id}`, {
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
        setClientData(data);
      } catch (error) {
        console.error("Error fetching client details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
    fetchListeAgent();
    
  }, [id]);

  const confirm = async()=>{
    console.log("Confirm")
  }


  if (loading || loadingAgent) {
    return (
      <SideBar>
        <div className="p-6 bg-white shadow-md rounded-lg max-w-4xl mx-auto mt-8">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">
            Loading...
          </h1>
          <p>Please wait while the client details are being fetched.</p>
        </div>
      </SideBar>
    );
  }

  if (!clientData || !listeAgent) {
    return (
      <SideBar>
        <div className="p-6 bg-white shadow-md rounded-lg max-w-4xl mx-auto mt-8">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">Error</h1>
          <p>Failed to load client details. Please try again later.</p>
        </div>
      </SideBar>
    );
  }

  return (
    <SideBar>

      <div className="p-6 bg-white shadow-md rounded-lg max-w-4xl mx-auto mt-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Client Details
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium text-gray-700 mb-2">
              Personal Information
            </h2>
            <div className="space-y-2">
              <p>
                <span className="font-semibold text-gray-600">Name:</span>{" "}
                {clientData.nom} {clientData.prenom}
              </p>
              <p>
                <span className="font-semibold text-gray-600">Gender:</span>{" "}
                {clientData.genre}
              </p>
              <p>
                <span className="font-semibold text-gray-600">
                  Date de naissance :
                </span>{" "}
                {formatDate(clientData.datNaiss)}
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium text-gray-700 mb-2">
              Contact Information
            </h2>
            <div className="space-y-2">
              <p>
                <span className="font-semibold text-gray-600">Email:</span>{" "}
                {clientData.email}
              </p>
              <p>
                <span className="font-semibold text-gray-600">Phone:</span>{" "}
                {clientData.tel}
              </p>
              <p>
                <span className="font-semibold text-gray-600">Address:</span>{" "}
                {clientData.adresse}
              </p>
            </div>
          </div>

          {/* Account Information */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium text-gray-700 mb-2">
              Account Information
            </h2>
            <div className="space-y-2">
              <p>
                <span className="font-semibold text-gray-600">
                  Account Number:
                </span>{" "}
                {clientData.cni}
              </p>
              <p>
                <span className="font-semibold text-gray-600">
                  Account Type:
                </span>{" "}
                {clientData.typeCompte.name}
              </p>
              <p>
                <span className="font-semibold text-gray-600">
                  Account Status:
                </span>{" "}
                {clientData.enabled ? "Active" : "Inactive"}
              </p>
            </div>
          </div>

          {/* Additional Notes */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium text-gray-700 mb-2">
              Additional Notes
            </h2>
            <p className="text-gray-600">{clientData.note}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end space-x-4">
          <button onClick={openModal} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Finaliser l'inscription
          </button>
          <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
            Rejeter l'inscription
          </button>
        </div>
      </div>




      

      {/* Modal Usage */}
      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <h2 className="text-2xl font-bold mb-4">Fill in the Form</h2>
        
        <form 
          onSubmit={confirm}
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Montant de cotisation
            </label>
            <input
              type="text"
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, '');
              }}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Selectionner agent
            </label>

            <select
              defaultValue=""
             className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="" disabled>Selectionner agent</option>
              {listeAgent.map((agent, index) => (
                <option key={index} value={agent._id}>
                  {`${agent.nom} ${agent.prenom} - ${agent.zone.join(", ")}`}
                </option>
              ))}
            </select>

          </div>


          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-blue-500 text-white p-2 rounded-lg mr-4"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white p-2 rounded-lg"
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>




    </SideBar>
  );
};

export default DetailClient;
