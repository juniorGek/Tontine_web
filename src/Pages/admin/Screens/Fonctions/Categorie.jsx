import React, { useState } from 'react';
import SideBar from '../../global/SideBar';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';

function Categorie({ user }) {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Technologie', description: 'Catégorie dédiée à la technologie', status: true },
    { id: 2, name: 'Cuisine', description: 'Catégorie dédiée à la cuisine', status: false },
    { id: 3, name: 'Art', description: 'Catégorie dédiée à l’art', status: true },
    { id: 4, name: 'Cuisine', description: 'Catégorie dédiée à la cuisine', status: false },
    { id: 5, name: 'Art', description: 'Catégorie dédiée à l’art', status: true },
    { id: 6, name: 'Cuisine', description: 'Catégorie dédiée à la cuisine', status: false },
    { id: 7, name: 'Art', description: 'Catégorie dédiée à l’art', status: true },
    { id: 8, name: 'Cuisine', description: 'Catégorie dédiée à la cuisine', status: false },
    { id: 9, name: 'Art', description: 'Catégorie dédiée à l’art', status: true },
    { id: 10, name: 'Art', description: 'Catégorie dédiée à l’art', status: true },
    { id: 11, name: 'Cuisine', description: 'Catégorie dédiée à la cuisine', status: false },
    { id: 12, name: 'Art', description: 'Catégorie dédiée à l’art', status: true },
    { id: 13, name: 'Art', description: 'Catégorie dédiée à l’art', status: true },
    { id: 14, name: 'Cuisine', description: 'Catégorie dédiée à la cuisine', status: false },
    { id: 15, name: 'Art', description: 'Catégorie dédiée à l’art', status: true },
    // Ajoutez plus de catégories pour tester la pagination
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;

  // Fonction pour basculer le statut
  const toggleStatus = (id) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === id ? { ...category, status: !category.status } : category
      )
    );
  };

  // Filtrage et recherche des catégories
  const filteredCategories = categories.filter((category) => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === 'all' ||
      (filterStatus === 'active' && category.status) ||
      (filterStatus === 'inactive' && !category.status);
    return matchesSearch && matchesStatus;
  });

  // Calcul des catégories à afficher pour la page actuelle
  const currentCategories = filteredCategories.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  // Fonction de changement de page
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <>
      <SideBar user={user}>
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">Catégories</h1>

          {/* Barre de recherche */}
          <input
            type="text"
            placeholder="Rechercher une catégorie..."
            className="mb-4 p-2 border border-gray-300 rounded-lg w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Filtre de statut */}
          <select
            className="mb-4 p-2 border border-gray-300 rounded-lg w-full"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">Toutes</option>
            <option value="active">Actives</option>
            <option value="inactive">Inactives</option>
          </select>

          {/* Tableau des catégories */}
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">ID</th>
                  <th scope="col" className="px-6 py-3">Nom</th>
                  <th scope="col" className="px-6 py-3">Description</th>
                  <th scope="col" className="px-6 py-3">Statut</th>
                  <th scope="col" className="px-6 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentCategories.map((category) => (
                  <tr key={category.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{category.id}</td>
                    <td className="px-6 py-4">{category.name}</td>
                    <td className="px-6 py-4">{category.description}</td>
                    <td className="px-6 py-4">
                      <div
                        onClick={() => toggleStatus(category.id)}
                        className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer transition-colors ${
                          category.status ? 'bg-green-500' : 'bg-gray-400'
                        }`}
                      >
                        <div
                          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                            category.status ? 'translate-x-6' : 'translate-x-0'
                          }`}
                        ></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="text-blue-500 hover:text-blue-700 mx-2">
                        <FaEdit className="inline h-5 w-5" aria-hidden="true" />
                      </button>
                      <button className="text-red-500 hover:text-red-700 mx-2">
                        <FaTrashAlt className="inline h-5 w-5" aria-hidden="true" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-4">
            <ReactPaginate
              previousLabel={'← Précédent'}
              nextLabel={'Suivant →'}
              pageCount={Math.ceil(filteredCategories.length / itemsPerPage)}
              onPageChange={handlePageChange}
              containerClassName={'pagination flex space-x-2'}
              pageClassName={'px-3 py-1 border rounded-md cursor-pointer'}
              activeClassName={'bg-blue-500 text-white'}
              previousClassName={'px-3 py-1 border rounded-md cursor-pointer'}
              nextClassName={'px-3 py-1 border rounded-md cursor-pointer'}
              disabledClassName={'opacity-50 cursor-not-allowed'}
            />
          </div>
        </div>
      </SideBar>
    </>
  );
}

export default Categorie;
