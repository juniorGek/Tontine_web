import { useNavigate, useParams } from "react-router-dom";
import { API_ADMIN } from "../../../../config/endPoint";
import SideBar from "../../global/SideBar";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaInfoCircle,
  FaAddressCard,
  FaTransgender,
  FaCalendarAlt,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import LoadingModal from "../../../../utils/Loading";
import { MdOutlineAccountBalance } from "react-icons/md";

function Details({ user }) {
  const { id } = useParams();
  const [detail, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", options);
  };

  const fetchDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_ADMIN}/client/details/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        console.log("erreur");
      }
      const data = await response.json();
      setDetails(data.client);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const handleAgentClick = () => {
    // Exemple : redirection vers la page de l'agent
     navigate(`/admin/detailAgent/${detail.agentId._id}`);
  };

  return (
    <SideBar user={user}>
      {loading ? (
        <>
          <LoadingModal isOpen={loading} />
        </>
      ) : (
        <div className="container mx-auto p-6">
          {" "}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            {" "}
            <div className="p-6">
              {" "}
              <h2 className="text-3xl font-bold mb-4 text-center">
                Détails du Client
              </h2>{" "}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {" "}
                <div className="flex items-center">
                  {" "}
                  <FaInfoCircle className="text-blue-500 mr-2" />{" "}
                  <div>
                    {" "}
                    <h3 className="text-lg font-semibold">Nom</h3>{" "}
                    <p className="text-gray-700">{detail.nom}</p>{" "}
                  </div>{" "}
                </div>{" "}
                <div className="flex items-center">
                  {" "}
                  <FaEnvelope className="text-blue-500 mr-2" />{" "}
                  <div>
                    {" "}
                    <h3 className="text-lg font-semibold">Email</h3>{" "}
                    <p className="text-gray-700">{detail.email}</p>{" "}
                  </div>{" "}
                </div>{" "}
                <div className="flex items-center">
                  {" "}
                  <FaPhone className="text-blue-500 mr-2" />{" "}
                  <div>
                    {" "}
                    <h3 className="text-lg font-semibold">Téléphone</h3>{" "}
                    <p className="text-gray-700">{detail.tel}</p>{" "}
                  </div>{" "}
                </div>{" "}
                <div className="flex items-center">
                  {" "}
                  <FaAddressCard className="text-blue-500 mr-2" />{" "}
                  <div>
                    {" "}
                    <h3 className="text-lg font-semibold">cni</h3>{" "}
                    <p className="text-gray-700">{detail.cni}</p>{" "}
                  </div>{" "}
                </div>{" "}
                <div className="flex items-center">
                  {" "}
                  <FaTransgender className="text-blue-500 mr-2" />{" "}
                  <div>
                    {" "}
                    <h3 className="text-lg font-semibold">Genre</h3>{" "}
                    <p className="text-gray-700">{detail.genre}</p>{" "}
                  </div>{" "}
                </div>{" "}
                <div className="flex items-center">
                  {" "}
                  <MdOutlineAccountBalance className="text-blue-500 mr-2" />{" "}
                  <div>
                    {" "}
                    <h3 className="text-lg font-semibold">Type Compte</h3>{" "}
                    <p className="text-gray-700">{detail.typeCompte.name}</p>{" "}
                  </div>{" "}
                </div>{" "}
                <div className="flex items-center">
                  {" "}
                  <FaCalendarAlt className="text-blue-500 mr-2" />{" "}
                  <div>
                    {" "}
                    <h3 className="text-lg font-semibold">
                      Date naissance
                    </h3>{" "}
                    <p className="text-gray-700">
                      {formatDate(detail.datNaiss)}{" "}
                    </p>{" "}
                  </div>{" "}
                </div>{" "}
                <div className="flex items-center">
                  {" "}
                  <FaMapMarkerAlt className="text-blue-500 mr-2" />{" "}
                  <div>
                    {" "}
                    <h3 className="text-lg font-semibold">Adresse</h3>{" "}
                    <p className="text-gray-700">{detail.adresse}</p>{" "}
                  </div>{" "}
                </div>{" "}  
                <div className="md:col-span-2">
                  <h3 className="text-lg font-semibold">Agent Affecté</h3>
                  <button
                    onClick={handleAgentClick}
                    className="text-blue-500 underline hover:text-blue-700"
                  >
                    {detail.agentId.nom} {detail.agentId.prenom}
                  </button>
                </div>
                <div className="md:col-span-2">
                  {" "}
                  <h3 className="text-lg font-semibold">
                    Informations Supplémentaires
                  </h3>{" "}
                  <p className="text-gray-700">{detail.note}</p>{" "}
                </div>{" "}
              </div>{" "}
              {/* Boutons en bas */}
              <div className="flex justify-center mt-6">
                <button
                 
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Modifier
                </button>
                <button
                  
                  className="bg-green-500 text-white py-2 px-4 ml-3 rounded hover:bg-green-600"
                >
                  Compte client
                </button>
                
              </div>
            </div>{" "}
          </div>{" "}
        </div>
      )}
    </SideBar>
  );
}

export default Details;
