import React, { useRef } from "react";
import logo from "../assets/image/slider-img.png";

const Modal = ({ showModal, handleClose, formData, compte }) => {
  const modalRef = useRef();
  const handlePrint = () => {
    
    const printContents = modalRef.current.innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload(); // Optionally reload to restore the original state
  };

  return (
    <div className={`fixed inset-0 z-50 ${showModal ? "block" : "hidden"}`}>
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50"></div>
      <div
        ref={modalRef}
        className="relative w-11/12 max-w-lg mx-auto mt-24 bg-white rounded-lg shadow-lg p-6"
      >
        <style>
          {`
            @media print {
              .no-print {
                display: none;
              }
              .print-content {
                border: 1px solid #ddd;
                padding: 20px;
              }
              .logo {
                width: 150px;
                display: block;
                margin: 0 auto;
              }
            }
          `}
        </style>
        <div className="print-content">
          <img src={logo} alt="Logo" className="logo w-32 h-auto mx-auto" />
          <h2 className="text-2xl font-bold text-center mb-4">Reçu de Client</h2>
          <ul className="mb-4">
            <li className="flex justify-between py-2 border-b">
              <strong>Numero de compte:</strong>
              <span>{compte}</span>
            </li>
            <li className="flex justify-between py-2 border-b">
              <strong>Nom:</strong>
              <span>{formData.nom}</span>
            </li>
            <li className="flex justify-between py-2 border-b">
              <strong>Prénom:</strong>
              <span>{formData.prenom}</span>
            </li>
            <li className="flex justify-between py-2 border-b">
              <strong>Email:</strong>
              <span>{formData.email}</span>
            </li>
            <li className="flex justify-between py-2 border-b">
              <strong>Téléphone:</strong>
              <span>{formData.tel}</span>
            </li>
            <li className="flex justify-between py-2 border-b">
              <strong>Adresse:</strong>
              <span>{formData.adresse}</span>
            </li>
            <li className="flex justify-between py-2 border-b">
              <strong>Montant à cotiser:</strong>
              <span>{formData.montant}</span>
            </li>
            <li className="flex justify-between py-2 border-b">
              <strong>Agent:</strong>
              <span>{formData.agentId}</span>
            </li>
            <li className="flex justify-between py-2 border-b">
              <strong>Notes:</strong>
              <span>{formData.note}</span>
            </li>
          </ul>
          <div className="flex justify-end">
            <button
              onClick={handlePrint}
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2 no-print"
            >
              Imprimer
            </button>
            <button
              onClick={handleClose}
              className="bg-gray-500 text-white px-4 py-2 rounded no-print"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
