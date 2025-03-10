import { useState } from 'react';
import { TextInput, Button, Card, Title, Text } from '@mantine/core';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function AddLead() {
  const [name, setName] = useState('');
  const [sex, setSex] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [leadSource, setLeadSource] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/leads`,
        { name, sex, gender, address, leadSource },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      router.push('/leads');
    } catch (err) {
      setError(err.response?.data?.error || 'Error creating lead');
    }
  };

  return (
    <Card
      shadow="sm"
      p="lg"
      radius="md"
      withBorder
      style={{ maxWidth: 500, margin: '40px auto' }}
    >
      <Title order={2} mb="md">Add Lead</Title>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Name"
          placeholder="Lead name"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          required
          mb="sm"
        />
        <TextInput
          label="Sex"
          placeholder="e.g. Male/Female"
          value={sex}
          onChange={(e) => setSex(e.currentTarget.value)}
          required
          mb="sm"
        />
        <TextInput
          label="Gender"
          placeholder="e.g. Man/Woman/Non-binary"
          value={gender}
          onChange={(e) => setGender(e.currentTarget.value)}
          required
          mb="sm"
        />
        <TextInput
          label="Address"
          placeholder="Lead address"
          value={address}
          onChange={(e) => setAddress(e.currentTarget.value)}
          required
          mb="sm"
        />
        <TextInput
          label="Lead Source"
          placeholder="Where did this lead come from?"
          value={leadSource}
          onChange={(e) => setLeadSource(e.currentTarget.value)}
          required
          mb="sm"
        />
        {error && <Text color="red" mb="sm">{error}</Text>}
        <Button type="submit" fullWidth>
          Submit
        </Button>
      </form>
    </Card>
  );
}
