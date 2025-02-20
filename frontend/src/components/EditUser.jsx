import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchUserById, updateUser } from "./redux/userSlice";
import style from "./edituser.module.css";

const EditUser = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedUser, status, error } = useSelector((state) => state.users);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
  });

  // Fetch user when the component mounts
  useEffect(() => {
    dispatch(fetchUserById(id));
  }, [dispatch, id]);

  // Update form fields when user data is available
  useEffect(() => {
    if (selectedUser) {
      setFormData({
        firstname: selectedUser.firstname || "",
        lastname: selectedUser.lastname || "",
        email: selectedUser.email || "",
        phone: selectedUser.phone || "",
        // passwordHash: selectedUser.passwordHash || "",
      });
    }
  }, [selectedUser]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting user update:", { id, ...formData }); // Debugging log

    try {
      await dispatch(updateUser({ id, ...formData })).unwrap();
      navigate("/");
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  return (
    <div className={style.formContainer}>
      <h2>Edit User</h2>

      {error && <p className={style.error}>{error}</p>}
      {status === "loading" && <p>Loading user data...</p>}

      {selectedUser ? (
        <form onSubmit={handleSubmit}>
          <label>First Name:</label>
          <input
            type="text"
            name="firstname"
            className={style.input}
            value={formData.firstname}
            onChange={handleChange}
            required
          />

          <label>Last Name:</label>
          <input
            type="text"
            name="lastname"
            className={style.input}
            value={formData.lastname}
            onChange={handleChange}
            required
          />

          <label>Email:</label>
          <input
            type="email"
            name="email"
            className={style.input}
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            className={style.input}
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <button
            className={style.button}
            type="submit"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Updating..." : "Update"}
          </button>
        </form>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EditUser;
