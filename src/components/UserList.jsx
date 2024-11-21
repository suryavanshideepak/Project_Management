import React, { useState } from 'react';

const UserList = ({ users, addUser, updateUser, deleteUser }) => {
  const [newUser, setNewUser] = useState({ name: '', role: 'Employee' });

  const handleAddUser = () => {
    addUser({ id: Date.now(), ...newUser });
    setNewUser({ name: '', role: 'Employee' });
  };

  return (
    <div>
      <h2>User Management</h2>
      <input
        type="text"
        value={newUser.name}
        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        placeholder="Enter name"
      />
      <select
        value={newUser.role}
        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
      >
        <option value="Employee">Employee</option>
        <option value="Project Manager">Project Manager</option>
      </select>
      <button onClick={handleAddUser}>Add User</button>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.role})
            <button onClick={() => updateUser(user.id, { name: 'Updated Name' })}>Edit</button>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
