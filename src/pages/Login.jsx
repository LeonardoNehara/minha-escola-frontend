import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UsuarioService from '../api/UsuarioService';
import '../styles/global.css'; 

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await UsuarioService.login({ email, password });
      localStorage.setItem('user', JSON.stringify(response.data));
      if (remember) localStorage.setItem('rememberMe', 'true');
      navigate('/');
    } catch (err) {
      setError('Email ou senha incorretos');
    }
  };

  return (
    <div className="bg-primary vh-100 d-flex justify-content-center align-items-center">
      <div className="card shadow-lg border-0 rounded-lg" style={{ width: '400px' }}>
        <div className="card-header">
          <h3 className="text-center font-weight-light my-4">Login</h3>
        </div>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleLogin}>
            <div className="form-floating mb-3">
              <input
                className="form-control"
                id="inputEmail"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="inputEmail">Email</label>
            </div>
            <div className="form-floating mb-3">
              <input
                className="form-control"
                id="inputPassword"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="inputPassword">Senha</label>
            </div>
            <div className="form-check mb-3">
              <input
                className="form-check-input"
                id="inputRememberPassword"
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="inputRememberPassword">
                Lembrar Senha
              </label>
            </div>
            <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
              <a className="small" href="/forgot-password">Esqueceu sua senha?</a>
              <button type="submit" className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
        <div className="card-footer text-center py-3">
          <div className="small">
            <a href="/register">Precisa de uma conta? Cadastre-se!</a>
          </div>
        </div>
      </div>
    </div>
  );
}
