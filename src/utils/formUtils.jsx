// utils/formUtils.js

export const resetForm = (setFormData, setStep) => {
    setFormData({
      nom: "",
      prenom: "",
      email: "",
      tel: "",
      adresse: "",
      cni: "",
      genre: "",
      montant: "",
      agentId: "",
      typeCompte: "",
      note: "",
    });
    setStep(1);
  };
  