import React from "react";

const Modal = ({ title, isVisible, onClose, children }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div
        className="bg-white rounded-lg shadow p-6 relative z-10 max-w-lg w-full mx-4"
        style={{
          boxShadow:
            "0 35px 60px -15px rgba(0, 0, 0, 0.3), 0 10px 20px -10px rgba(128, 0, 128, 0.3)",
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
