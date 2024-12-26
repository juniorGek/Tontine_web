import { useEffect, useState } from "react";
import SideBar from "../../global/SideBar";
import { API_ADMIN } from "../../../../config/endPoint";
import { Switch } from "@headlessui/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useWelcome } from "../../../../hook/WelcomeContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Zone({ user }) {
  const [zones, setZones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newZone, setNewZone] = useState("");
  const [zoneDetail, setZoneDetail] = useState("");
  const { welcomeMessage, setWelcomeMessage } = useWelcome();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [zoneToDelete, setZoneToDelete] = useState(null);

  // Exemple : Fonction pour récupérer les zones (API fictive)
  const fetchZones = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_ADMIN}/listZone`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des zones");
      }

      const data = await response.json();
      setZones(data.listeZone || []);
    } catch (error) {
      console.error(error);
      setZones([]);
    } finally {
      setLoading(false);
    }
  };

   useEffect(() => {
      if (welcomeMessage) {
        toast.success(welcomeMessage);
        setWelcomeMessage(""); // Reset the welcome message
      }
    }, [welcomeMessage, setWelcomeMessage]);

  useEffect(() => {
    fetchZones();
  }, []);

  const handleAddZone = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_ADMIN}/addZone`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ zoneName: newZone, details: zoneDetail }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout de la zone");
      }

      const data = await response.json();
      setWelcomeMessage(data.message);
      setNewZone("");
      setZoneDetail("");
      fetchZones();
      setIsModalOpen(false);
      
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleZone = (zoneId) => {
    console.log(`Toggle activé/désactivé pour la zone avec ID: ${zoneId}`);
    // Logique pour activer/désactiver la zone via API
  };

  const handleEditZone = (zoneId) => {
    console.log(`Modifier la zone avec ID: ${zoneId}`);
    // Redirection ou ouverture d'une modal pour modifier la zone
  };

  const handleDeleteZone = async () => {
      try {
        if (!zoneToDelete) return;

        setIsDeleteModalOpen(false);

        const token = localStorage.getItem("token");
        const response = await fetch(`${API_ADMIN}/deleteZone/${zoneToDelete}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Erreur lors de la suppression de la zone");
        }

        const data = await response.json();
        setWelcomeMessage(data.message);
        fetchZones();
      } catch (error) {
        console.error(error);
      }
  };

  const openDeleteConfirmation = (zoneId) => {
    setZoneToDelete(zoneId);
    setIsDeleteModalOpen(true);
  };

  return (
    <SideBar user={user}>
      <ToastContainer position="top-right" />
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Liste des Zones</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Ajouter une zone
          </button>
        </div>
        {loading ? (
          <p className="text-center text-gray-500">Chargement des zones...</p>
        ) : zones.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Aucune zone n'est disponible. Veuillez en ajouter.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Ajouter une zone
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-auto w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">#</th>
                  <th className="px-4 py-2 text-left">Nom de la Zone</th>
                  <th className="px-4 py-2 text-center">Statut</th>
                  <th className="px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {zones.map((zone, index) => (
                  <tr key={zone._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{zone.zoneName}</td>
                    <td className="px-4 py-2 text-center">
                      <Switch
                        checked={zone.enabled}
                        onChange={() => handleToggleZone(zone._id)}
                        className={`${
                          zone.enabled ? "bg-green-500" : "bg-gray-300"
                        } relative inline-flex h-6 w-11 items-center rounded-full`}
                      >
                        <span
                          className={`${
                            zone.enabled ? "translate-x-6" : "translate-x-1"
                          } inline-block h-4 w-4 transform rounded-full bg-white`}
                        />
                      </Switch>
                    </td>
                    <td className="px-4 py-2 text-center">
                      <button
                        onClick={() => handleEditZone(zone._id)}
                        className="text-blue-500 hover:text-blue-700 mr-2"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => openDeleteConfirmation(zone._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal d'ajout */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
            <h3 className="text-xl font-bold mb-4">
              Ajouter une nouvelle zone
            </h3>
            <input
              type="text"
              value={newZone}
              onChange={(e) => setNewZone(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Nom de la zone"
              required
            />
            <textarea 
              value={zoneDetail}
              onChange={(e) => setZoneDetail(e.target.value)}
              rows="3"
              placeholder="Details ...."
              className="w-full p-2 border border-gray-300 rounded mb-4" ></textarea>
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 text-black py-2 px-4 rounded mr-2 hover:bg-gray-400"
              >
                Annuler
              </button>
              <button
                onClick={handleAddZone}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}


{isDeleteModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
      <h3 className="text-xl font-bold mb-4">Confirmer la suppression</h3>
      <p className="mb-6">
        Êtes-vous sûr de vouloir supprimer cette zone ? Cette action est
        irréversible.
      </p>
      <div className="flex justify-end">
        <button
          onClick={() => setIsDeleteModalOpen(false)}
          className="bg-gray-300 text-black py-2 px-4 rounded mr-2 hover:bg-gray-400"
        >
          Annuler
        </button>
        <button
          onClick={handleDeleteZone}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          Supprimer
        </button>
      </div>
    </div>
  </div>
)}



    </SideBar>
  );
}

export default Zone;
