import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchUsers = () => {
    api.get('/users')
      .then(response => {
        const usersList = response.data._embedded?.userDtoList || [];
        setUsers(usersList);
        setError(false);
      })
      .catch(err => {
        console.error('Erro ao buscar usuarios:', err);
        setError(true);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, [location]);

  const deleteUser = (userId) => {
    api.delete(`/users/${userId}`)
      .then(() => {
        alert('Usuario excluído com sucesso!');
        fetchUsers();
      })
      .catch(err => console.error('Erro ao excluir usuario:', err));
  };

  const handleCreate = () => {
    navigate('/users/create');
  };

  const handleEdit = (userId) => {
    navigate(`/users/update/${userId}`);
  };

  return (
    <Container
      style={{
        marginTop: '50px',
        marginLeft: '11%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
      <h2>Usuarios</h2>
      {error && <p style={{ color: 'red' }}>Erro ao carregar os dados.</p>}
      <Button variant="success" style={{ marginBottom: '20px' }} onClick={handleCreate}>
        Cadastrar Novo Usuario
      </Button>
      <Row>
        {users.map(user => (
          <Col key={user.id} sm={12} md={6} lg={4}>
            <Card style={{ marginBottom: '20px' }}>
              <Card.Body>
                <Card.Title>{user.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{user.email}</Card.Subtitle>
                {/* Exibindo a data de nascimento */}
                {user.nascimento && (
                  <Card.Text>Data de Nascimento: {user.nascimento}</Card.Text>
                )}
                {user.jogo && <Card.Text>Jogo: {user.jogo.name}</Card.Text>}
                <Button variant="primary" onClick={() => handleEdit(user.id)}>
                  Editar
                </Button>
                <Button variant="danger" style={{ marginLeft: '10px' }} onClick={() => deleteUser(user.id)}>
                  Excluir
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default UsersPage;
