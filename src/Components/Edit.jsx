import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "./firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Form, Button, Container } from "react-bootstrap";

function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    salary: "",
    Date: "",
  });

  useEffect(() => {
    const fetchEmployee = async () => {
      const docRef = doc(db, "Employees", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFormData(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, "Employees", id);
      await updateDoc(docRef, formData);
      alert("Employee updated successfully!");
      navigate("/dashboard"); // ✅ Go back to dashboard
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  const handleCancel = () => {
    navigate("/dashboard"); // ✅ Cancel and return to dashboard
  };

  return (
    <Container style={{ maxWidth: "600px", marginTop: "30px" , border: "3px solid black" , padding: "20px"}}>
      <h2 className="text-center">Edit Employee</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Salary</Form.Label>
          <Form.Control
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            name="Date"
            value={formData.Date}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <div className="d-flex justify-content-between">
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Update Employee
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default Edit;
