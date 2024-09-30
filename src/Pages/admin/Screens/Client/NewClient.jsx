import React, { useState } from "react";
import SideBar from "../../global/SideBar";
import StepOne from "../../../../components/StepOne";
import StepTwo from "../../../../components/StepTwo";
import StepThree from "../../../../components/StepTree";
import Modal from "../../../../components/ClientModal";
import { API_ADMIN } from "../../../../config/endPoint";
import { useWelcome } from "../../../../hook/WelcomeContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { resetForm } from "../../../../utils/formUtils";

const NewClient = ({ user }) => {
  const [step, setStep] = useState(1);
  const [compte, setCompte] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { setWelcomeMessage } = useWelcome();
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    tel: "",
    datNaiss: "",
    adresse: "",
    cni: "",
    genre: "",
    montant: "",
    agentId: "",
    typeCompte: "",
    note: "",
  });

  const [errors, setErrors] = useState({});

  const nextStep = () => {
    if (validateForm()) {
      if (step < 3) {
        setStep((prevStep) => prevStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const prevStep = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_ADMIN}/addClient`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setCompte(data.compte); // Affiche la réponse de l'API en cas de succès
        console.log(compte);
        setShowModal(true);
      } else {
        if (response.status === 401) {
          // Recharge la page en cas d'erreur 401
          window.location.reload();
        } else {
          const errorData = await response.json();
          console.error("Erreur lors de l'enregistrement:", errorData.message);
          toast.error(errorData.message);
          resetForm(setFormData, setStep);
        }
      }
    } catch (error) {
      console.error("Erreur lors de l'enregistrement:", error.message);
      toast.error(error.message);
      // Gérer les erreurs de fetch ou autres erreurs
    }
  };

  const handleCloseModal = () => {
    resetForm(setFormData, setStep);
    setShowModal(false);
  };

  const isValidAge = (date) => {
    const today = new Date();
    const birthDate = new Date(date);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      return age - 1 >= 15;
    }
    return age >= 15;
  };

  const validateForm = () => {
    let newErrors = {};

    if (step === 1) {
      if (!formData.nom) newErrors.nom = "Nom is required";
      if (!formData.genre) newErrors.genre = "genre is required";
      if (!formData.prenom) newErrors.prenom = "Prenom is required";
      if (!formData.email) newErrors.email = "Email is required";
      if (!formData.datNaiss) {
        newErrors.datNaiss = "Date de naissance is required";
      } else if (!isValidAge(formData.datNaiss)) {
        newErrors.datNaiss = "L'âge doit être supérieur ou égal à 15 ans";
      }
    }

    if (step === 2) {
      if (!formData.tel) newErrors.tel = "Telephone is required";
      if (!formData.adresse) newErrors.adresse = "Adresse is required";
      if (!formData.cni) newErrors.cni = "cni is required";
    }

    // Additional validation for steps 2 and 3 can be added here

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <StepOne
            formData={formData}
            setFormData={setFormData}
            errors={errors}
          />
        );
      case 2:
        return (
          <StepTwo
            formData={formData}
            setFormData={setFormData}
            errors={errors}
          />
        );
      case 3:
        return (
          <StepThree
            formData={formData}
            setFormData={setFormData}
            errors={errors}
          />
        );
      default:
        return (
          <StepOne
            formData={formData}
            setFormData={setFormData}
            errors={errors}
          />
        );
    }
  };

  return (
    <SideBar user={user}>
      <div className="p-8">
        <ToastContainer position="top-right" />
        <h2 className="text-2xl font-bold mb-4">Nouveau Client</h2>
        {renderStep()}
        <div className="flex justify-between mt-4">
          <button
            onClick={prevStep}
            className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
            disabled={step === 1}
          >
            Precedent
          </button>
          <button
            onClick={nextStep}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {step === 3 ? "Soumettre" : "Suivant"}
          </button>
        </div>
      </div>
      <Modal
        showModal={showModal}
        handleClose={handleCloseModal}
        formData={formData}
        compte={compte}
      />
    </SideBar>
  );
};

export default NewClient;
