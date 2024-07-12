import React, { useState } from "react";
import SideBar from "../global/SideBar";
import { API_ADMIN } from "../../../config/endPoint";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useWelcome } from "../../../hook/WelcomeContext";
import { useNavigate } from "react-router-dom";

const AddUser = ({user}) => {
    const { setWelcomeMessage } = useWelcome();
    const navigate =useNavigate()
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    phone: "",
    address: "",
    userType: "",
    identityNumber: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value, type, name } = e.target;
    const field = type === "radio" ? name : id;
    setForm((prevForm) => ({
      ...prevForm,
      [field]: value,
    }));
  };

  const handleSubmit = async() => {
    const newErrors = {};
    Object.keys(form).forEach((key) => {
      if (!form[key]) {
        newErrors[key] = "This field is required";
      }
    });

    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
      } else {
        setErrors({});
        try {
            const token = localStorage.getItem("token"); // Supposons que le jeton est stocké dans localStorage
    
            const response = await axios.post(
              `${API_ADMIN}/register`,
              {
                nom: form.lastName,
                prenom: form.firstName,
                email: form.email,
                telephone: form.phone,
                adresse: form.address,
                genre: form.gender,
                description: form.description,
                identite: form.identityNumber,
                typeUser: form.userType,
                enabled: true, // ou false selon vos besoins
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
    
            console.log("Form submitted", response.data);
            setWelcomeMessage("Utilisateur ajouter avec succes.");
            navigate("/admin/user");
          } catch (error) {
            console.error("Error submitting form", error.message);
            if (error.response && error.response.status === 401) {
            // Si l'erreur est 401, supprimer le token et recharger la page
            localStorage.removeItem("token");
            window.location.reload();
            } else {
            toast.error("Erreur lors de l'enregistrement");
            }
          }
      }
  };

  return (
    <div>
      <SideBar user={user} >
        <ToastContainer position="top-right" />
          <div className="flex justify-center items-center mb-5 bg-gray-100 p-4 rounded-lg shadow-md">
            <form className="w-full max-w-4xl p-4" onSubmit={(e) => e.preventDefault()}>

              <div className="flex mb-4 space-x-4">
                <div className="w-1/2">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                    First Name
                  </label>
                  <input
                    className={`shadow appearance-none border rounded-xl w-full py-5 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.firstName ? 'border-red-500' : ''}`}
                    id="firstName"
                    type="text"
                    placeholder="Prenom"
                    value={form.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                    Last Name
                  </label>
                  <input
                    className={`shadow appearance-none border rounded-xl w-full py-5 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.lastName ? 'border-red-500' : ''}`}
                    id="lastName"
                    type="text"
                    placeholder="Nom"
                    value={form.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex mb-4 items-center space-x-4">
                <span className="block text-gray-700 text-sm font-bold mb-2">Genre:</span>
                <label className="inline-flex items-center">
                  <input
                    className={`form-radio h-5 w-5 text-blue-600 ${errors.gender ? 'border-red-500' : ''}`}
                    type="radio"
                    name="gender"
                    value="masculin"
                    checked={form.gender === "masculin"}
                    onChange={handleChange}
                  />
                  <span className="ml-2">Masculin</span>
                </label>
                <label className="inline-flex items-center ml-6">
                  <input
                    className={`form-radio h-5 w-5 text-blue-600 ${errors.gender ? 'border-red-500' : ''}`}
                    type="radio"
                    name="gender"
                    value="feminin"
                    checked={form.gender === "feminin"}
                    onChange={handleChange}
                  />
                  <span className="ml-2">Feminin</span>
                </label>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  className={`shadow appearance-none border rounded-xl w-full py-5 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''}`}
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <div className="flex mb-4 space-x-4">
                <div className="w-1/2">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                    Phone Number
                  </label>
                  <input
                    className={`shadow appearance-none border rounded-xl w-full py-5 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.phone ? 'border-red-500' : ''}`}
                    id="phone"
                    type="tel"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                    Address
                  </label>
                  <input
                    className={`shadow appearance-none border rounded-xl w-full py-5 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.address ? 'border-red-500' : ''}`}
                    id="address"
                    type="text"
                    placeholder="Address"
                    value={form.address}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userType">
                  User Type
                </label>
                <select
                  className={`shadow appearance-none border rounded-xl w-full py-5 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.userType ? 'border-red-500' : ''}`}
                  id="userType"
                  value={form.userType}
                  onChange={handleChange}
                >
                  <option value="">Select Type</option>
                  <option value="admin">Admin</option>
                  <option value="editor">Editor</option>
                  <option value="viewer">Viewer</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="identityNumber">
                  Identity Number
                </label>
                <input
                  className={`shadow appearance-none border rounded-xl w-full py-5 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.identityNumber ? 'border-red-500' : ''}`}
                  id="identityNumber"
                  type="text"
                  placeholder="Identity Number"
                  value={form.identityNumber}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                  Description
                </label>
                <textarea
                  className={`shadow appearance-none border rounded-xl w-full py-5 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.description ? 'border-red-500' : ''}`}
                  id="description"
                  placeholder="Description"
                  rows="4"
                  value={form.description}
                  onChange={handleChange}
                />
              </div>

              <div className="flex max-w-4xl">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white w-full font-bold py-4 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={handleSubmit}
                >
                  Add User
                </button>
              </div>

            </form>
          </div>
       
      </SideBar>
    </div>
  );
};

export default AddUser;
