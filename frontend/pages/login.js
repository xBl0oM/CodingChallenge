import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from '../styles/login.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        email,
        password,
      });
      const { token, role } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      router.push('/protected');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className={styles.container}>
     
      <div className={styles.formWrapper}>
        <form onSubmit={handleLogin} className={styles.formCard}>
        <h1 className={styles.title}>Login</h1>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            id="email"
            className={styles.input}
            type="text"
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            required
          />

          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            id="password"
            className={styles.input}
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            required
          />

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" className={styles.signInBtn}>
            Sign in
          </button>

          <button
            type="button"
            className={styles.forgotBtn}
            onClick={() => router.push('/register')}
          >
            Create new Account
          </button>
        </form>
        <h1/>
      </div>
    </div>
  );
}
