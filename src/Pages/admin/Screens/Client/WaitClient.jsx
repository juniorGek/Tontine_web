import { useEffect, useState } from "react";
import SideBar from "../../global/SideBar";
import { useNavigate } from "react-router-dom";
import { API_ADMIN } from "../../../../config/endPoint";

const WaitClient = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const fetchAwaitClient = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${API_ADMIN}/awaitClient`, {
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
      setUsers(Array.isArray(data.client) ? data.client : []);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs");
    }
  };

  useEffect(() => {
    fetchAwaitClient();
  }, []);

  const handleClientClick = (client) => {
    navigate(`/admin/detailWaitClient/${client._id}`);
  };

  const filteredClients = users.filter(
    (client) =>
      client.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SideBar user={user}>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Inscriptions en attente</h2>
        {users.length > 0 ? (
          <>
            <input
              type="text"
              placeholder="Rechercher un client..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-4 p-4 border border-gray-300 rounded-lg w-72"
            />
            {filteredClients.length > 0 ? (
              // Grille en colonne avec scroll vertical
              <div
                className="flex flex-col space-y-4  border-gray-300"
                style={{ height: "700px", overflowY: "auto", padding: "10px" }}
              >
                {filteredClients.map((client) => (
                  <div
                    key={client._id}
                    className="bg-white p-4 rounded-lg shadow cursor-pointer hover:bg-blue-100"
                    onClick={() => handleClientClick(client)}
                  >
                    <div className="flex flex-col justify-between">
                      <div>
                        <p className="font-medium text-xl">
                          {client.nom} {client.prenom}
                        </p>
                        <p className="text-lg font-semibold">{client.email}</p>
                        <p className="text-sm text-gray-500">
                          Inscrit le :{" "}
                          {new Date(client.createdAt).toLocaleDateString(
                            "fr-FR",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            }
                          )}
                        </p>
                      </div>
                      <div>
                        <button className="text-black p-2 rounded-lg bg-blue-500 hover:bg-blue-600 hover:text-white">
                          Voir les détails
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-64">
                <p className="text-red-500 text-xl font-medium">
                  Aucune information trouvée.
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center h-64">
            <p className="text-xl font-medium">
              Aucune inscription en attente pour le moment.
            </p>
          </div>
        )}
      </div>
    </SideBar>
  );
};

export default WaitClient;
