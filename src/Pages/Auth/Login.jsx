import  { useState } from "react";
import axios from "axios";
import { API_ADMIN } from "../../config/endPoint";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useWelcome } from "../../hook/WelcomeContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setWelcomeMessage } = useWelcome();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche la soumission par défaut du formulaire
    setLoading(true);

    try {
      const response = await axios.post(`${API_ADMIN}/login`, {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      setWelcomeMessage("Bienvenue ! Vous êtes connecté.");
      navigate("/admin/dashboard");
     
    } catch (error) {
      console.error("Erreur lors de la connexion:", error.message);

      if (error.response) {
        // Erreur provenant de la réponse avec un statut d'erreur (non 2xx)
        const { data } = error.response;
        toast.error(data.message);
      } else if (error.request) {
        // Erreur de la requête (pas de réponse reçue)
        console.error("Pas de réponse reçue:", error.request);
        toast.error("Problème de connexion. Veuillez réessayer.");
      } else {
        // Autres types d'erreur
        console.error("Erreur:", error.message);
        toast.error("Une erreur est survenue. Veuillez réessayer.");
      }
    } finally {
      setLoading(false); // Désactiver le chargement du formulaire
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <ToastContainer position="top-right" /> {/* Container pour les toasts */}
      <form
        onSubmit={handleSubmit}
        className="max-w-sm w-full bg-gray-800 p-8 rounded-lg"
      >
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Votre email
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-5 relative">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Votre mot de passe
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <a
            href="#"
            className="absolute right-0  mr-2 text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500"
          >
            Mot de passe oublié ?
          </a>
        </div>
        <button
          type="submit"
          className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? (
            <div className="flex justify-center items-center">
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.002 8.002 0 0112 4.472v3.831a4.001 4.001 0 00-4 4.005H6zm8 0h2a6 6 0 00-6-6v2a4 4 0 014 4zm2-8h-2a2 2 0 012-2v2z"
                ></path>
              </svg>
              <span>Connexion en cours...</span>
            </div>
          ) : (
            "Se connecter"
          )}
        </button>
      </form>
    </div>
  );
};

export default Login;
