import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, editUser, deleteUser } from '../features/users/userSlice';
import Modal from '../components/Modal';
import Navigator from '../components/Navigator';

const UserManagement = () => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('Employee');
  const [isEditing, setIsEditing] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();
  const users = useSelector((state) => state?.users?.users);

  const handleAddUser = () => {
    if (name) {
      dispatch(addUser({ id: Date.now(), name, role }));
      setName('');
      setRole('Employee');
      setModalVisible(false);
    }
  };

  const handleEditUser = (id) => {
    const user = users.find((user) => user.id === id);
    if (user) {
      setName(user.name);
      setRole(user.role);
      setIsEditing(true);
      setEditingUserId(id);
      setModalVisible(true);
    }
  };

  const handleUpdateUser = () => {
    if (name) {
      dispatch(editUser({ id: editingUserId, name, role }));
      setName('');
      setRole('Employee');
      setIsEditing(false);
      setEditingUserId(null);
      setModalVisible(false);
    }
  };

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setName('');
    setRole('Employee');
    setIsEditing(false);
  };

  return (
    <div className="p-5">
      <Navigator title={'User Management'} />

      <button
        className="bg-midnight text-white py-2 px-4 rounded-lg hover:bg-purple my-2"
        onClick={() => setModalVisible(true)}
      >
        Add New User
      </button>

      <Modal title={isEditing ? "Edit User" : "Add User"} isVisible={isModalVisible} onClose={handleCloseModal}>
        <div className="flex flex-col space-y-4">
          <label className="text-sm font-medium">User Name</label>
          <input
            type="text"
            className="border p-2 rounded my-2 text-sm"
            placeholder="User Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label className="text-sm font-medium">Select Role</label>
          <select
            className="my-2 px-4 py-2 border border-gray-300 rounded-md"
            onChange={(e) => setRole(e.target.value)}
            value={role}
          >
            <option value="Employee">Employee</option>
            <option value="Project Manager">Project Manager</option>
          </select>
          <button
            className="my-2 bg-midnight text-white px-4 py-2 rounded hover:bg-purple"
            onClick={isEditing ? handleUpdateUser : handleAddUser}
          >
            {isEditing ? "Update User" : "Add User"}
          </button>
        </div>
      </Modal>

      {/* User Table */}
      {
        users.length > 0 ? <div className="overflow-x-auto mt-6">
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Role</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                <td className="border border-gray-300 px-4 py-2">{user.role}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="text-blue-600 hover:text-blue-800 mr-2"
                    onClick={() => handleEditUser(user.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>: ''
      }
      
    </div>
  );
};

export default UserManagement;
