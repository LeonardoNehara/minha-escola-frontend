import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableRow, IconButton, Button, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ModalConfirm from '../../components/common/ModalConfirm';

export default function CardapioList() {
  const [cardapios, setCardapios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // estado para busca

  const cardapiosTeste = [
    { id: 1, nome: 'Cardápio Infantil', receitas: 'Arroz, Feijão, Frango', periodo: 'Semanal', cidade: 'Umuarama' },
    { id: 2, nome: 'Cardápio Médio', receitas: 'Macarrão, Salada, Carne', periodo: 'Mensal', cidade: 'Curitiba' },
    { id: 3, nome: 'Cardápio Técnico', receitas: 'Sopa, Pão, Frutas', periodo: 'Semanal', cidade: 'Maringá' },
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setCardapios(cardapiosTeste);
      setLoading(false);
    }, 500);
  }, []);

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setCardapios(prev => prev.filter(c => c.id !== selectedId));
    setModalOpen(false);
    setSelectedId(null);
  };

  const filteredCardapios = cardapios.filter(c =>
    Object.values(c).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div style={{ padding: 20 }}>
      <h2>Cardápios</h2>
      <Button component={Link} to="/cardapios/novo" variant="contained" sx={{ mb: 2 }}>
        Novo Cardápio
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
              <TableCell>Receitas</TableCell>
              <TableCell>Período</TableCell>
              <TableCell>Cidade</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCardapios.map(c => (
              <TableRow key={c.id}>
                <TableCell>{c.id}</TableCell>
                <TableCell>{c.nome}</TableCell>
                <TableCell>{c.receitas}</TableCell>
                <TableCell>{c.periodo}</TableCell>
                <TableCell>{c.cidade}</TableCell>
                <TableCell>
                  <IconButton component={Link} to={`/cardapios/${c.id}`}><EditIcon /></IconButton>
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
        title="Excluir Cardápio"
        message="Tem certeza que deseja excluir este cardápio?"
      />
    </div>
  );
}
