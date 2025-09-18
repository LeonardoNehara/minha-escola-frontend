import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableRow, IconButton, Button, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ModalConfirm from '../../components/common/ModalConfirm';

export default function CidadeList() {
  const [cidades, setCidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const cidadesTeste = [
    { id: 1, nome: 'Umuarama', uf: 'PR' },
    { id: 2, nome: 'Curitiba', uf: 'PR' },
    { id: 3, nome: 'São Paulo', uf: 'SP' },
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setCidades(cidadesTeste);
      setLoading(false);
    }, 500);
  }, []);

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setCidades(prev => prev.filter(c => c.id !== selectedId));
    setModalOpen(false);
    setSelectedId(null);
  };

  const filteredCidades = cidades.filter(c =>
    Object.values(c).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div style={{ padding: 20 }}>
      <h2>Cidades</h2>
      <Button component={Link} to="/cidades/novo" variant="contained" sx={{ mb: 2 }}>
        Nova Cidade
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
              <TableCell>UF</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCidades.map(c => (
              <TableRow key={c.id}>
                <TableCell>{c.id}</TableCell>
                <TableCell>{c.nome}</TableCell>
                <TableCell>{c.uf}</TableCell>
                <TableCell>
                  <IconButton component={Link} to={`/cidades/${c.id}`}><EditIcon /></IconButton>
                  <IconButton onClick={() => handleDeleteClick(c.id)}><DeleteIcon /></IconButton>
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
        title="Excluir Cidade"
        message="Tem certeza que deseja excluir esta cidade?"
      />
    </div>
  );
}
