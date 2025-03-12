import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from '../../styles/editLead.module.css';

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
      router.push('/protected');
    } catch (err) {
      setError(err.response?.data?.error || 'Error updating lead');
    }
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Edit Lead</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="name" className={styles.label}>Name</label>
        <input
          type="text"
          id="name"
          className={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="sex" className={styles.label}>Sex</label>
        <input
          type="text"
          id="sex"
          className={styles.input}
          value={sex}
          onChange={(e) => setSex(e.target.value)}
          required
        />

        <label htmlFor="gender" className={styles.label}>Gender</label>
        <input
          type="text"
          id="gender"
          className={styles.input}
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
        />

        <label htmlFor="address" className={styles.label}>Address</label>
        <input
          type="text"
          id="address"
          className={styles.input}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />

        <label htmlFor="leadSource" className={styles.label}>Lead Source</label>
        <input
          type="text"
          id="leadSource"
          className={styles.input}
          value={leadSource}
          onChange={(e) => setLeadSource(e.target.value)}
          required
        />

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" className={styles.submitBtn}>
          Update
        </button>
      </form>
    </div>
  );
}
