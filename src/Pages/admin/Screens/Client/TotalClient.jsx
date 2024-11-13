import React, { useState } from 'react'
import SideBar from '../../global/SideBar'
import QRCodeModal from '../../../../utils/ModalQr';

const clients = [
  { id: 1, nom: 'Dupont', prenom: 'Jean', email: 'jean.dupont@example.com', tel: '0123456789' },
  { id: 2, nom: 'Martin', prenom: 'Claire', email: 'claire.martin@example.com', tel: '0987654321' },
  { id: 3, nom: 'Bernard', prenom: 'Paul', email: 'paul.bernard@example.com', tel: '0147258369' },
  
  
];

const TotalClient = ({ user }) => {
  const [search, setSearch] = useState('');
  const [selectedClient, setSelectedClient] = useState(null);
  
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredClients = clients.filter(client =>
    client.nom.toLowerCase().includes(search.toLowerCase()) ||
    client.prenom.toLowerCase().includes(search.toLowerCase()) ||
    client.email.toLowerCase().includes(search.toLowerCase()) ||
    client.tel.includes(search)
  );

  const handleVoirPlus = (clientId) => {
    // Handle "Voir plus" click
    console.log(`Voir plus for client ID: ${clientId}`);
  };

  const handleAfficherCodeQR = (clientId) => {
    const client = clients.find(client => client.id === clientId);
    if (client) {
      setSelectedClient(client);
    }
  };

  const handleCloseModal = () => {
    setSelectedClient(null);
  };

  return (
    <SideBar user={user}>
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
            <div key={client.id} className="bg-white shadow-md rounded-lg p-3 flex justify-between items-center">
              <div>
                <p><strong>ID:</strong> {client.id}</p>
                <p><strong>Nom:</strong> {client.nom}</p>
                <p><strong>Prénom:</strong> {client.prenom}</p>
                <p><strong>Email:</strong> {client.email}</p>
                <p><strong>Téléphone:</strong> {client.tel}</p>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleVoirPlus(client.id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Voir plus
                </button>
                <button
                  onClick={() => handleAfficherCodeQR(client.id)}
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
          qrCodeData={selectedClient ? `Client ID: ${selectedClient.id}, Name: ${selectedClient.nom} ${selectedClient.prenom}` : ''}
        />
      </div>
    </SideBar>
  );
}

export default TotalClient;
