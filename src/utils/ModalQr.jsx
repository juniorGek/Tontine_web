// src/components/QRCodeModal.js

import React from 'react';
import QRCode from 'qrcode.react'; // Import QRCode component

const QRCodeModal = ({ isOpen, onClose, qrCodeData }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <h2 className="text-xl font-bold mb-4">Code QR</h2>
        <div className="mb-4 flex justify-center">
          <QRCode value={qrCodeData} size={150} /> {/* Generate QR Code */}
        </div>
        <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
          Fermer
        </button>
      </div>
    </div>
  );
};

export default QRCodeModal;
