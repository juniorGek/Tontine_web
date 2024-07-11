import React, { useState } from "react";
import Header from "../../components/header";

const Register = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for form submission
    console.log("Form data submitted:", formData);
  };

  const renderStepIndicator = () => {
    return (
      <div className="flex justify-between mb-8">
        {[1, 2, 3].map((currentStep) => (
          <div
            key={currentStep}
            className={`flex-1 h-2 mx-2 rounded-full ${
              step >= currentStep ? "bg-blue-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
          {renderStepIndicator()}
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div>
                <div className="mb-4">
                  <label className="block text-gray-700" htmlFor="username">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                </div>
              </div>
            )}
            {step === 2 && (
              <div>
                <div className="mb-4">
                  <label className="block text-gray-700" htmlFor="firstName">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700" htmlFor="lastName">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700" htmlFor="phoneNumber">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                </div>
              </div>
            )}
            {step === 3 && (
              <div>
                <div className="mb-4">
                  <label className="block text-gray-700" htmlFor="password">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700"
                    htmlFor="confirmPassword"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                </div>
              </div>
            )}
            <div className="flex justify-between mt-6">
              {step > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-700"
                >
                  Précédent
                </button>
              )}
              {step < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 ml-auto"
                >
                  Suivant
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700 ml-auto"
                >
                  Soumettre
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
    
  );
};

export default Register;
