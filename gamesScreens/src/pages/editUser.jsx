import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const EditUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [nascimento, setNascimento] = useState('');  // Novo estado para data de nascimento
  const [jogos, setJogos] = useState([]);
  const [selectedJogoId, setSelectedJogoId] = useState(null);
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/users/${userId}`)
      .then(response => {
        setName(response.data.name);
        setEmail(response.data.email);
        setNascimento(response.data.nascimento || '');  // Definir a data de nascimento se existir
        setSelectedJogoId(response.data.jogo ? response.data.jogo.id : null);
      })
      .catch(err => console.error('Erro ao carregar usuario:', err));

    api.get('/jogos')
      .then(response => {
        setJogos(response.data._embedded.jogoDtoList || []);
      })
      .catch(err => console.error('Erro ao carregar jogos:', err));
  }, [userId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedUser = {
      id: userId,
      name,
      email,
      nascimento,  // Incluir data de nascimento no corpo da requisição
      jogo: selectedJogoId ? { id: selectedJogoId } : null, // Atualizar associação com o jogo
    };

    api.put(`/users`, updatedUser)
      .then(() => {
        alert('Usuario atualizado com sucesso!');
        navigate('/users');
      })
      .catch(err => {
        console.error('Erro ao atualizar usuario:', err);
        alert('Erro ao atualizar o usuario.');
      });
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
      <h2>Editar Usuario</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUserName" style={{ marginBottom: '1rem' }}>
          <Form.Label style={{ marginBottom: '0.5rem' }}>Nome Completo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o nome completo do usuario"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ marginBottom: '1rem' }}
          />
        </Form.Group>
        
        <Form.Group controlId="formUserEmail" style={{ marginBottom: '1rem' }}>
          <Form.Label style={{ marginBottom: '0.5rem' }}>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o email do usuario"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ marginBottom: '1rem' }} 
          />
        </Form.Group>

        {/* Novo campo para data de nascimento */}
        <Form.Group controlId="formUserNascimento" style={{ marginBottom: '1rem' }}>
          <Form.Label style={{ marginBottom: '0.5rem' }}>Data de Nascimento</Form.Label>
          <Form.Control
            type="date"
            value={nascimento}
            onChange={(e) => setNascimento(e.target.value)}
            required
            style={{ marginBottom: '1rem' }}
          />
        </Form.Group>
        
        <Form.Group controlId="formUserJogo" style={{ marginBottom: '1rem' }}>
          <Form.Label style={{ marginBottom: '0.5rem' }}>Associar a um Jogo</Form.Label>
          <Form.Control
            as="select"
            value={selectedJogoId || ''}
            onChange={(e) => setSelectedJogoId(e.target.value)}
            style={{ marginBottom: '1rem' }} 
          >
            <option value="">Nenhum</option>
            {jogos.map(jogo => (
              <option key={jogo.id} value={jogo.id}>
                {jogo.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        
        <Button variant="primary" type="submit">
          Atualizar
        </Button>
      </Form>
    </Container>
  );
};

export default EditUser;
