"use client"

import React, { useState } from 'react';
import { useRouter } from "next/navigation";  // Import Next.js router
import styles from './LoginPage.module.css';

const LoginPage = () => {
  const router = useRouter(); // Initialize Next.js router
  const [isManager, setIsManager] = useState(false); // Toggle between User and Manager
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  // Dummy stored users and managers
  const users = [
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' },
  ];

  const managers = [
    { username: 'manager1', password: 'managerpass1' },
    { username: 'manager2', password: 'managerpass2' },
  ];

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  // Handle login submission
  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    const accountList = isManager ? managers : users;
    const account = accountList.find(
      (acc) => acc.username === credentials.username && acc.password === credentials.password
    );

    if (account) {
      // Redirect to '/' route
      router.push('/'); // Redirect to homepage
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        {isManager ? 'Manager Login' : 'User Login'}
      </h1>
      <form className={styles.form} onSubmit={handleLogin}>
        <div className={styles.formGroup}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={credentials.username}
            onChange={handleInputChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
            className={styles.input}
            required
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.button}>
          Login
        </button>
      </form>
      <button
        className={styles.toggleButton}
        onClick={() => setIsManager(!isManager)}
      >
        Switch to {isManager ? 'User' : 'Manager'} Login
      </button>
    </div>
  );
};

export default LoginPage;
