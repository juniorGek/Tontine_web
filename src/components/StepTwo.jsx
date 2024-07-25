import React from "react";

const StepTwo = ({ formData, setFormData, errors }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-2">Etape 2: Information Supplementaire</h3>
      <form>
        <label className="block text-lg mb-2">
          Telephone:
          <input
            type="tel"
            name="tel"
            value={formData.tel}
            onChange={handleChange}
            pattern="\d*"
            className={`w-full px-3 py-3 border rounded focus:border-blue-500 focus:border-2 focus:outline-none ${
              errors.tel ? "border-red-500" : ""
            }`}
          />
        </label>
        <label className="block text-lg mb-2">
          Adresse:
          <input
            type="text"
            name="adresse"
            value={formData.adresse}
            onChange={handleChange}
            className={`w-full px-3 py-3 border rounded focus:border-blue-500 focus:border-2 focus:outline-none ${
              errors.adresse ? "border-red-500" : ""
            }`}
          />
        </label>
        <label className="block text-lg mb-2">
          CNI:
          <input
            type="text"
            name="cni"
            value={formData.cni}
            onChange={handleChange}
            className={`w-full px-3 py-3 border rounded focus:border-blue-500 focus:border-2 focus:outline-none ${
              errors.cni ? "border-red-500" : ""
            }`}
          />
        </label>
      </form>
    </div>
  );
};

export default StepTwo;
