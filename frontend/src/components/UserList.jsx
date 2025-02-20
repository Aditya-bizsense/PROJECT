import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "./api";
import { useNavigate } from "react-router-dom";
import styles from "./UserList.module.css";

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
    <div className={styles.container}>
      <h2 className={styles.title}>User List</h2>
      <button className={styles.createBtn} onClick={() => navigate("/create")}>
        Create User
      </button>
      {users.length === 0 ? (
        <p className={styles.loadingText}>Loading users or no users found...</p>
      ) : (
        <div className={styles.userGrid}>
          {users.map((user) => (
            <div key={user.id} className={styles.userCard}>
              <h3 className={styles.userName}>
                {user.firstname} {user.lastname}
              </h3>
              <p className={styles.userDetails}>
                <strong>Email:</strong> {user.email}
              </p>
              <p className={styles.userDetails}>
                <strong>Phone:</strong> {user.phone}
              </p>
              <div className={styles.userButtons}>
                <button
                  className={styles.editBtn}
                  onClick={() => navigate(`/edit/${user.id}`)}
                >
                  Edit
                </button>
                <button
                  className={styles.deleteBtn}
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList;
