import React from "react";

const StepOne = ({ formData, setFormData, errors }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "datNaiss") {
      setFormData({ ...formData, [name]: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Fonction pour formater la date au format yyyy-MM-dd
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (`0${d.getMonth() + 1}`).slice(-2);
    const day = (`0${d.getDate()}`).slice(-2);
    return `${year}-${month}-${day}`;
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-2">Etape 1: Basic Information</h3>
      <form>
        <label className="block text-lg mb-2">
          Nom:
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            className={`w-full px-3 py-3 border rounded focus:border-blue-500 focus:border-2 focus:outline-none ${
              errors.nom ? "border-red-500" : ""
            }`}
          />
        </label>
        <label className="block text-lg mb-2">
          Prenom:
          <input
            type="text"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            className={`w-full px-3 py-3 border rounded focus:border-blue-500 focus:border-2 focus:outline-none ${
              errors.prenom ? "border-red-500" : ""
            }`}
          />
        </label>
        <label className="block text-lg mb-2">
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-3 py-3 border rounded focus:border-blue-500 focus:border-2 focus:outline-none ${
              errors.email ? "border-red-500" : ""
            }`}
          />
        </label>
        <label className="block text-lg mb-2">
          Date de naissance:
          <input
            type="date"
            name="datNaiss"
            value={formData.datNaiss ? formatDate(formData.datNaiss) : ""}
            onChange={handleChange}
            className={`w-full px-3 py-3 border rounded focus:border-blue-500 focus:border-2 focus:outline-none ${
              errors.datNaiss ? "border-red-500" : ""
            }`}
          />
          {errors.datNaiss && <p className="text-red-500 text-lg font-medium mt-1">{errors.datNaiss}</p>}
        </label>
        <div className="block text-lg mb-2">
          Genre:
          <div className="flex items-center space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="genre"
                value="masculin"
                checked={formData.genre === "masculin"}
                onChange={handleChange}
                className={`form-radio h-6 w-6 ${
                  errors.genre ? "text-red-500" : "text-blue-500"
                }`}
              />
              <span className="ml-2">Masculin</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="genre"
                value="feminin"
                checked={formData.genre === "feminin"}
                onChange={handleChange}
                className={`form-radio h-6 w-6 ${
                  errors.genre ? "text-red-500" : "text-blue-500"
                }`}
              />
              <span className="ml-2">Feminin</span>
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default StepOne;
