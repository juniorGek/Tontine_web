import React, { useEffect, useState } from "react";
import SideBar from "../global/SideBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Table from "../../../components/Table";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useWelcome } from "../../../hook/WelcomeContext";
import { API_ADMIN } from "../../../config/endPoint";

const User = ({ user }) => {
  const [filterType, setFilterType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [users, setUsers] = useState([]);

  const { welcomeMessage, setWelcomeMessage } = useWelcome();

  useEffect(() => {
    if (welcomeMessage) {
      toast.success(welcomeMessage);
      setWelcomeMessage(""); // Reset the welcome message
    }
  }, [welcomeMessage, setWelcomeMessage]);

  const fetchUsers = async () => {
    const token = localStorage.getItem("token"); // Remplacez 'your_token_here' par le token réel
    try {
      const response = await fetch(`${API_ADMIN}/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        // Recharger la page en cas d'erreur 401
        window.location.reload();
        return; // Arrête l'exécution de la fonction
      }

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      console.log(data.users);
      setUsers(Array.isArray(data.users) ? data.users : []);
    } catch (error) {
      toast.error("Erreur lors de la récupération des utilisateurs");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    console.log("Current users state:", users);
  }, [users]);

  const navigate = useNavigate();

  const handleAddUser = () => {
    navigate("/admin/addUser");
  };

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
      <SideBar user={user}>
        <div className="p-5 w-full">
          <h1 className="text-2xl font-semibold text-center mb-5">
            Liste des utilisateurs
          </h1>
          <div className="flex justify-between items-center mb-5 bg-gray-100 p-4 rounded-lg shadow-md">
            <div className="flex items-center">
              <label
                htmlFor="filterType"
                className="mr-2 text-gray-700 font-medium"
              >
                Filtrer par type :
              </label>
              <select
                id="filterType"
                value={filterType}
                onChange={handleFilterTypeChange}
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
              >
                <option value="" className="bg-white text-black">
                  Tous
                </option>
                <option value="Admin" className="bg-white text-black">
                  Admin
                </option>
                <option value="User" className="bg-white text-black">
                  User
                </option>
              </select>
            </div>
            <div className="flex items-center">
              <label
                htmlFor="filterStatus"
                className="mr-2 text-gray-700 font-medium"
              >
                Filtrer par statut :
              </label>
              <select
                id="filterStatus"
                value={filterStatus}
                onChange={handleFilterStatusChange}
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
              >
                <option value="" className="bg-white text-black">
                  Tous
                </option>
                <option value="active" className="bg-white text-black">
                  Active
                </option>
                <option value="inactive" className="bg-white text-black">
                  Inactive
                </option>
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
          <Table
            users={filteredUsers}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </div>
      </SideBar>
    </div>
  );
};

export default User;
