import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, MenuItem } from '@mui/material';

export default function BairroForm() {
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
      const bairroFake = { nome: 'Centro', cidade_id: 2 };
      setValue('nome', bairroFake.nome);
      setValue('cidade_id', bairroFake.cidade_id);
    }
  }, [id, setValue]);

  const onSubmit = (formData) => {
    if (id) console.log('Atualizar bairro', id, formData);
    else console.log('Criar bairro', formData);
    navigate('/bairros');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ padding: 20, display: 'grid', gap: 12 }}>
      <Controller name="nome" control={control} defaultValue="" render={({ field }) => <TextField {...field} label="Nome do Bairro" required />} />
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
