
import React, { useState } from 'react';
import { Form, Field, Formik, ErrorMessage } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSave, faUndo, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Modal, ProgressBar, Container, Row, Col, Card, Button, Alert, CloseButton } from 'react-bootstrap';
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";

// Helper for today's date in yyyy-mm-dd format
const getToday = () => {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
};

function Create() {

    const validationSchema = Yup.object({
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
        phone: Yup.string().matches(/^\d{11}$/, 'Phone number must be 11 digits').required('Phone number is required'),
        address: Yup.string().required('Address is required'),
        city: Yup.string().required('City is required'),
        zipCode: Yup.string().matches(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code').required('ZIP code is required'),
        salary: Yup.number().required('Salary is required').positive('Salary must be a positive number').integer('Salary must be an integer'),
        date: Yup.string().required('Date is required')
    });

    // Modal state
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState(null);
    const navigate = useNavigate();

    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        zipCode: '',
        salary: '',
        date: getToday()
    };

    // Form submission
    const handleSubmit = (values) => {
        setFormData(values);
        setShowModal(true);
    };

    // Close form
    const handleClose = () => {
        if (window.confirm('Are you sure you want to close the form? All unsaved data will be lost.')) {
            navigate("/dashboard");
        }
    };

    const handleSave = async () => {
        try {
            // Save the form data to the 'Employees' collection
            const docRef = await addDoc(collection(db, "Employees"), formData);
            console.log("Document written with ID: ", docRef.id);

            setShowModal(false);
            alert("Form submitted successfully!");
            navigate("/dashboard");

        } catch (error) {
            console.error("Error adding document: ", error);
            alert("Something went wrong. Please try again.");
        }
    };


    return (
        <Container className="py-4">
            <Card>
                <Card.Header className="d-flex justify-content-between align-items-center bg-primary text-white">
                    <h3 className="mb-0">Add New Employee</h3>
                    <CloseButton onClick={handleClose} aria-label="Close">
                    </CloseButton>
                </Card.Header>

                <Card.Body>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                        validateOnChange={true}
                        validateOnBlur={true}
                    >
                        {({ values, errors, touched, isValid, dirty, resetForm }) => {
                            const totalFields = Object.keys(validationSchema.fields).length;
                            let validCount = 0;

                            // Count valid fields (have a value and no error)
                            Object.keys(validationSchema.fields).forEach(field => {
                                if (values[field] && (!errors[field] || !touched[field])) {
                                    validCount++;
                                }
                            });
                            const progress = Math.floor((validCount / totalFields) * 100);

                            return (
                                <Form>
                                    {/* Progress Bar */}
                                    <div className="mb-4">
                                        <div className="d-flex justify-content-between mb-1">
                                            <span>Form Completion</span>
                                            <span>{progress}%</span>
                                        </div>
                                        <ProgressBar
                                            now={progress}
                                            variant={progress < 50 ? 'danger' : progress < 80 ? 'warning' : 'success'}
                                        />
                                    </div>

                                    <Row>
                                        <Col md={6}>
                                            <div className="mb-3">
                                                <label htmlFor="firstName" className="form-label">First Name</label>
                                                <Field
                                                    name="firstName"
                                                    type="text"
                                                    className={`form-control ${errors.firstName && touched.firstName ? 'is-invalid' : ''}`}
                                                />
                                                <ErrorMessage
                                                    name="firstName"
                                                    component="div"
                                                    className="invalid-feedback"
                                                />
                                            </div>
                                        </Col>

                                        <Col md={6}>
                                            <div className="mb-3">
                                                <label htmlFor="lastName" className="form-label">Last Name</label>
                                                <Field
                                                    name="lastName"
                                                    type="text"
                                                    className={`form-control ${errors.lastName && touched.lastName ? 'is-invalid' : ''}`}
                                                />
                                                <ErrorMessage
                                                    name="lastName"
                                                    component="div"
                                                    className="invalid-feedback"
                                                />
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col md={6}>
                                            <div className="mb-3">
                                                <label htmlFor="email" className="form-label">Email</label>
                                                <Field
                                                    name="email"
                                                    type="email"
                                                    className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`}
                                                    placeholder='user@user.com'
                                                />
                                                <ErrorMessage
                                                    name="email"
                                                    component="div"
                                                    className="invalid-feedback"
                                                />
                                            </div>
                                        </Col>

                                        <Col md={6}>
                                            <div className="mb-3">
                                                <label htmlFor="phone" className="form-label">Phone Number</label>
                                                <Field
                                                    name="phone"
                                                    type="tel"
                                                    placeholder="1234567890"
                                                    className={`form-control ${errors.phone && touched.phone ? 'is-invalid' : ''}`}
                                                />
                                                <ErrorMessage
                                                    name="phone"
                                                    component="div"
                                                    className="invalid-feedback"
                                                />
                                            </div>
                                        </Col>
                                    </Row>

                                    <div className="mb-3">
                                        <label htmlFor="address" className="form-label">Address</label>
                                        <Field
                                            name="address"
                                            type="text"
                                            className={`form-control ${errors.address && touched.address ? 'is-invalid' : ''}`}
                                            placeholder='Street, District...'
                                        />
                                        <ErrorMessage
                                            name="address"
                                            component="div"
                                            className="invalid-feedback"
                                        />
                                    </div>

                                    <Row>
                                        <Col md={8}>
                                            <div className="mb-3">
                                                <label htmlFor="city" className="form-label">City</label>
                                                <Field
                                                    name="city"
                                                    type="text"
                                                    className={`form-control ${errors.city && touched.city ? 'is-invalid' : ''}`}
                                                />
                                                <ErrorMessage
                                                    name="city"
                                                    component="div"
                                                    className="invalid-feedback"
                                                />
                                            </div>
                                        </Col>

                                        <Col md={4}>
                                            <div className="mb-3">
                                                <label htmlFor="zipCode" className="form-label">ZIP Code</label>
                                                <Field
                                                    name="zipCode"
                                                    type="text"
                                                    placeholder="12345"
                                                    className={`form-control ${errors.zipCode && touched.zipCode ? 'is-invalid' : ''}`}
                                                />
                                                <ErrorMessage
                                                    name="zipCode"
                                                    component="div"
                                                    className="invalid-feedback"
                                                />
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col md={6}>
                                            <div className="mb-3">
                                                <label htmlFor="salary" className="form-label">Salary</label>
                                                <Field
                                                    name="salary"
                                                    type="number"
                                                    className={`form-control ${errors.salary && touched.salary ? 'is-invalid' : ''}`}
                                                    placeholder="0"
                                                />
                                                <ErrorMessage
                                                    name="salary"
                                                    component="div"
                                                    className="invalid-feedback"
                                                />
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className="mb-3">
                                                <label htmlFor='date' className='form-label'>Date</label>
                                                <Field
                                                    name="date"
                                                    type="date"
                                                    className={`form-control ${errors.date && touched.date ? 'is-invalid' : ''}`}
                                                    max={getToday()}
                                                />
                                                <ErrorMessage
                                                    name="date"
                                                    component="div"
                                                    className="invalid-feedback"
                                                />
                                            </div>
                                        </Col>
                                    </Row>

                                    <div className="d-flex justify-content-end gap-2 mt-4">
                                        <Button
                                            variant="secondary"
                                            onClick={() => resetForm()}
                                            disabled={!dirty}
                                        >
                                            <FontAwesomeIcon icon={faUndo} /> Reset
                                        </Button>
                                        <Button
                                            variant="primary"
                                            type="submit"
                                            // disabled={!isValid || !dirty}
                                        >
                                            <FontAwesomeIcon icon={faSave} /> Save
                                        </Button>
                                    </div>
                                </Form>
                            );
                        }}
                    </Formik>
                </Card.Body>
            </Card>

            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                centered
                dialogClassName="create-bootstrap-modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Submission</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {formData && (
                        <>
                            <Alert variant="info">
                                Please review your information before final submission:
                            </Alert>
                            <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
                            <p><strong>Email:</strong> {formData.email}</p>
                            <p><strong>Phone:</strong> {formData.phone}</p>
                            <p><strong>Address:</strong> {formData.address}</p>
                            <p><strong>City:</strong> {formData.city}</p>
                            <p><strong>ZIP Code:</strong> {formData.zipCode}</p>
                            <p><strong>Salary:</strong> {formData.salary}</p>
                            <p><strong>Date:</strong> {formData.date}</p>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        <FontAwesomeIcon icon={faTimes} /> Cancel
                    </Button>
                    <Button variant="success" onClick={handleSave}>
                        <FontAwesomeIcon icon={faCheck} /> Confirm & Submit
                    </Button>
                </Modal.Footer>
            </Modal>

        </Container>         
    );
}

export default Create;