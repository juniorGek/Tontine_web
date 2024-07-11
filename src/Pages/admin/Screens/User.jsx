import React, { useEffect, useState } from "react";
import SideBar from "../global/SideBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Table from "../../../components/Table";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useWelcome } from "../../../hook/WelcomeContext";


const User = ({ user }) => {
  const [filterType, setFilterType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const { welcomeMessage, setWelcomeMessage } = useWelcome();

  useEffect(() => {
    if (welcomeMessage) {
      toast.success(welcomeMessage);
      setWelcomeMessage(''); // Reset the welcome message
    }
  }, [welcomeMessage, setWelcomeMessage]);



  const navigate =useNavigate()

  const handleAddUser= () =>{
    navigate('/admin/addUser')
  }

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      type: "Admin",
      status: true,
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      type: "User",
      status: false,
    },
    {
      id: 3,
      name: "Sam Green",
      email: "sam.green@example.com",
      type: "User",
      status: true,
    },
    {
      id: 4,
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      type: "User",
      status: false,
    },
    {
      id: 5,
      name: "Bob Brown",
      email: "bob.brown@example.com",
      type: "Admin",
      status: true,
    },
  ]);

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
    toast.info("Utilisateur supprimé");
  };

  const handleEdit = (id) => {
    toast.info(`Modifier l'utilisateur avec l'ID: ${id}`);
    // Logic for editing user goes here
  };

  const handleFilterTypeChange = (event) => {
    setFilterType(event.target.value);
  };

  const handleFilterStatusChange = (event) => {
    setFilterStatus(event.target.value);
  };

  const filteredUsers = users.filter((user) => {
    return (
      (filterType ? user.type === filterType : true) &&
      (filterStatus
        ? filterStatus === "active"
          ? user.status
          : !user.status
        : true)
    );
  });

  return (
    <div>
      <ToastContainer position="top-right" />
      <SideBar user={user} >
        <div className="p-5 w-full">
          <h1 className='text-2xl font-semibold text-center mb-5'>Liste des utilisateurs</h1>
          <div className="flex justify-between items-center mb-5 bg-gray-100 p-4 rounded-lg shadow-md">
            <div className="flex items-center">
              <label htmlFor="filterType" className="mr-2 text-gray-700 font-medium">Filtrer par type :</label>
              <select
                id="filterType"
                value={filterType}
                onChange={handleFilterTypeChange}
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
              >
                <option value="" className="bg-white text-black">Tous</option>
                <option value="Admin" className="bg-white text-black">Admin</option>
                <option value="User" className="bg-white text-black">User</option>
              </select>
            </div>
            <div className="flex items-center">
              <label htmlFor="filterStatus" className="mr-2 text-gray-700 font-medium">Filtrer par statut :</label>
              <select
                id="filterStatus"
                value={filterStatus}
                onChange={handleFilterStatusChange}
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
              >
                <option value="" className="bg-white text-black">Tous</option>
                <option value="active" className="bg-white text-black">Active</option>
                <option value="inactive" className="bg-white text-black">Inactive</option>
              </select>
            </div>
            <button
              className="flex items-center px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 transition duration-300 ease-in-out"
              onClick={handleAddUser}
            >
              <AiOutlinePlus className="mr-2" />
              Ajouter utilisateur
            </button>
          </div>
          <Table users={filteredUsers} onDelete={handleDelete} onEdit={handleEdit} />
        </div>
      </SideBar>
    </div>
  );
};

export default User;
