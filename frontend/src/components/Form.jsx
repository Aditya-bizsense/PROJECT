import React, { useState } from "react";
import axios from "axios";
import style from "./form.module.css";

const UserForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate form fields
  const validateForm = () => {
    let newErrors = {};
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setSuccessMessage("");

    try {
      // Send data to .NET backend API
      const response = await axios.post(
        "https://localhost:7027/api/users",
        formData
      );

      // Handle success
      setSuccessMessage("User registered successfully!");
      setFormData({ firstName: "", lastName: "", email: "", phone: "" }); // Reset form
      setErrors({});
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style.formContainer}>
      <h2>User Registration</h2>

      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <input
            className={style.input}
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          <p className={style.error}>{errors.firstName}</p>
        </div>

        <div>
          <label>Last Name</label>
          <input
            className={style.input}
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          <p className={style.error}>{errors.lastName}</p>
        </div>

        <div>
          <label>Email</label>
          <input
            className={style.input}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <p className={style.error}>{errors.email}</p>
        </div>

        <div>
          <label>Phone</label>
          <input
            type="text"
            className={style.input}
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <p className={style.error}>{errors.phone}</p>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
