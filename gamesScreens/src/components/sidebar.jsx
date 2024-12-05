import React from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <ul className="navbar-nav sidebar-menu">
                <li className="nav-item">
                    <NavLink to="/" className="nav-link">
                        <i className="fas fa-home"></i>
                        <span>Home</span>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/jogos" className="nav-link">
                        <i className="fas fa-jogo"></i>
                        <span>Jogos</span>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/users" className="nav-link">
                        <i className="fas fa-user"></i>
                        <span>Users</span>
                    </NavLink>
                </li>
            </ul>
            
        </div>
    );
};

export default Sidebar;
