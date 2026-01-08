"use client";
import "./BrochurePopup.css";
import { useState } from "react";

const BrochurePopup = ({ isOpen, onClose, projectName, projectImg }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [agreed, setAgreed] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Connect to backend
    console.log("Form submitted:", { ...formData, projectName });
    // After successful submission, trigger brochure download
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-container" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close" onClick={onClose}>
          ×
        </button>
        <div className="popup-content">
          <div className="popup-image">
            <img src={projectImg || "/spotlight/spotlight-img-1.jpg"} alt={projectName} />
            <div className="popup-image-overlay">
              <h3>{projectName}</h3>
            </div>
          </div>
          <div className="popup-form-section">
            <h4 className="popup-heading">Download Brochure</h4>
            <p className="popup-title">Please fill in your details to receive the brochure.</p>
            <form onSubmit={handleSubmit}>
              <div className="popup-input-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="popup-input-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="popup-input-group">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="popup-checkbox">
                <input
                  type="checkbox"
                  id="consent"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  required
                />
                <label htmlFor="consent">
                  I authorize Thakur Realtors to contact me with updates and notifications via Email, SMS, Whatsapp and Call.
                </label>
              </div>
              <button type="submit" className="popup-submit">
                SUBMIT
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrochurePopup;
