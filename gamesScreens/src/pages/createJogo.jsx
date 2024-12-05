import React, { useState } from 'react';
import api from '../services/api';  // Certifique-se de que esse caminho está correto
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CreateJogo = () => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const navigate = useNavigate();

  // Função que será chamada quando o formulário for enviado
  const handleSubmit = (e) => {
    e.preventDefault(); // Impede o comportamento padrão do formulário

    // Objeto com os dados do novo jogo
    const newJogo = { name, gender };

    // Log para verificar o que está sendo enviado
    console.log('Novo Jogo:', newJogo);

    // Enviar os dados via POST
    api.post('/jogos', newJogo)
      .then(response => {
        console.log('Resposta da API:', response); // Verifique o que a API responde
        alert('Jogo cadastrado com sucesso!');
        navigate('/jogos');  // Redireciona após o cadastro
      })
      .catch(err => {
        // Verificação detalhada de erro
        if (err.response) {
          console.error('Erro ao cadastrar jogo:', err.response.data); // Log completo do erro
          alert(`Erro ao cadastrar o jogo: ${err.response.data.message || err.response.data}`);
        } else if (err.request) {
          // Erro quando não há resposta da API
          console.error('Erro de rede ou sem resposta da API:', err.request);
          alert('Erro ao se comunicar com o servidor. Tente novamente.');
        } else {
          // Outro tipo de erro
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
      }}>
      <h2>Cadastrar Novo Jogo</h2>
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
          Cadastrar
        </Button>
      </Form>
    </Container>
  );
};

export default CreateJogo;
