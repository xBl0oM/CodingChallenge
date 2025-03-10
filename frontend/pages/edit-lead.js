import { useState, useEffect } from 'react';
import { TextInput, Button, Card, Title, Text } from '@mantine/core';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function EditLead() {
  const router = useRouter();
  const { id } = router.query;
  const [name, setName] = useState('');
  const [sex, setSex] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [leadSource, setLeadSource] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    // Fetch lead by ID
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/leads/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const lead = res.data;
        setName(lead.name || '');
        setSex(lead.sex || '');
        setGender(lead.gender || '');
        setAddress(lead.address || '');
        setLeadSource(lead.leadSource || '');
      })
      .catch((err) => console.error(err));
  }, [id, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/leads/${id}`,
        { name, sex, gender, address, leadSource },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      router.push('/leads');
    } catch (err) {
      setError(err.response?.data?.error || 'Error updating lead');
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
      <Title order={2} mb="md">Edit Lead</Title>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Name"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          required
          mb="sm"
        />
        <TextInput
          label="Sex"
          value={sex}
          onChange={(e) => setSex(e.currentTarget.value)}
          required
          mb="sm"
        />
        <TextInput
          label="Gender"
          value={gender}
          onChange={(e) => setGender(e.currentTarget.value)}
          required
          mb="sm"
        />
        <TextInput
          label="Address"
          value={address}
          onChange={(e) => setAddress(e.currentTarget.value)}
          required
          mb="sm"
        />
        <TextInput
          label="Lead Source"
          value={leadSource}
          onChange={(e) => setLeadSource(e.currentTarget.value)}
          required
          mb="sm"
        />
        {error && <Text color="red" mb="sm">{error}</Text>}
        <Button type="submit" fullWidth>
          Update
        </Button>
      </form>
    </Card>
  );
}
