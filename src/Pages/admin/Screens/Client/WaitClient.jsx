import React, { useState } from 'react';
import SideBar from '../../global/SideBar';
import { useNavigate } from 'react-router-dom';

const WaitClient = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const pendingClients = [
    { id: 1, name: 'Jean Dupont', email: 'jean.dupont@example.com' },
    { id: 2, name: 'Marie Curie', email: 'marie.curie@example.com' },
    { id: 3, name: 'Albert Einstein', email: 'albert.einstein@example.com' },
  ];

  const handleClientClick = (client) => {
    navigate(`/admin/detailClient/${client.id}`);
  };

  const filteredClients = pendingClients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SideBar user={user}>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Inscriptions en attente</h2>
        {pendingClients.length > 0 ? (
          <>
            <input
              type="text"
              placeholder="Rechercher un client..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-4 p-4 border border-gray-300 rounded-lg w-72"
            />
            {filteredClients.length > 0 ? (
              <ul className="space-y-4">
                {filteredClients.map((client) => (
                  <li
                    key={client.id}
                    className="bg-white p-7 rounded-lg shadow cursor-pointer hover:bg-blue-100"
                    onClick={() => handleClientClick(client)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-lg">{client.name}</p>
                        <p className="text-sm text-gray-500">{client.email}</p>
                      </div>
                      <div>
                        <button className="text-black p-3 rounded-lg bg-blue-500 hover:bg-blue-600 hover:text-white">
                          Voir les détails
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex items-center justify-center h-64">
                <p className="text-red-500 text-xl font-medium">Aucune information trouvée.</p>
              </div>
            )}
          </>
        ) : (
              <div className="flex items-center justify-center h-64">
                <p className="text-xl font-medium">Aucune inscription en attente pour le moment.</p>
              </div>
        )}
      </div>
    </SideBar>
  );
};

export default WaitClient;
