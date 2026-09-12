import React from 'react';

function WhatsAppButton() {
  const phoneNumber = '91XXXXXXXXXX'; // Replace with your actual phone number
  const message = encodeURIComponent('Hello! I would like to inquire about Sneh Masala products.');

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noreferrer"
      className="whatsapp-float"
      aria-label="Chat on WhatsApp"
    >
      {/* Pulse effect rings */}
      <span className="whatsapp-pulse"></span>

      {/* SVG Icon */}
      <svg
        className="whatsapp-icon"
        viewBox="0 0 24 24"
        width="32"
        height="32"
        fill="currentColor"
      >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.001.001-.999 3.648 3.742-.981z" />
      </svg>

      {/* Hover tooltip text card */}
      <div className="whatsapp-tooltip">
        <strong>Chat with us</strong>
        <small>We're online & ready to help!</small>
      </div>
    </a>
  );
}

export default WhatsAppButton;