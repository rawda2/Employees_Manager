import React, { useEffect } from 'react';
import Header from '../../Components/Header/Header';
import style from './Dashboard.module.css';
import { Container } from 'react-bootstrap';
import Tableshow from './../../Components/Tableshow';
function Dashboard() {
    useEffect(() => {
        document.body.style.backgroundColor = 'rgba(0, 183, 255, 0.533)';
        return () => {
            document.body.style.backgroundColor = ''; 
        };
    }, []);

    return (
        <>
            <Container className={style.Container}>
                <Header />
                <Tableshow />
            </Container>
        </>
    );
}

export default Dashboard;
