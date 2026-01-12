"use client";
import "./BrochurePopup.css";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

const BrochurePopup = ({ isOpen, onClose, projectName, projectImg, brochureUrl }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [agreed, setAgreed] = useState(true);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Regex patterns
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^[6-9]\d{9}$/; // Indian mobile number format

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit mobile number";
    }

    if (!agreed) {
      newErrors.consent = "Please agree to the terms";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setSubmitting(true);

    try {
      // Save to Supabase
      const { error } = await supabase
        .from("users")
        .insert([{
          name: formData.name,
          email: formData.email,
          mobile: formData.phone,
          project_name: projectName,
        }]);

      if (error) throw error;

      // Download brochure if URL exists
      if (brochureUrl) {
        try {
          const response = await fetch(brochureUrl);
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `${projectName}-brochure.pdf`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        } catch (downloadError) {
          window.open(brochureUrl, "_blank");
        }
      }

      setFormData({ name: "", email: "", phone: "" });
      setErrors({});
      onClose();
    } catch (err) {
      setErrors({ submit: err.message || "Something went wrong. Please try again." });
    } finally {
      setSubmitting(false);
    }
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
                  className={errors.name ? "input-error" : ""}
                />
                {errors.name && <span className="popup-error">{errors.name}</span>}
              </div>
              <div className="popup-input-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? "input-error" : ""}
                />
                {errors.email && <span className="popup-error">{errors.email}</span>}
              </div>
              <div className="popup-input-group">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={errors.phone ? "input-error" : ""}
                />
                {errors.phone && <span className="popup-error">{errors.phone}</span>}
              </div>
              {errors.consent && <span className="popup-error">{errors.consent}</span>}
              {errors.submit && <span className="popup-error popup-error-submit">{errors.submit}</span>}
              <button type="submit" className="popup-submit" disabled={submitting}>
                {submitting ? "SUBMITTING..." : "SUBMIT"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrochurePopup;
