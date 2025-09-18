import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableRow, IconButton, Button, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ModalConfirm from '../../components/common/ModalConfirm';

export default function BairroList() {
  const [bairros, setBairros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const bairrosTeste = [
    { id: 1, nome: 'Centro', cidade: 'Umuarama' },
    { id: 2, nome: 'Água Verde', cidade: 'Curitiba' },
    { id: 3, nome: 'Zona 7', cidade: 'Maringá' },
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setBairros(bairrosTeste);
      setLoading(false);
    }, 500);
  }, []);

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setBairros(prev => prev.filter(b => b.id !== selectedId));
    setModalOpen(false);
    setSelectedId(null);
  };

  const filteredBairros = bairros.filter(b =>
    Object.values(b).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div style={{ padding: 20 }}>
      <h2>Bairros</h2>
      <Button component={Link} to="/bairros/novo" variant="contained" sx={{ mb: 2 }}>
        Novo Bairro
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
              <TableCell>Cidade</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBairros.map(b => (
              <TableRow key={b.id}>
                <TableCell>{b.id}</TableCell>
                <TableCell>{b.nome}</TableCell>
                <TableCell>{b.cidade}</TableCell>
                <TableCell>
                  <IconButton component={Link} to={`/bairros/${b.id}`}><EditIcon /></IconButton>
                  <IconButton onClick={() => handleDeleteClick(b.id)}><DeleteIcon /></IconButton>
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
        title="Excluir Bairro"
        message="Tem certeza que deseja excluir este bairro?"
      />
    </div>
  );
}
