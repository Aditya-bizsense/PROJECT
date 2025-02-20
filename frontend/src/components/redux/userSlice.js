import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://localhost:7027/api/users";

// Fetch all users
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

// Fetch user by ID
export const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  }
);

// Add new user
export const addUser = createAsyncThunk("users/addUser", async (user) => {
  const userToSend = { ...user, PasswordHash: user.password };
  delete userToSend.password; // Remove old key

  const response = await axios.post(API_URL, userToSend);
  return response.data;
});

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (
    { id, firstname, lastname, email, phone },
    { getState, rejectWithValue }
  ) => {
    try {
      const { selectedUser } = getState().users; // Get user from Redux state

      if (!selectedUser || !selectedUser.passwordHash) {
        throw new Error("PasswordHash is missing from selectedUser!");
      }

      const userToUpdate = {
        id, // Keep ID the same
        firstname,
        lastname,
        email,
        phone,
        passwordHash: selectedUser.passwordHash, // Keep same password hash
      };

      console.log("Updating user with:", userToUpdate);

      const response = await axios.put(`${API_URL}/${id}`, userToUpdate, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Update response:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Error updating user:",
        error.response?.data || error.message
      );
      return rejectWithValue(error.response?.data || "Update failed");
    }
  }
);

// Delete user
export const deleteUser = createAsyncThunk("users/deleteUser", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    selectedUser: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.selectedUser = action.payload;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = { ...state.users[index], ...action.payload };
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      });
  },
});

export default userSlice.reducer;
