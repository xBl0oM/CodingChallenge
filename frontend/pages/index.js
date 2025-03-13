import { useEffect, useState } from 'react';
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
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: '#F9F1FF',
        minHeight: '100vh',
        padding: '2rem 0',
      }}
    >
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>
        Leads Page
      </h1>

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {leads.map((lead) => (
          <div
            key={lead.id}
            style={{
              backgroundColor: '#fff',
              borderRadius: '8px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              padding: '1rem',
              marginBottom: '1rem',
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#ccc',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: '1rem',
                fontSize: '1.2rem',
                fontWeight: 'bold',
              }}
            >
              {lead.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <span style={{ fontSize: '1rem', fontWeight: '500' }}>
              {lead.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
