import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "./api";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      console.log("Fetching users...");
      const data = await getUsers();
      console.log("Fetched users:", data);
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    fetchUsers(); // Refresh list
  };

  return (
    <div>
      <h2>User List</h2>
      <button onClick={() => navigate("/create")}>Create User</button>
      {users.length === 0 ? (
        <p>Loading users or no users found...</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.firstName} {user.lastName} - {user.email} - {user.phone}
              <button onClick={() => navigate(`/edit/${user.id}`)}>Edit</button>
              <button onClick={() => handleDelete(user.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
