import React from "react";
import ReactDOM from "react-dom";
import '../Pages/admin/global/loading.css'

const LoadingModal = ({ isOpen }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg flex flex-col items-center shadow-lg">
        <div className="loader mb-4"></div>
        <p className="text-gray-700 text-lg font-medium">Chargement en cours...</p>
      </div>
    </div>,
    document.body
  );
};

export default LoadingModal;
