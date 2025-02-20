import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser } from "./redux/userSlice";
import { useNavigate } from "react-router-dom";
import styles from "./UserList.module.css";

const UserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = async (id) => {
    await dispatch(deleteUser(id));
    dispatch(fetchUsers()); // Refresh list
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>User List</h2>
      <button className={styles.createBtn} onClick={() => navigate("/create")}>
        Create User
      </button>
      {loading ? (
        <p className={styles.loadingText}>Loading users...</p>
      ) : error ? (
        <p className={styles.errorText}>{error}</p>
      ) : users.length === 0 ? (
        <p className={styles.loadingText}>No users found...</p>
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
