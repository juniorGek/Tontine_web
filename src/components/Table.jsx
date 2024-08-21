import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import ReactPaginate from 'react-paginate';
import { Button, Modal } from "flowbite-react";

const Table = ({ users, onDelete, onEdit }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const itemsPerPage = 10;

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const offset = currentPage * itemsPerPage;
    const currentPageData = users.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(users.length / itemsPerPage);


    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                <tr className="bg-gray-200 text-gray-700">
                    <th className="py-2 px-4 border border-gray-300">Nom</th>
                    <th className="py-2 px-4 border border-gray-300">Email</th>
                    <th className="py-2 px-4 border border-gray-300">Type</th>
                    <th className="py-2 px-4 border border-gray-300">Statut</th>
                    <th className="py-2 px-4 border border-gray-300">Actions</th>
                </tr>
                </thead>
                <tbody>
                {currentPageData.map(user => (
                    <tr key={user._id} className="text-gray-700 hover:bg-gray-100">
                    <td className="py-2 px-4 border border-gray-300">{user.nom}</td>
                    <td className="py-2 px-4 border border-gray-300">{user.email}</td>
                    <td className="py-2 px-4 border border-gray-300">{user.typeUser}</td>
                    <td className="py-2 px-4 border border-gray-300">
                        <span className={`px-2 py-1 rounded-full text-white ${user.status ? 'bg-green-500' : 'bg-red-500'}`}>
                        {user.status ? 'Active' : 'Inactive'}
                        </span>
                    </td>
                    <td className="py-2 px-4 border border-gray-300">
                        <button onClick={() => onEdit(user._id)} className="text-blue-500 hover:text-blue-700 mx-2">
                        <FaEdit />
                        </button>
                        
                        <button onClick={() => setOpenModal(true)} className="text-red-500 hover:text-red-700 mx-2">
                            <FaTrashAlt />
                        </button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <ReactPaginate
                previousLabel={"← Précédent"}
                nextLabel={"Suivant →"}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={"flex justify-center my-4"}
                pageClassName={"mx-1"}
                pageLinkClassName={"px-3 py-2 border rounded"}
                previousLinkClassName={"px-3 py-2 border rounded"}
                nextLinkClassName={"px-3 py-2 border rounded"}
                activeClassName={"bg-blue-500 text-white"}
            />

            <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                <Modal.Header />
                <Modal.Body>
                <div className="text-center">
                    <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Ete vous sur de vouloir supprimer ?
                    </h3>
                    <div className="flex justify-center gap-4">
                    <Button color="failure" onClick={() => setOpenModal(false)}>
                        Oui je suis sur
                    </Button>
                    <Button color="gray" onClick={() => setOpenModal(false)}>
                        Non
                    </Button>
                    </div>
                </div>
                </Modal.Body>
            </Modal>
        </div>
    );
  };
  
  export default Table;