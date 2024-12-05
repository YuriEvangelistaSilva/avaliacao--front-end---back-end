import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CreateUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [nascimento, setNascimento] = useState('');
  const [jogos, setJogos] = useState([]);
  const [selectedJogoId, setSelectedJogoId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Carregar a lista de jogos do servidor
    api.get('/jogos')
      .then(response => {
        const jogosList = response.data._embedded?.jogoDtoList || [];
        setJogos(jogosList);
      })
      .catch(err => {
        console.error('Erro ao carregar jogos:', err);
        alert('Erro ao carregar os jogos. Veja o console para mais detalhes.');
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar se os dados estão corretos antes de enviar
    if (!name || !email || !nascimento) {
      alert('Preencha todos os campos obrigatórios.');
      return;
    }

    // Criar o objeto do novo usuário
    const newUser = {
      name,
      email,
      nascimento,
      jogo: selectedJogoId ? { id: selectedJogoId } : null,
    };

    // Enviar os dados via API
    api.post('/users', newUser)
      .then(() => {
        alert('Usuário cadastrado com sucesso!');
        navigate('/users');
      })
      .catch(err => {
        if (err.response) {
          console.error('Erro ao cadastrar usuário:', err.response.data);
          alert(`Erro ao cadastrar o usuário: ${err.response.data.message || err.response.data}`);
        } else {
          console.error('Erro desconhecido:', err);
          alert('Erro desconhecido. Veja o console para mais detalhes.');
        }
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
      }}
    >
      <h2>Cadastrar Novo Usuário</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUserName">
          <Form.Label>Nome Completo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o nome completo do usuário"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ marginBottom: '1rem' }}
          />
        </Form.Group>

        <Form.Group controlId="formUserEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Digite o email do usuário"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ marginBottom: '1rem' }}
          />
        </Form.Group>

        <Form.Group controlId="formUserNascimento">
          <Form.Label>Data de Nascimento</Form.Label>
          <Form.Control
            type="date"
            value={nascimento}
            onChange={(e) => setNascimento(e.target.value)}
            required
            style={{ marginBottom: '1rem' }}
          />
        </Form.Group>

        <Form.Group controlId="formUserJogo">
          <Form.Label>Associar a um Jogo</Form.Label>
          <Form.Control
            as="select"
            value={selectedJogoId}
            onChange={(e) => setSelectedJogoId(e.target.value)}
          >
            <option value="">Nenhum</option>
            {jogos.map((jogo) => (
              <option key={jogo.id} value={jogo.id}>
                {jogo.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit">
          Cadastrar
        </Button>
      </Form>
    </Container>
  );
};

export default CreateUser;
