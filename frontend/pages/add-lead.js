// pages/add-lead.js
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../styles/addLead.module.css';

export default function AddLead() {
  const [name, setName] = useState('');
  const [selectedSex, setSelectedSex] = useState('');
  const [customSex, setCustomSex] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [customGender, setCustomGender] = useState('');
  const [selectedLeadSource, setSelectedLeadSource] = useState('');
  const [customLeadSource, setCustomLeadSource] = useState('');
  const [address, setAddress] = useState('');
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

    // If "Other" is selected, use the custom input; otherwise, use the selected value.
    const finalSex = selectedSex === 'Other' ? customSex : selectedSex;
    const finalGender = selectedGender === 'Other' ? customGender : selectedGender;
    const finalLeadSource = selectedLeadSource === 'Other' ? customLeadSource : selectedLeadSource;

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/leads`,
        { name, sex: finalSex, gender: finalGender, address, leadSource: finalLeadSource },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      router.push('/protected');
    } catch (err) {
      setError(err.response?.data?.error || 'Error creating lead');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Add Lead</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="name" className={styles.label}>Name</label>
        <input
          type="text"
          id="name"
          placeholder="Lead name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className={styles.input}
        />

        {/* Sex Dropdown */}
        <label htmlFor="sex" className={styles.label}>Sex</label>
        <select
          id="sex"
          value={selectedSex}
          onChange={(e) => setSelectedSex(e.target.value)}
          required
          className={styles.select}
        >
          <option value="" disabled>Select sex</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        {selectedSex === 'Other' && (
          <>
            <label htmlFor="customSex" className={styles.label}>Please specify</label>
            <input
              type="text"
              id="customSex"
              placeholder="Enter custom sex"
              value={customSex}
              onChange={(e) => setCustomSex(e.target.value)}
              required
              className={styles.input}
            />
          </>
        )}

        {/* Gender Dropdown */}
        <label htmlFor="gender" className={styles.label}>Gender</label>
        <select
          id="gender"
          value={selectedGender}
          onChange={(e) => setSelectedGender(e.target.value)}
          required
          className={styles.select}
        >
          <option value="" disabled>Select gender</option>
          <option value="Man">Man</option>
          <option value="Woman">Woman</option>
          <option value="Non-binary">Non-binary</option>
          <option value="Other">Other</option>
        </select>
        {selectedGender === 'Other' && (
          <>
            <label htmlFor="customGender" className={styles.label}>Please specify</label>
            <input
              type="text"
              id="customGender"
              placeholder="Enter custom gender"
              value={customGender}
              onChange={(e) => setCustomGender(e.target.value)}
              required
              className={styles.input}
            />
          </>
        )}

        <label htmlFor="address" className={styles.label}>Address</label>
        <input
          type="text"
          id="address"
          placeholder="Lead address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          className={styles.input}
        />

        {/* Lead Source Dropdown */}
        <label htmlFor="leadSource" className={styles.label}>Lead Source</label>
        <select
          id="leadSource"
          value={selectedLeadSource}
          onChange={(e) => setSelectedLeadSource(e.target.value)}
          required
          className={styles.select}
        >
          <option value="" disabled>Select lead source</option>
          <option value="Website">Website</option>
          <option value="Referral">Referral</option>
          <option value="Cold Call">Cold Call</option>
          <option value="Event">Event</option>
          <option value="Other">Other</option>
        </select>
        {selectedLeadSource === 'Other' && (
          <>
            <label htmlFor="customLeadSource" className={styles.label}>Please specify</label>
            <input
              type="text"
              id="customLeadSource"
              placeholder="Enter custom lead source"
              value={customLeadSource}
              onChange={(e) => setCustomLeadSource(e.target.value)}
              required
              className={styles.input}
            />
          </>
        )}

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" className={styles.submitBtn}>
          Submit
        </button>
      </form>
    </div>
  );
}
