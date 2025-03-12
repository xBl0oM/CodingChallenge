// pages/customers.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../styles/protected.module.css';

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [role, setRole] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setRole(localStorage.getItem('role'));
    if (!token) {
      router.push('/login');
      return;
    }
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/customers`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setCustomers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching customers:', err);
        setLoading(false);
      });
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // When a row is clicked, show full customer information.
  const handleRowClick = (customer) => {
    setSelectedCustomer(customer);
  };

  const closeModal = () => {
    setSelectedCustomer(null);
  };

  // Navigate to an edit page for the customer.
  const handleEdit = (customerId) => {
    router.push(`/edit-customer/${customerId}`);
  };

  // Delete the customer using a DELETE request.
  const handleDelete = (customerId) => {
    const token = localStorage.getItem('token');
    axios
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/customers/${customerId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() =>
        setCustomers((prev) => prev.filter((c) => c.id !== customerId))
      )
      .catch((err) =>
        console.error('Error deleting customer:', err)
      );
  };

  return (
    <div className={styles.leadsPage}>
      <h1 className={styles.pageTitle}>Customers</h1>
      <table className={styles.leadsTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Lead Source</th>
            {role === "MANAGER" && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr
              key={customer.id}
              className={styles.leadRow}
              onClick={() => handleRowClick(customer)}
            >
              <td>{customer.name}</td>
              <td>{customer.leadSource}</td>
              {role === "MANAGER" && (
                <td onClick={(e) => e.stopPropagation()}>
                  <button
                    className={styles.editBtn}
                    onClick={() => handleEdit(customer.id)}
                  >
                    Edit
                  </button>
                  <button
                    className={`${styles.actionBtn} ${styles.deleteBtn}`}
                    onClick={() => handleDelete(customer.id)}
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {selectedCustomer && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={closeModal}>
              X
            </button>
            <h2>{selectedCustomer.name}</h2>
            <p>
              <strong>Sex:</strong> {selectedCustomer.sex}
            </p>
            <p>
              <strong>Gender:</strong> {selectedCustomer.gender}
            </p>
            <p>
              <strong>Address:</strong> {selectedCustomer.address}
            </p>
            <p>
              <strong>Lead Source:</strong> {selectedCustomer.leadSource}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
