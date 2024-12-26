import { useEffect, useState } from "react";
import SideBar from "../../global/SideBar";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { API_ADMIN } from "../../../../config/endPoint";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useWelcome } from "../../../../hook/WelcomeContext";

const Client = ({ user }) => {
  const navigate = useNavigate();
  const [nbClient, setNbClient] = useState(0);
  const { welcomeMessage, setWelcomeMessage } = useWelcome();

  const fetchNbwaitClient = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${API_ADMIN}/nbClient`, {
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
      console.log("data");
      setNbClient(data);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération du nombre de clients en attente",
        error.message
      );
    }
  };

  useEffect(() => {
    fetchNbwaitClient();
  }, []);

  
  
    useEffect(() => {
      if (welcomeMessage) {
        toast.success(welcomeMessage);
        setWelcomeMessage(''); // Reset the welcome message
      }
    }, [welcomeMessage, setWelcomeMessage]);

  /* const handleTotalClient = () => {
    navigate("/admin/clientInscrit");
  }; */

  /* const handleRejectedClient = () => {
    navigate("/admin/rejectedclient");
  }; */

  const handleRegisteredClient = () => {
    navigate("/admin/clientInscrit");
  };

  const handlePendingClient = () => {
    navigate("/admin/client/waitClient");
  };

  const handleAddClient = () => {
    navigate("/admin/client/new");
  };

  /* const handleSearch = () => {
    navigate('/admin/search');
  }; */

  return (
    <SideBar user={user}>
      <ToastContainer position="top-right" />
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold mb-4">Gestion des Clients</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Carte Liste des Clients Rejetés */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-105">
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">
                Liste des Clients Rejetés ( {nbClient.nbClientRefuse} ){" "}
              </h2>
              <p className="text-gray-600">
                Voir la liste des clients dont l&apos;inscription a été rejetée.
              </p>
            </div>
          </div>

          {/* Carte Liste des Clients Inscrits */}
          <div 
            onClick={handleRegisteredClient}
          className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-105">
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">
                Liste des Clients Inscrits ( {nbClient.nbClientValideActif} ){" "}
              </h2>
              <p className="text-gray-600">
                Voir la liste des clients inscrits.
              </p>
            </div>
          </div>

          {/* Carte Liste Totale des Clients */}
          <div
            
            className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-105"
          >
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">
                Liste Totale des Clients ( {nbClient.nbTotalClient} ){" "}
              </h2>
              <p className="text-gray-600">
                Voir la liste de tous les clients.
              </p>
            </div>
          </div>

          {/* Carte Liste des Clients en Entente */}
          <div
            onClick={handlePendingClient}
            className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-105"
          >
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">
                Liste des Clients en Entente ( {nbClient.nbWaitClient} ){" "}
              </h2>
              <p className="text-gray-600">
                Voir la liste des clients en attente de confirmation.
              </p>
            </div>
          </div>

          {/* Carte Ajouter un Nouveau Client */}
          <div
            onClick={handleAddClient}
            className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-105"
          >
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">
                Ajouter un Nouveau Client
              </h2>
              <p className="text-gray-600">
                Ajouter un nouveau client à la liste.
              </p>
            </div>
          </div>

          {/* Carte Rechercher */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-105">
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">Rechercher</h2>
              <p className="text-gray-600">
                Rechercher un client dans la base de données.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SideBar>
  );
};

Client.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Client;
