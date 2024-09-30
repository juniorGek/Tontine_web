import React, { useEffect, useState } from "react";
import SideBar from "../../global/SideBar";
import { API_ADMIN } from "../../../../config/endPoint";
import { useParams } from "react-router-dom";

const formatDate = (dateString) => {
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", options);
};

const DetailClient = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [clientData, setClientData] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token"); // Remplacez 'your_token_here' par le token réel
      try {
        const response = await fetch(`${API_ADMIN}/waitclient/details/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setClientData(data);
      } catch (error) {
        console.error("Error fetching client details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [id]);

  if (loading) {
    return (
      <SideBar>
        <div className="p-6 bg-white shadow-md rounded-lg max-w-4xl mx-auto mt-8">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">
            Loading...
          </h1>
          <p>Please wait while the client details are being fetched.</p>
        </div>
      </SideBar>
    );
  }

  if (!clientData) {
    return (
      <SideBar>
        <div className="p-6 bg-white shadow-md rounded-lg max-w-4xl mx-auto mt-8">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">Error</h1>
          <p>Failed to load client details. Please try again later.</p>
        </div>
      </SideBar>
    );
  }

  return (
    <SideBar>
      <div className="p-6 bg-white shadow-md rounded-lg max-w-4xl mx-auto mt-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Client Details
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium text-gray-700 mb-2">
              Personal Information
            </h2>
            <div className="space-y-2">
              <p>
                <span className="font-semibold text-gray-600">Name:</span>{" "}
                {clientData.nom} {clientData.prenom}
              </p>
              <p>
                <span className="font-semibold text-gray-600">Gender:</span>{" "}
                {clientData.genre}
              </p>
              <p>
                <span className="font-semibold text-gray-600">
                  Date of Birth:
                </span>{" "}
                {formatDate(clientData.datNaiss)}
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium text-gray-700 mb-2">
              Contact Information
            </h2>
            <div className="space-y-2">
              <p>
                <span className="font-semibold text-gray-600">Email:</span>{" "}
                {clientData.email}
              </p>
              <p>
                <span className="font-semibold text-gray-600">Phone:</span>{" "}
                {clientData.tel}
              </p>
              <p>
                <span className="font-semibold text-gray-600">Address:</span>{" "}
                {clientData.adresse}
              </p>
            </div>
          </div>

          {/* Account Information */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium text-gray-700 mb-2">
              Account Information
            </h2>
            <div className="space-y-2">
              <p>
                <span className="font-semibold text-gray-600">
                  Account Number:
                </span>{" "}
                {clientData.cni}
              </p>
              <p>
                <span className="font-semibold text-gray-600">
                  Account Type:
                </span>{" "}
                {clientData.typeCompte}
              </p>
              <p>
                <span className="font-semibold text-gray-600">
                  Account Status:
                </span>{" "}
                Active
              </p>
            </div>
          </div>

          {/* Additional Notes */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium text-gray-700 mb-2">
              Additional Notes
            </h2>
            <p className="text-gray-600">{clientData.note}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end space-x-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Finaliser l'inscription
          </button>
          <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
            Rejeter l'inscription
          </button>
        </div>
      </div>
    </SideBar>
  );
};

export default DetailClient;
