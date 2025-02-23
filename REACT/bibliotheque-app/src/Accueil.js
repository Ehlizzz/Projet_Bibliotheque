import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Accueil() {
    return (
        <Row className="justify-content-center" style={{ marginTop: '30px' }}>
        <Col xs={12} md={8} className="text-center">
            <h2>Veuillez vous connecter ou vous inscrire</h2>
            <p>Si ce n'est pas encore fait!</p>
        </Col>
    </Row>
    );
}

export default Accueil;

