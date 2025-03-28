//importations nécessaires
import React from 'react';
import { Row, Col } from 'react-bootstrap';

//composant qui affiche un message de retour à l'accueil après une déconnexion
function Accueil() {
    return (
        <Row className="justify-content-center" style={{ marginTop: '30px' }}>
        <Col style = {{color: 'red'}}>
            <h2>Vous vous êtes déconnecté</h2>
            <h4>A bientôt!!</h4>
        </Col>
    </Row>
    );
}

export default Accueil;

