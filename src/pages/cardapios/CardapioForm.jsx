import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, MenuItem } from '@mui/material';

export default function CardapioForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { control, handleSubmit, setValue } = useForm();

  const cidades = [
    { id: 1, nome: 'Umuarama' },
    { id: 2, nome: 'Curitiba' },
    { id: 3, nome: 'Maringá' },
  ];

  useEffect(() => {
    if (id) {
      const cardapioFake = { nome: 'Cardápio Escolar', receitas: 'Arroz, Feijão, Carne', periodo: 'Semanal', cidade_id: 1 };
      setValue('nome', cardapioFake.nome);
      setValue('receitas', cardapioFake.receitas);
      setValue('periodo', cardapioFake.periodo);
      setValue('cidade_id', cardapioFake.cidade_id);
    }
  }, [id, setValue]);

  const onSubmit = (formData) => {
    if (id) console.log('Atualizar cardápio', id, formData);
    else console.log('Criar cardápio', formData);
    navigate('/cardapios');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ padding: 20, display: 'grid', gap: 12 }}>
      <Controller name="nome" control={control} defaultValue="" render={({ field }) => <TextField {...field} label="Nome do Cardápio" required />} />
      <Controller name="receitas" control={control} defaultValue="" render={({ field }) => <TextField {...field} label="Receitas" multiline rows={3} />} />
      <Controller name="periodo" control={control} defaultValue="" render={({ field }) => <TextField {...field} label="Período" />} />
      <Controller
        name="cidade_id"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField select label="Cidade" {...field}>
            {cidades.map(c => (
              <MenuItem key={c.id} value={c.id}>{c.nome}</MenuItem>
            ))}
          </TextField>
        )}
      />
      <div>
        <Button type="submit" variant="contained">Salvar</Button>
        <Button sx={{ ml: 2 }} onClick={() => navigate(-1)}>Cancelar</Button>
      </div>
    </form>
  );
}
