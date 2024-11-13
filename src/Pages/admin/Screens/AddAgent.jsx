import React, { useState } from "react";
import SideBar from "../global/SideBar";
import Select from "react-select";
import zoneOptions from "../../../components/Zone";
import { API_ADMIN } from "../../../config/endPoint";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useWelcome } from "../../../hook/WelcomeContext";

const AddAgent = ({ user }) => {
  const [errors, setErrors] = useState({});
  const { setWelcomeMessage } = useWelcome();
  const [zoneOptions, setZoneOptions] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchZones = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('token', token);
        const response = await fetch(`${API_ADMIN}/listZone`, { method: "GET" });
        if (response.ok) {
          const zones = await response.json();
          console.log(zones);
        } else {
          console.error("Erreur lors de la récupération des zones");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des zones:", error);
      }
    };

    fetchZones();
  }, []);




  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: state.isFocused ? "2px solid #3182ce" : "1px solid #e2e8f0",
      borderRadius: "0.375rem",
      boxShadow: state.isFocused ? "0 0 0 3px rgba(49, 130, 206, 0.2)" : "none",
      "&:hover": {
        border: "2px solid #3182ce",
      },
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#edf2f7",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "#718096",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "#718096",
      ":hover": {
        backgroundColor: "#cbd5e0",
        color: "#718096",
      },
    }),
  };

  

  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    genre: "",
    email: "",
    telephone: "",
    adresse: "",
    identite: "",
    description: "",
    zone: [], // Ajout de zones dans l'état du formulaire
  });

  const handleChange = (e) => {
    const { id, value, type, name } = e.target;
    const field = type === "radio" ? name : id;
    setForm((prevForm) => ({
      ...prevForm,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(form).forEach((key) => {
      if (!form[key] && key !== "zone") {
        // Ignorer la validation des zones ici
        newErrors[key] = "Ce champ est requis";
      }
    });

    // Vérifiez si zones est vide
    if (form.zone.length === 0) {
      newErrors.zones = "Ce champ est requis";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      console.log(errors);
    } else {
      setErrors({});
      console.log(form);

      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_ADMIN}/agentRegister`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data); // Affiche la réponse de l'API en cas de succès
            // Réinitialiser le formulaire ou faire d'autres actions après l'enregistrement
            setWelcomeMessage("Utilisateur ajouté avec succès.");
            navigate("/admin/profile_agent");
        } else {
            if (response.status === 401) {
                // Recharge la page en cas d'erreur 401
                window.location.reload();
            } else {
                const errorData = await response.json();
                console.error("Erreur lors de l'enregistrement:", errorData.message);
                toast.error("Erreur lors de l'enregistrement");
                // Gérer les erreurs côté client si nécessaire
            }
        }
      } catch (error) {
        console.error("Erreur lors de l'enregistrement:", error.message);
        toast.error("Erreur lors de l'enregistrement");
        // Gérer les erreurs de fetch ou autres erreurs
      }
    }
  };

  const handleZoneChange = (selectedOptions) => {
    const zones = selectedOptions.map((option) => option.value);

    setForm((prevForm) => ({
      ...prevForm,
      zone: zones,
    }));

    console.log(zones);
  };

  return (
    <div>
      <SideBar user={user}>
        <ToastContainer position="top-right" />
        <div className="flex justify-center items-center mb-5 bg-gray-100 p-4 rounded-lg shadow-md">
          <form
            className="w-full max-w-4xl p-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex mb-4 space-x-4">
              <div className="w-1/2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="firstName"
                >
                  Prenom
                </label>
                <input
                  className={`shadow appearance-none border rounded-xl w-full py-5 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.prenom ? "border-red-500" : ""
                  }`}
                  id="prenom"
                  type="text"
                  placeholder="Prenom"
                  value={form.prenom}
                  onChange={handleChange}
                />
              </div>
              <div className="w-1/2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="lastName"
                >
                  Nom
                </label>
                <input
                  className={`shadow appearance-none border rounded-xl w-full py-5 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.nom ? "border-red-500" : ""
                  }`}
                  id="nom"
                  type="text"
                  placeholder="Nom"
                  value={form.nom}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex mb-4 items-center space-x-4">
              <span className="block text-gray-700 text-sm font-bold mb-2">
                Genre:
              </span>
              <label className="inline-flex items-center">
                <input
                  className={`form-radio h-5 w-5 text-blue-600 ${
                    errors.genre ? "border-red-500" : ""
                  }`}
                  type="radio"
                  name="genre"
                  value="masculin"
                  checked={form.genre === "masculin"}
                  onChange={handleChange}
                />
                <span className="ml-2">Masculin</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  className={`form-radio h-5 w-5 text-blue-600 ${
                    errors.genre ? "border-red-500" : ""
                  }`}
                  type="radio"
                  name="genre"
                  value="feminin"
                  checked={form.genre === "feminin"}
                  onChange={handleChange}
                />
                <span className="ml-2">Feminin</span>
              </label>
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className={`shadow appearance-none border rounded-xl w-full py-5 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.email ? "border-red-500" : ""
                }`}
                id="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="flex mb-4 space-x-4">
              <div className="w-1/2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="phone"
                >
                  Numero
                </label>
                <input
                  className={`shadow appearance-none border rounded-xl w-full py-5 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.telephone ? "border-red-500" : ""
                  }`}
                  id="telephone"
                  type="tel"
                  placeholder="Phone Number"
                  value={form.telephone}
                  onChange={handleChange}
                />
              </div>
              <div className="w-1/2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="address"
                >
                  Address
                </label>
                <input
                  className={`shadow appearance-none border rounded-xl w-full py-5 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.adresse ? "border-red-500" : ""
                  }`}
                  id="adresse"
                  type="text"
                  placeholder="Address"
                  value={form.adresse}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="identityNumber"
              >
                Numero de CNI
              </label>
              <input
                className={`shadow appearance-none border rounded-xl w-full py-5 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.identite ? "border-red-500" : ""
                }`}
                id="identite"
                type="text"
                placeholder="Numero d'identite"
                value={form.identite}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="zones"
              >
                Zone Géographique
              </label>
              <Select
                isMulti
                isSearchable
                name="zone"
                options={zoneOptions}
                styles={customStyles}
                className={`shadow appearance-none border rounded-xl w-full py-5 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.zone ? "border-red-500" : ""
                }`}
                onChange={handleZoneChange}
                value={form.zone.map((zone) => ({ value: zone, label: zone }))}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                className={`shadow appearance-none border rounded-xl w-full py-5 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.description ? "border-red-500" : ""
                }`}
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
                Ajouter Agent
              </button>
            </div>
          </form>
        </div>
      </SideBar>
    </div>
  );
};

export default AddAgent;
