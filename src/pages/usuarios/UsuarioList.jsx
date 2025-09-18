import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableRow, IconButton, TextField } from '@mui/material';
import ModalConfirm from '../../components/common/ModalConfirm';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function UsuarioList() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const usuariosTeste = [
    { id: 1, nome: 'João Silva', email: 'joao@email.com', telefone: '123456789', cargo: 'Professor', escola: { nome: 'Escola A' } },
    { id: 2, nome: 'Maria Souza', email: 'maria@email.com', telefone: '987654321', cargo: 'Diretor', escola: { nome: 'Escola B' } },
    { id: 3, nome: 'Carlos Lima', email: 'carlos@email.com', telefone: '456123789', cargo: 'Coordenador', escola: null },
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setUsuarios(usuariosTeste);
      setLoading(false);
    }, 500);
  }, []);

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setUsuarios(prev => prev.filter(u => u.id !== selectedId));
    setModalOpen(false);
    setSelectedId(null);
  };

  const filteredUsuarios = usuarios.filter(u =>
    Object.values(u).some(value => {
      if (typeof value === 'object' && value !== null) {
        return Object.values(value).some(v => String(v).toLowerCase().includes(searchTerm.toLowerCase()));
      }
      return String(value).toLowerCase().includes(searchTerm.toLowerCase());
    })
  );

  return (
    <div style={{ padding: 20 }}>
      <h2>Usuários</h2>

      {/* Campo de busca */}
      <TextField
        label="Buscar"
        variant="outlined"
        size="small"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: 20 }}
      />

      {loading ? (
        <div>Carregando...</div>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Telefone</TableCell>
              <TableCell>Cargo</TableCell>
              <TableCell>Escola</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsuarios.map(u => (
              <TableRow key={u.id}>
                <TableCell>{u.id}</TableCell>
                <TableCell>{u.nome}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>{u.telefone}</TableCell>
                <TableCell>{u.cargo}</TableCell>
                <TableCell>{u.escola?.nome || '-'}</TableCell>
                <TableCell>
                  <IconButton component={Link} to={`/usuarios/${u.id}`}><EditIcon /></IconButton>
                  <IconButton onClick={() => handleDeleteClick(u.id)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <ModalConfirm
        show={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Excluir Usuário"
        message="Tem certeza que deseja excluir este usuário?"
      />
    </div>
  );
}
