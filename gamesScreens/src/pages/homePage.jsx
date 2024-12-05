import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Container, Row, Col } from 'react-bootstrap';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container
      style={{
        marginTop: '50px',
        marginLeft: '11%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
      <h1>Bem-vindo à Biblioteca</h1>
      <Row className="justify-content-center">
        <Col sm={12} md={6}>
          <Card 
            onClick={() => navigate('/jogos')} 
            style={{ cursor: 'pointer', marginBottom: '20px' }}>
            <Card.Img 
              variant="top" 
              src="https://ogimg.infoglobo.com.br/in/23001849-c2f-667/FT1086A/INFOCHPDPICT000041975439.jpg"
              style={{ height: '300px', objectFit: 'cover' }} 
            />
            <Card.Body>
              <Card.Title style={{ textAlign: 'center' }}>Jogo</Card.Title>
              <Card.Text style={{ textAlign: 'center' }}>
                Clique para gerenciar os jogos da biblioteca.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={12} md={6}>
          <Card 
            onClick={() => navigate('/users')} 
            style={{ cursor: 'pointer', marginBottom: '20px' }}>
            <Card.Img 
              variant="top" 
              src="https://static.prod01.ue1.p.pcomm.net/blackbaud/user_content/photos/000/006/6783/a6132a5cd55abcae190bc82567ca8a47-original-users.png"
              style={{ height: '300px', objectFit: 'cover' }} 
            />
            <Card.Body>
              <Card.Title style={{ textAlign: 'center' }}>Usuarios</Card.Title>
              <Card.Text style={{ textAlign: 'center' }}>
                Clique para gerenciar os usuarioes da biblioteca.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
