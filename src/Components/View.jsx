
import React from "react";
import { Modal, Button, Alert } from "react-bootstrap";

const View = ({ employee, show, onClose }) => {
  // Use the "show" prop to control modal visibility (Bootstrap Modal pattern)
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Employee Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!employee ? (
          <Alert variant="warning">No employee data available.</Alert>
        ) : (
          <>
            <p>
              <strong>Name:</strong> {employee.firstName} {employee.lastName}
            </p>
            <p>
              <strong>Email:</strong> {employee.email}
            </p>
            <p>
              <strong>Phone:</strong> {employee.phone || "N/A"}
            </p>
            <p>
              <strong>Address:</strong> {employee.address || "N/A"}
            </p>
            <p>
              <strong>City:</strong> {employee.city || "N/A"}
            </p>
            <p>
              <strong>Zip Code:</strong> {employee.zipCode || "N/A"}
            </p>
            <p>
              <strong>Salary:</strong> ${employee.salary}
            </p>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default View;