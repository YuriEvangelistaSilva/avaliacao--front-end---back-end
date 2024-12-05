import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const EditJogo = () => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [loading, setLoading] = useState(true); // Estado para controle de carregamento
  const { jogoId } = useParams();
  const navigate = useNavigate();

  // Carregar o jogo para edição
  useEffect(() => {
    api.get(`/jogos/${jogoId}`)
      .then(response => {
        setName(response.data.name);
        setGender(response.data.gender);
        setLoading(false);  // Termina o carregamento
      })
      .catch(err => {
        console.error('Erro ao carregar o jogo:', err);
        alert('Erro ao carregar o jogo para edição. Veja o console para mais detalhes.');
        setLoading(false);  // Termina o carregamento em caso de erro
      });
  }, [jogoId]);

  // Manipular o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedJogo = { name, gender, id:jogoId };

    api.put(`/jogos`, updatedJogo)
      .then(response => {
        if (response.status === 200) {
          alert('Jogo atualizado com sucesso!');
          navigate('/jogos');
        } else {
          alert('Erro inesperado ao atualizar o jogo.');
        }
      })
      .catch(err => {
        console.error('Erro ao atualizar o jogo:', err);
        alert('Erro ao atualizar o jogo. Veja o console para mais detalhes.');
      });
  };

  // Se o jogo estiver carregando, mostrar uma mensagem de loading
  if (loading) {
    return (
      <Container 
        style={{
          marginTop: '50px',
          marginLeft: '11%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
        <h2>Carregando...</h2>
      </Container>
    );
  }

  return (
    <Container 
      style={{
        marginTop: '50px',
        marginLeft: '11%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
      <h2>Editar Jogo</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formJogoName">
          <Form.Label>Título</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o título do jogo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ marginBottom: '1rem' }} 
          />
        </Form.Group>
        <Form.Group controlId="formJogoGender">
          <Form.Label>Gênero</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o gênero do jogo"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
            style={{ marginBottom: '1rem' }} 
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Atualizar
        </Button>
      </Form>
    </Container>
  );
};

export default EditJogo;
