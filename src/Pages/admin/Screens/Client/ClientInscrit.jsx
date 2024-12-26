import { useEffect, useState } from 'react'
import SideBar from '../../global/SideBar'
import QRCodeModal from '../../../../utils/ModalQr';
import { API_ADMIN } from '../../../../config/endPoint';
import LoadingModal from '../../../../utils/Loading';
import { useNavigate } from 'react-router-dom';



const TotalClient = ({ user }) => {
  const [search, setSearch] = useState('');
  const [selectedClient, setSelectedClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [client, setClient] = useState([]);
  const navigate = useNavigate();
  
  const fetchListeClient = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_ADMIN}/client/listeInscrit`, {
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
      setClient(data.listeClientsInscrits)
    } catch (error) {
      console.error("Erreur lors de la récupération de la liste des clients", error.message);
      
    }finally{
      /* setTimeout(() => setLoading(false), 3000); */
      setLoading(false)
      
    }
   
  }

  useEffect(() => {
    fetchListeClient();
  }, []);



  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredClients = client.filter(client =>
    client.nom.toLowerCase().includes(search.toLowerCase()) ||
    client.prenom.toLowerCase().includes(search.toLowerCase()) ||
    client.email.toLowerCase().includes(search.toLowerCase()) ||
    client.tel.includes(search)
  );

  const handleVoirPlus = (clientId) => {
    // Handle "Voir plus" click
    console.log(`Voir plus for client ID: ${clientId}`);
    navigate(`/admin/detailClientInscrit/${clientId}`);
  };

  const handleAfficherCodeQR = (clientId) => {
    const selectClient = client.find(client => client._id === clientId);
    if (client) {
      setSelectedClient(selectClient);
    }
  };

  const handleCloseModal = () => {
    setSelectedClient(null);
  };

  return (
    <SideBar user={user}>
       {loading ? (
        <>  
          <LoadingModal isOpen={loading} />
        </>
       ):(
        <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Liste des Clients</h1>
        
        <input
          type="text"
          placeholder="Rechercher..."
          value={search}
          onChange={handleSearch}
          className="mb-4 p-2 border border-gray-300 rounded-lg w-full"
        />

        <div className="space-y-4">
          {filteredClients.map(client => (
            <div key={client._id} className="bg-white shadow-md rounded-lg p-3 flex justify-between items-center">
              <div>
                <p><strong>Nom:</strong> {client.nom}</p>
                <p><strong>Prénom:</strong> {client.prenom}</p>
                <p><strong>Email:</strong> {client.email}</p>
                <p><strong>Téléphone:</strong> {client.tel}</p>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleVoirPlus(client._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Voir plus
                </button>
                <button
                  onClick={() => handleAfficherCodeQR(client._id)}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                  Afficher le code QR
                </button>
              </div>
            </div>
          ))}
        </div>
        <QRCodeModal
          isOpen={!!selectedClient}
          onClose={handleCloseModal}
          qrCodeData={selectedClient ? `Client ID: ${selectedClient._id}, Name: ${selectedClient.nom} ${selectedClient.prenom}` : ''}
        />
      </div>
       )}
    </SideBar>
  );
}

export default TotalClient;
