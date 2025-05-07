import React, { createContext, useState } from "react";
import {
  addUser,
  deleteUser,
  getSingleUser,
  getUserByRole,
  updateUser,
  updateUserState,
} from "../api/admin";

export const ApiContext = createContext();

const ApiProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [fetchParams, setFetchParams] = useState({
    roles: "",
    pageNo: localStorage.getItem("currentPage")
      ? parseInt(localStorage.getItem("currentPage"))
      : 0,
    search: localStorage.getItem("searchQuery") || "",
    limit: 6,
  });

  // Separate busy states
  const [fetchingUsers, setFetchingUsers] = useState(false);
  const [fetchingUser, setFetchingUser] = useState(false);
  const [updatingUser, setUpdatingUser] = useState(false);
  const [addingUser, setAddingUser] = useState(false);
  const [updatingUserState, setUpdatingUserState] = useState(false);
  const [deletingUser, setDeletingUser] = useState(false);

  const [totalUsers, setTotalUsers] = useState(0);

  // Fetch Users by Role
  const fetchUsers = async (
    roles = fetchParams.roles,
    pageNo = fetchParams.pageNo,
    limit = fetchParams.limit,
    search = fetchParams.search
  ) => {
    setFetchingUsers(true);

    // Store the latest fetch parameters
    localStorage.setItem("currentPage", pageNo); // Store page number in local storage
    localStorage.setItem("searchQuery", search); // Store search query in local storage
    setFetchParams({ roles, pageNo, limit, search });

    const response = await getUserByRole(roles, pageNo, limit, search);
    setFetchingUsers(false);

    if (!response.error) {
      setUsers(response.users);
      setTotalUsers(response.pagination.totalUsers); // Set total users
    }

    return response;
  };

  // Fetch a Single User for Profile
  const fetchUser = async userId => {
    setFetchingUser(true);
    const response = await getSingleUser(userId);
    setFetchingUser(false);

    if (!response.error) setSelectedUser(response.user);

    return response;
  };

  // Update User Info (Edit Profile)
  const handleUpdateUser = async (userId, userInfo) => {
    setUpdatingUser(true);
    const response = await updateUser(userId, userInfo);
    setUpdatingUser(false);

    return response;
  };

  // Add User
  const handleAddUser = async userInfo => {
    setAddingUser(true);
    const response = await addUser(userInfo);
    setAddingUser(false);

    return response;
  };

  // Update User State (Activate/Deactivate)
  const handleUserStateUpdate = async (userId, newState) => {
    setUpdatingUserState(true);
    const response = await updateUserState(userId, { state: newState });
    setUpdatingUserState(false);

    return response;
  };

  // Delete User
  const handleDeleteUser = async userId => {
    setDeletingUser(true);
    const response = await deleteUser(userId);
    setDeletingUser(false);

    return response;
  };

  return (
    <ApiContext.Provider
      value={{
        users,
        selectedUser,
        fetchParams,
        totalUsers,
        fetchingUsers,
        fetchingUser,
        updatingUser,
        addingUser,
        updatingUserState,
        deletingUser,
        fetchUsers,
        fetchUser,
        handleAddUser,
        handleUpdateUser,
        handleDeleteUser,
        handleUserStateUpdate,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export default ApiProvider;
