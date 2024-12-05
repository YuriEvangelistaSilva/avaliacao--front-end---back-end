import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const JogoPage = () => {
  const [jogos, setJogos] = useState([]);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/jogos')
      .then(response => {
        console.log(response); // Verifique a estrutura da resposta
        setJogos(response.data._embedded.jogoDtoList || []); // Ajuste conforme a estrutura correta
      })
      .catch(err => {
        console.error('Erro ao buscar jogos:', err);
        setError(true);
      });
  }, []);

  const deleteJogo = (jogoId) => {
    api.delete(`/jogos/${jogoId}`)
      .then(() => {
        setJogos(prevJogos => prevJogos.filter(jogo => jogo.id !== jogoId)); // Corrigido para usar a função de atualização do estado
        alert('Jogo excluído com sucesso!');
      })
      .catch(err => console.error('Erro ao excluir jogo:', err));
  };

  const handleEdit = (jogoId) => {
    navigate(`/jogos/update/${jogoId}`);
  };

  const handleCreate = () => {
    navigate('/jogos/create');
  };

  return (
    <Container style={{ marginTop: '50px', marginLeft: '11%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <h2>Jogos</h2>
      {error && <p style={{ color: 'red' }}>Erro ao carregar os dados.</p>}
      <Button variant="success" style={{ marginBottom: '20px' }} onClick={handleCreate}>Cadastrar Novo Jogo</Button>
      <Row>
        {jogos.map(jogo => (
          <Col key={jogo.id} sm={12} md={6} lg={4}>
            <Card style={{ marginBottom: '20px' }}>
              <Card.Body>
                <Card.Title>{jogo.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{jogo.gender}</Card.Subtitle>
                <Button variant="primary" onClick={() => handleEdit(jogo.id)}>Editar</Button>
                <Button variant="danger" style={{ marginLeft: '10px' }} onClick={() => deleteJogo(jogo.id)}>
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

export default JogoPage;
