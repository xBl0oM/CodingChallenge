import { useState } from 'react';
import { Card, TextInput, PasswordInput, Button, Title, Text, Anchor } from '@mantine/core';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, { email, password });
      const { token, role } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      router.push('/protected');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder style={{ maxWidth: 400, margin: '40px auto' }}>
      <Title align="center" mb="lg">Login</Title>
      <form onSubmit={handleLogin}>
        <TextInput
          label="Email"
          placeholder="your.email@example.com"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          required
          mb="md"
        />
        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          required
          mb="md"
        />
        {error && <Text color="red" size="sm" mb="md">{error}</Text>}
        <Button type="submit" fullWidth>Sign in</Button>
      </form>
      <Text align="center" mt="md">
        <Anchor href="/register">Don't have an account? Register here</Anchor>
      </Text>
    </Card>
  );
}
