import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableRow, IconButton, Button, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ModalConfirm from '../../components/common/ModalConfirm';

export default function EscolaList() {
  const [escolas, setEscolas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const escolasTeste = [
    { id: 1, nome: 'Colégio Estadual Central', endereco: 'Rua das Flores, 123', cidade: 'Umuarama', bairro: 'Centro', tipo: 'Pública' },
    { id: 2, nome: 'Colégio Alfa', endereco: 'Av. Paraná, 456', cidade: 'Curitiba', bairro: 'Água Verde', tipo: 'Privada' },
    { id: 3, nome: 'Instituto Técnico Sul', endereco: 'Rua Brasil, 789', cidade: 'Maringá', bairro: 'Zona 7', tipo: 'Técnica' },
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setEscolas(escolasTeste);
      setLoading(false);
    }, 500);
  }, []);

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setEscolas(prev => prev.filter(e => e.id !== selectedId));
    setModalOpen(false);
    setSelectedId(null);
  };

  const filteredEscolas = escolas.filter(e =>
    Object.values(e).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div style={{ padding: 20 }}>
      <h2>Escolas</h2>
      <Button component={Link} to="/escolas/novo" variant="contained" sx={{ mb: 2 }}>
        Nova Escola
      </Button>

      <div style={{ marginBottom: 20 }}>
        <TextField
          label="Buscar"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
        />
      </div>

      {loading ? <div>Carregando...</div> : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Endereço</TableCell>
              <TableCell>Cidade</TableCell>
              <TableCell>Bairro</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEscolas.map(e => (
              <TableRow key={e.id}>
                <TableCell>{e.id}</TableCell>
                <TableCell>{e.nome}</TableCell>
                <TableCell>{e.endereco}</TableCell>
                <TableCell>{e.cidade}</TableCell>
                <TableCell>{e.bairro}</TableCell>
                <TableCell>{e.tipo}</TableCell>
                <TableCell>
                  <IconButton component={Link} to={`/escolas/${e.id}`}><EditIcon /></IconButton>
                  <IconButton onClick={() => handleDeleteClick(e.id)}><DeleteIcon /></IconButton>
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
        title="Excluir Escola"
        message="Tem certeza que deseja excluir esta escola?"
      />
    </div>
  );
}
