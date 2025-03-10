// pages/register.js
import { useState } from "react";
import { TextInput, PasswordInput, Button, Container, Title, Notification, Text } from "@mantine/core";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link"; 

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, { email, password });
      if (response.data.message) {
        router.push("/login");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <Container size="sm" my="xl">
      <Title align="center">Register</Title>
      <form onSubmit={handleRegister}>
        <TextInput
          label="Email"
          placeholder="your.email@example.com"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          required
        />
        <PasswordInput
          label="Password"
          placeholder="Enter a strong password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          required
          mt="md"
        />
        {error && <Notification color="red" mt="md">{error}</Notification>}
        <Button fullWidth mt="xl" type="submit">Register</Button>
      </form>

      {/* Add login link below the register button */}
      <Text align="center" mt="md">
        Already have an account? <Link href="/login" passHref><Text span color="blue" style={{ cursor: "pointer" }}>Login here</Text></Link>
      </Text>
    </Container>
  );
}
