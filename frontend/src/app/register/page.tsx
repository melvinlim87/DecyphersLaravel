'use client';

import React, { useState } from 'react';
import api from '../../api';

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await api.post('/register', { name, email, password, password_confirmation: passwordConfirmation });
      console.log('Registration successful:', response.data);
      // TODO: Redirect to login or dashboard after successful registration
    } catch (err: any) {
      console.error('Registration failed:', err);      
      setError(err?.response?.data?.message || 'Registration failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
      padding: 16,
    }}>
      <form
        onSubmit={handleSubmit}
        style={{
          width: '100%',
          maxWidth: 400,
          background: 'rgba(255, 255, 255, 0.12)',
          borderRadius: 16,
          boxShadow: '0 4px 24px rgba(99,102,241,0.15)',
          padding: 32,
          display: 'flex',
          flexDirection: 'column',
          backdropFilter: 'blur(8px)',
        }}
      >
        <h1 style={{
          fontSize: 32,
          fontWeight: 700,
          color: '#fff',
          textAlign: 'center',
          marginBottom: 24,
          letterSpacing: 1,
        }}>Create an Account</h1>

        {error && (
          <div style={{
            background: '#fee2e2',
            color: '#b91c1c',
            borderRadius: 8,
            padding: '8px 12px',
            marginBottom: 18,
            textAlign: 'center',
            fontSize: 15,
            fontWeight: 500,
          }}>{error}</div>
        )}

        <label htmlFor="name" style={{ color: '#e0e7ff', fontWeight: 500, marginBottom: 6 }}>Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          style={{
            marginBottom: 18,
            padding: '12px 14px',
            borderRadius: 8,
            border: '1px solid #a5b4fc',
            fontSize: 16,
            background: 'rgba(255,255,255,0.15)',
            color: '#222',
            outline: 'none',
            transition: 'border 0.2s',
          }}
        />

        <label htmlFor="email" style={{ color: '#e0e7ff', fontWeight: 500, marginBottom: 6 }}>Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{
            marginBottom: 18,
            padding: '12px 14px',
            borderRadius: 8,
            border: '1px solid #a5b4fc',
            fontSize: 16,
            background: 'rgba(255,255,255,0.15)',
            color: '#222',
            outline: 'none',
            transition: 'border 0.2s',
          }}
        />

        <label htmlFor="password" style={{ color: '#e0e7ff', fontWeight: 500, marginBottom: 6 }}>Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{
            marginBottom: 18,
            padding: '12px 14px',
            borderRadius: 8,
            border: '1px solid #a5b4fc',
            fontSize: 16,
            background: 'rgba(255,255,255,0.15)',
            color: '#222',
            outline: 'none',
            transition: 'border 0.2s',
          }}
        />

        <label htmlFor="password_confirmation" style={{ color: '#e0e7ff', fontWeight: 500, marginBottom: 6 }}>Confirm Password</label>
        <input
          type="password"
          id="password_confirmation"
          value={passwordConfirmation}
          onChange={e => setPasswordConfirmation(e.target.value)}
          required
          style={{
            marginBottom: 26,
            padding: '12px 14px',
            borderRadius: 8,
            border: '1px solid #a5b4fc',
            fontSize: 16,
            background: 'rgba(255,255,255,0.15)',
            color: '#222',
            outline: 'none',
            transition: 'border 0.2s',
          }}
        />

        <button
          type="submit"
          disabled={isLoading}
          style={{
            padding: '14px 0',
            background: isLoading ? '#a5b4fc' : 'linear-gradient(90deg, #6366f1 0%, #4f46e5 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            fontSize: 18,
            fontWeight: 700,
            cursor: isLoading ? 'not-allowed' : 'pointer',
            boxShadow: '0 2px 8px rgba(99,102,241,0.10)',
            marginBottom: 6,
            transition: 'background 0.2s',
          }}
        >
          {isLoading ? 'Registering...' : 'Register'}
        </button>

        <p style={{ marginTop: 24, color: '#e0e7ff', textAlign: 'center' }}>
          Already have an account?{' '}
          <a href="/login" style={{ color: '#a5b4fc', textDecoration: 'underline', fontWeight: 500 }}>Sign in</a>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
