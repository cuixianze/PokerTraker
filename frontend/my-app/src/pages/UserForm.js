import React, { useState } from 'react';
import axios from 'axios';

function UserForm() {
  const [username, setUsername] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const userData = {
      username: username,
      totalPnL: 0 // Set totalPnL to 0 by default
    };

    try {
      const response = await axios.post('http://localhost:8080/create/user', userData);
      setResponseMessage(`User created: ${response.data.username}`);
      setUsername('');
    } catch (error) {
      setResponseMessage('Error creating user. Please try again.');
    }
  };

  return (
    <div className="user-form">
      <h2>Create User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create User</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}

export default UserForm;
