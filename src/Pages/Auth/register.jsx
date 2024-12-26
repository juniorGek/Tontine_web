import  { useState } from 'react'
import Header from '../../components/header'
import Step1 from '../../components/Register/Step1';
import Step2 from '../../components/Register/Step2';
import Step3 from '../../components/Register/Step3';
import Step4 from '../../components/Register/Step4';
import StepIndicator from '../../components/Register/StepIndicator';
import { API_ADMIN } from '../../config/endPoint';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    datNaiss:"",
    tel: "",
    adresse: "",
    cni: "",
    genre: "",
    montant: "",
    typeCompte: "",
    note: "",
  });
  const [errors, setErrors] = useState({});

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

  const validateStep = () => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.nom) newErrors.nom = true;
      if (!formData.prenom) newErrors.prenom = true;
      if (!formData.genre) newErrors.genre = true;
      if (!formData.datNaiss) {
        newErrors.datNaiss = true;
      } else if (!isValidAge(formData.datNaiss)) {
        newErrors.datNaiss = "L'âge doit être supérieur ou égal à 15 ans";
      }
    } else if (step === 2) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^[0-9]+$/;

      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Invalid email format';
      }
      if (!formData.adresse) newErrors.adresse = true;

       if (!formData.tel) {
        newErrors.tel = 'Phone number is required';
      } else if (!phoneRegex.test(formData.tel)) {
        newErrors.tel = 'Phone number must contain only digits';
      }
    } else if (step === 3) {
      if (!formData.cni) newErrors.cni = true;
      if (!formData.montant) newErrors.montant = true;
    } else if (step === 4) {
      if (!formData.typeCompte) newErrors.typeCompte = true;
      // Note is optional, so no need to validate it
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const prevStep = () => setStep(step - 1);

  const handleSubmit = async() => {
    if (validateStep()) {
      console.log(formData)
      try {
        const response = await fetch(`${API_ADMIN}/registerClient`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          navigate('/after')
        } else {
          
            const errorData = await response.json();
            console.error("Erreur lors de l'enregistrement:", errorData.message);
            toast.error(`Error: ${errorData.message}`);

        }
      } catch (error) {
        console.error("Erreur lors de l'enregistrement:", error.message);
        toast.error("Erreur lors de l'enregistrement");
        
      }
    }
  };

  return (
    <>
      <Header />
      <ToastContainer position="top-right" />
      <div className="max-w-2xl mx-auto bg-white p-8 shadow-lg rounded-lg mt-8">
        <StepIndicator step={step} />
        {step === 1 && (
          <Step1 formData={formData} setFormData={setFormData} nextStep={nextStep} errors={errors} />
        )}
        {step === 2 && (
          <Step2 formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} errors={errors} />
        )}
        {step === 3 && (
          <Step3 formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} errors={errors} />
        )}
        {step === 4 && (
          <Step4 formData={formData} setFormData={setFormData} prevStep={prevStep} handleSubmit={handleSubmit} errors={errors} />
        )}
      </div>
    </>
  );
};

export default Register;