import React, { useEffect, useState } from 'react';
import { db } from './firebase'; 
import { collection, getDocs, addDoc } from 'firebase/firestore';


function DefaultCode() {
    const [employees, setEmployees] = useState([]); 
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEmployees = async () => { 
            try {
                const querySnapshot = await getDocs(collection(db, "Employees"));
                const employeesList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setEmployees(employeesList); 
            } catch (err) {
                console.error("Error fetching data", err);
                setError("Error fetching data");
            }
        };

        fetchEmployees(); 
    }, []);
    const handleAddEmployee = async () => {
        try {
            await addDoc(collection(db, "Employees"), {
                firstName: "Basel",
                lastName: "Elnoury",
                email: " Basel@example.com",
                Date: "2025-04-14",
                salary: "10000"
            });
            alert("Employee added successfully!");
    
            // إعادة تحميل البيانات بعد الإضافة
            const querySnapshot = await getDocs(collection(db, "Employees"));
            const employeesList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setEmployees(employeesList);
            
        } catch (err) {
            console.error("Error adding document: ", err);
            setError("Error adding employee");
        }
    };
    
    return (
        <>
            <h1>Login Page</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {employees.map(employee => ( 
                    <li key={employee.id}>
                        {employee.firstName} - {employee.lastName} - {employee.email} - {employee.Date} - {employee.salary}
                    </li>
                ))}
            </ul>
            <button onClick={handleAddEmployee}>Add Employee</button>

        </>
    );
}

export default DefaultCode;
