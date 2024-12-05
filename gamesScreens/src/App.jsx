import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/homePage';
import JogoPage from './pages/jogoPage'; // Corrigido para JogoPage
import CreateJogo from './pages/createJogo';
import EditJogo from './pages/editJogo';
import UserPage from './pages/userPage';
import CreateUser from './pages/createUser';
import EditUser from './pages/editUser';
import { Container } from 'react-bootstrap';
import TopBar from './components/topbar';
import Sidebar from './components/sidebar';


const App = () => {
  return (
    <Router>
      <div className="app">
        <TopBar />

        <div className="main-content">
          <Sidebar />

          <Container>
            <div className="page-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/jogos" element={<JogoPage />} />
                <Route path="/jogos/create" element={<CreateJogo />} />
                <Route path="/jogos/update/:jogoId" element={<EditJogo />} />
                <Route path="/users" element={<UserPage />} />
                <Route path="/users/create" element={<CreateUser />} />
                <Route path="/users/update/:userId" element={<EditUser />} />
              </Routes>
            </div>
          </Container>
        </div>
      </div>
    </Router>
  );
};

export default App;
