import React, { useState } from "react";
import SideBar from "../../global/SideBar";
import StepOne from "../../../../components/StepOne";
import StepTwo from "../../../../components/StepTwo";
import StepThree from "../../../../components/StepTree";
import Modal from "../../../../components/ClientModal";

const NewClient = ({ user }) => {
  const agents = [
    { id: '1', name: 'Agent 1' },
    { id: '2', name: 'Agent 2' },
    { id: '3', name: 'Agent 3' }
  ];
  const compte = [
    { id: 'Tontine', name: 'Tontine' },
    { id: 'Access', name: 'Access' },
    { id: 'Global', name: 'Global' }
  ];

  const [step, setStep] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    tel: '',
    adresse: '',
    cni:'',
    montant: '',
    agentId: '',
    compte: '',
    note: '',
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

  const handleSubmit = () => {
    console.log(formData)
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const validateForm = () => {
    let newErrors = {};

    if (step === 1) {
      if (!formData.nom) newErrors.nom = "Nom is required";
      if (!formData.prenom) newErrors.prenom = "Prenom is required";
      if (!formData.email) newErrors.email = "Email is required";
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
        return <StepOne formData={formData} setFormData={setFormData} errors={errors} />;
      case 2:
        return <StepTwo formData={formData} setFormData={setFormData} errors={errors} />;
      case 3:
        return <StepThree formData={formData} setFormData={setFormData}  errors={errors} />;
      default:
        return <StepOne formData={formData} setFormData={setFormData} errors={errors} />;
    }
    
  };

  return (
    <SideBar user={user}>
      <div className="p-8">
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
      <Modal showModal={showModal} handleClose={handleCloseModal} formData={formData} />
    </SideBar>
  );
};

export default NewClient;
