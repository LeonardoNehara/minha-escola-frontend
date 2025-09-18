import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button } from '@mui/material';

export default function CidadeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { control, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (id) {
      const cidadeFake = { nome: 'Curitiba', uf: 'PR' };
      setValue('nome', cidadeFake.nome);
      setValue('uf', cidadeFake.uf);
    }
  }, [id, setValue]);

  const onSubmit = (formData) => {
    if (id) console.log('Atualizar cidade', id, formData);
    else console.log('Criar cidade', formData);
    navigate('/cidades');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ padding: 20, display: 'grid', gap: 12 }}>
      <Controller name="nome" control={control} defaultValue="" render={({ field }) => <TextField {...field} label="Nome da Cidade" required />} />
      <Controller name="uf" control={control} defaultValue="" render={({ field }) => <TextField {...field} label="UF" required />} />
      <div>
        <Button type="submit" variant="contained">Salvar</Button>
        <Button sx={{ ml: 2 }} onClick={() => navigate(-1)}>Cancelar</Button>
      </div>
    </form>
  );
}
