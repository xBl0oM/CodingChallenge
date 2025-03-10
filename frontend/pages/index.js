// pages/leads/index.js
import { useEffect, useState } from 'react';
import {
  Avatar,
  Container,
  Group,
  Loader,
  MantineProvider,
  Text,
  Title,
  rem,
} from '@mantine/core';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/leads`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setLeads(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching leads:', err);
        setLoading(false);
      });
  }, [router]);

  if (loading) {
    return <Loader />;
  }

  return (
    <MantineProvider
      theme={{
        // Optionally override Mantine's theme for this page
        // or just rely on your global theme
      }}
    >
      {/* 
        Wrap the main content in a container with a light background color.
        Adjust the color/spacing to your preference.
      */}
      <div
        style={{
          backgroundColor: '#F9F1FF', // soft pink/purple background
          minHeight: '100vh',
          padding: '2rem 0',
        }}
      >
        <Title align="center" mb="xl">
          Leads Page
        </Title>

        <Container size="md">
          {leads.map((lead) => (
            <Group
              key={lead.id}
              spacing="md"
              p="md"
              mb="sm"
              // White background "card" look for each lead
              style={{
                backgroundColor: '#fff',
                borderRadius: rem(8),
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                alignItems: 'center',
              }}
            >
              <Avatar radius="xl">
                {lead.name?.charAt(0).toUpperCase() || 'U'}
              </Avatar>
              <Text size="md" weight={500}>
                {lead.name}
              </Text>
            </Group>
          ))}
        </Container>
      </div>
    </MantineProvider>
  );
}
