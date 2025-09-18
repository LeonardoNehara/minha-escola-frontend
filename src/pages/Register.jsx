import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UsuarioService from '../api/UsuarioService';
import FormField from '../components/common/FormField';
import { notifySuccess, notifyError } from '../utils/notifications';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    primeiroNome: '',
    ultimoNome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    telefone: '',
    cargo: '',
    escolaId: '',
  });

  const cargos = ['Professor', 'Coordenador', 'Diretor', 'Secretaria'];

  const escolas = [
    { id: 1, nome: 'Escola A' },
    { id: 2, nome: 'Escola B' },
    { id: 3, nome: 'Escola C' },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.senha !== formData.confirmarSenha) {
      notifyError('As senhas não conferem');
      return;
    }

    try {
      await UsuarioService.cadastrar({
        nome: `${formData.primeiroNome} ${formData.ultimoNome}`,
        email: formData.email,
        senha: formData.senha,
        telefone: formData.telefone,
        cargo: formData.cargo,
        escolaId: formData.escolaId,
      });
      notifySuccess('Conta criada com sucesso!');
      navigate('/login');
    } catch (err) {
      notifyError('Erro ao criar a conta');
    }
  };

  return (
    <div className="bg-primary min-vh-100 d-flex justify-content-center align-items-center py-5">
      <div className="card shadow-lg border-0 rounded-lg" style={{ width: '600px' }}>
        <div className="card-header">
          <h3 className="text-center font-weight-light my-4">Criar Conta</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-6">
                <FormField
                  label="Primeiro Nome"
                  name="primeiroNome"
                  type="text"
                  value={formData.primeiroNome}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <FormField
                  label="Sobrenome"
                  name="ultimoNome"
                  type="text"
                  value={formData.ultimoNome}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <FormField
              label="E-mail"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <FormField
              label="Telefone"
              name="telefone"
              type="tel"
              value={formData.telefone}
              onChange={handleChange}
              required
            />

            <div className="form-floating mb-3">
              <select
                className="form-select"
                id="cargo"
                name="cargo"
                value={formData.cargo}
                onChange={handleChange}
                required
              >
                <option value="">Selecione um cargo</option>
                {cargos.map((c, index) => (
                  <option key={index} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <label htmlFor="cargo">Cargo</label>
            </div>

            <div className="form-floating mb-3">
              <select
                className="form-select"
                id="escolaId"
                name="escolaId"
                value={formData.escolaId}
                onChange={handleChange}
                required
              >
                <option value="">Selecione uma escola</option>
                {escolas.map((escola) => (
                  <option key={escola.id} value={escola.id}>
                    {escola.nome}
                  </option>
                ))}
              </select>
              <label htmlFor="escolaId">Escola</label>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <FormField
                  label="Senha"
                  name="senha"
                  type="password"
                  value={formData.senha}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <FormField
                  label="Confirmar Senha"
                  name="confirmarSenha"
                  type="password"
                  value={formData.confirmarSenha}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mt-4 mb-0">
              <div className="d-grid">
                <button type="submit" className="btn btn-primary btn-block">
                  Criar Conta
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="card-footer text-center py-3">
          <div className="small">
            <a href="/login">Tem uma conta? Acesse o login</a>
          </div>
        </div>
      </div>
    </div>
  );
}
