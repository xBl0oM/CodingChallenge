import { useEffect, useState } from "react";
import { Container, Title, Text, Button, Loader } from "@mantine/core";
import axios from "axios";
import { useRouter } from "next/router";

export default function ProtectedPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isManager, setIsManager] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    console.log("Logged in user role:", role);  // Log the role for debugging

    if (!token) {
      router.push("/login");
      return;
    }
    
    if (role === "MANAGER") {
      setIsManager(true);
    }
    
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/leads`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching leads:", error);
        setLoading(false);
      });
  }, [router]);

  const deleteLead = (id) => {
    const token = localStorage.getItem("token");
    axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/leads/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        setData(data.filter(lead => lead.id !== id));
      })
      .catch(error => console.error("Error deleting lead:", error));
  };

  if (loading) return <Loader />;

  return (
    <Container my="xl">
      <Title>Leads</Title>
      {data.length > 0 ? (
        data.map(lead => (
          <div key={lead.id}>
            <Text mt="md">{lead.name} - {lead.leadSource}</Text>
            {isManager && (
              <>
                <Button color="red" onClick={() => deleteLead(lead.id)}>Delete</Button>
                <Button onClick={() => router.push(`/edit-lead/${lead.id}`)}>Edit</Button>
              </>
            )}
          </div>
        ))
      ) : (
        <Text mt="md">No leads available.</Text>
      )}

      {isManager && (
        <Button mt="xl" onClick={() => router.push("/add-lead")}>
          Add New Lead
        </Button>
      )}

      <Button mt="xl" onClick={() => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        router.push("/login");
      }}>
        Logout
      </Button>
    </Container>
  );
}
