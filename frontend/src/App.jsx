import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from "./components/UserList";
import EditUser from "./components/EditUser";
import Form from "./components/Form";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/edit/:id" element={<EditUser />} />
        <Route path="/create" element={<Form />} />{" "}
      </Routes>
    </Router>
  );
};

export default App;
