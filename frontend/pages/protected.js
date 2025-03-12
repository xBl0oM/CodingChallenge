// pages/protected.js
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "../styles/protected.module.css";

export default function ProtectedPage() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkedAuth, setCheckedAuth] = useState(false);
  const [role, setRole] = useState("");
  const [selectedLead, setSelectedLead] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    setCheckedAuth(true);
    setRole(localStorage.getItem("role"));

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/leads`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setLeads(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching leads:", err);
        setLoading(false);
      });
  }, [router]);

  if (!checkedAuth || loading) {
    return <div className={styles.loader}>Loading...</div>;
  }

 
  const handleRowClick = (lead) => {
    setSelectedLead(lead);
  };


  const closeModal = () => {
    setSelectedLead(null);
  };

  // Delete a lead (manager only)
  const handleDelete = (leadId) => {
    const token = localStorage.getItem("token");
    axios
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/leads/${leadId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => setLeads((prev) => prev.filter((l) => l.id !== leadId)))
      .catch((err) => console.error(err));
  };

  // Edit a lead (manager only)
  const handleEdit = (leadId) => {
    router.push(`/edit-lead/${leadId}`);
  };

  return (
    <div className={styles.leadsPage}>
      <h1 className={styles.pageTitle}>Leads Page</h1>
      <table className={styles.leadsTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Lead Source</th>
            {role === "MANAGER" && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr
              key={lead.id}
              className={styles.leadRow}
              onClick={() => handleRowClick(lead)}
            >
              <td>{lead.name}</td>
              <td>{lead.leadSource}</td>
              {role === "MANAGER" && (
                <td
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <button
                    className={`${styles.editBtn} ${styles.editBtn}`}
                    onClick={() => handleEdit(lead.id)}
                  >
                    Edit
                  </button>
                  <button
                    className={`${styles.actionBtn} ${styles.deleteBtn}`}
                    onClick={() => handleDelete(lead.id)}
                  >
                    Delete
                  </button>
                  <button
                    className={`${styles.actionBtn} ${styles.convertBtn}`}
                    onClick={() => handleDelete(lead.id)}
                  >
                    Convert to customer
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {selectedLead && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={closeModal}>
              X
            </button>
            <h2>{selectedLead.name}</h2>
            <p>
              <strong>Sex:</strong> {selectedLead.sex}
            </p>
            <p>
              <strong>Gender:</strong> {selectedLead.gender}
            </p>
            <p>
              <strong>Address:</strong> {selectedLead.address}
            </p>
            <p>
              <strong>Lead Source:</strong> {selectedLead.leadSource}
            </p>
          </div>
        </div>
      )}

      {role === "MANAGER" && (
        <button
          className={styles.addLeadBtn}
          onClick={() => router.push("/add-lead")}
        >
          Add Lead
        </button>
      )}
    </div>
  );
}
