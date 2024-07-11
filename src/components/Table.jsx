import { useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import ReactPaginate from 'react-paginate';

const Table = ({ users, onDelete, onEdit }) => {
    const [currentPage, setCurrentPage] = useState(0);
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
                    <tr key={user.id} className="text-gray-700 hover:bg-gray-100">
                    <td className="py-2 px-4 border border-gray-300">{user.name}</td>
                    <td className="py-2 px-4 border border-gray-300">{user.email}</td>
                    <td className="py-2 px-4 border border-gray-300">{user.type}</td>
                    <td className="py-2 px-4 border border-gray-300">
                        <span className={`px-2 py-1 rounded-full text-white ${user.status ? 'bg-green-500' : 'bg-red-500'}`}>
                        {user.status ? 'Active' : 'Inactive'}
                        </span>
                    </td>
                    <td className="py-2 px-4 border border-gray-300">
                        <button onClick={() => onEdit(user.id)} className="text-blue-500 hover:text-blue-700 mx-2">
                        <FaEdit />
                        </button>
                        <button onClick={() => onDelete(user.id)} className="text-red-500 hover:text-red-700 mx-2">
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
        </div>
    );
  };
  
  export default Table;