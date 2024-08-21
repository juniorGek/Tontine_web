import React, { useState } from 'react';
import SideBar from '../../global/SideBar';
import Modal from '../../../../utils/CompteModal';


const FonctionList = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <SideBar user={user}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          <div 
            className="bg-white shadow-md rounded-lg p-10 cursor-pointer hover:bg-blue-100 hover:shadow-lg"
            onClick={openModal}
          >
            <h3 className="text-lg font-bold">Categorie Compte</h3>
            <p>Ajoutez d'autres Categories de compte</p>
          </div>
          <div 
            className="bg-white shadow-md rounded-lg p-10 cursor-pointer hover:bg-blue-100 hover:shadow-lg"
            onClick={openModal}
          >
            <h3 className="text-lg font-bold">Card 2</h3>
            <p>Details about Card 2</p>
          </div>
          <div 
            className="bg-white shadow-md rounded-lg p-10 cursor-pointer hover:bg-blue-100 hover:shadow-lg"
            onClick={openModal}
          >
            <h3 className="text-lg font-bold">Card 3</h3>
            <p>Details about Card 3</p>
          </div>
        </div>

        {/* Modal Usage */}
        <Modal isOpen={isModalOpen} closeModal={closeModal}>
          <h2 className="text-2xl font-bold mb-4">Fill in the Form</h2>
            <button 
                type="button"
                className="bg-blue-200 text-black p-2 rounded-lg mb-2 mr-4"
                onClick={()=>console.log('voir categorie compte')}
            >
                Voir Categorie
            </button>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name
              </label>
              <input 
                type="text" 
                className="w-full p-2 border border-gray-300 rounded"
              />
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
    </>
  );
}

export default FonctionList;
