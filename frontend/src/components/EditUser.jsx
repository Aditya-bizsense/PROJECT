import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import style from "./edituser.module.css";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7027/api/users/${id}`
        );
        console.log("User data:", response.data);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setUser((prevUser) => ({ ...prevUser, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://localhost:7027/api/users/${id}`, user);
      navigate("/");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div>
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <label>First Name:</label>
        <input
          type="text"
          name="firstname"
          className={style.input}
          value={user.firstname}
          onChange={handleChange}
          required
        />

        <label>Last Name:</label>
        <input
          type="text"
          name="lastname"
          className={style.input}
          value={user.lastname}
          onChange={handleChange}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          className={style.input}
          value={user.email}
          onChange={handleChange}
          required
        />

        <label>Phone:</label>
        <input
          type="text"
          name="phone"
          className={style.input}
          value={user.phone}
          onChange={handleChange}
          required
        />

        <button className={style.button} type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditUser;
