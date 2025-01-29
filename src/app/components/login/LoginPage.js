"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './LoginPage.module.css';

const LoginPage = () => {
  const router = useRouter();
  const [isManager, setIsManager] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    name: ''
  });
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCredentials(prevCredentials => ({
      ...prevCredentials,
      [name]: value
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (isLogin) {
      // Login logic
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: credentials.username,
          password: credentials.password,
          isManager: isManager
        })
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data)
        localStorage.setItem('token', data.token);
        router.push('/');
      } else {
        const data = await response.json();
        console.log(data)
        setError(data.error || 'Invalid username or password');
      }
    } else {
      // Registration logic
      const response = await fetch('/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: credentials.name,
          username: credentials.username,
          password: credentials.password,
          isManager: isManager
        })
      });

      if (response.ok) {
        setIsLogin(true);
        setCredentials({ username: '', password: '', name: '' });
        alert('Registration successful, please log in.');
      } else {
        const data = await response.json();
        setError(data.error || 'Registration failed');
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1>{isLogin ? (isManager ? 'Manager Login' : 'User Login') : (isManager ? 'Manager Registration' : 'User Registration')}</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        {!isLogin && (
          <div className={styles.formGroup}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={credentials.name}
              onChange={handleInputChange}
              className={styles.input}
              required
            />
          </div>
        )}
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
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>
      <button
        className={styles.toggleButton}
        onClick={() => setIsManager(!isManager)}
      >
        Switch to {isManager ? 'User' : 'Manager'} {isLogin ? 'Login' : 'Registration'}
      </button>
      <button
        className={styles.toggleButton}
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin ? 'Register' : 'Login'}
      </button>
    </div>
  );
};

export default LoginPage;
