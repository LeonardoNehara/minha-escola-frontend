import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, MenuItem } from '@mui/material';
// import EscolaService from '../../api/EscolaService'; 

export default function EscolaForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { control, handleSubmit, setValue } = useForm();

  const tiposEscola = [
    { id: 'publica', nome: 'Pública' },
    { id: 'privada', nome: 'Privada' },
    { id: 'tecnica', nome: 'Técnica' },
  ];

  const cidades = [
    { id: 1, nome: 'Umuarama' },
    { id: 2, nome: 'Curitiba' },
    { id: 3, nome: 'Maringá' },
  ];

  const bairros = [
    { id: 1, nome: 'Centro', cidade_id: 1 },
    { id: 2, nome: 'Água Verde', cidade_id: 2 },
    { id: 3, nome: 'Zona 7', cidade_id: 3 },
    { id: 4, nome: 'Portão', cidade_id: 2 },
  ];

  useEffect(() => {
    if (id) {
      const escolaFake = {
        nome: 'Colégio Central',
        endereco: 'Rua das Flores, 123',
        cidade_id: 2,
        bairro_id: 4,
        tipo: 'privada',
      };

      setValue('nome', escolaFake.nome);
      setValue('endereco', escolaFake.endereco);
      setValue('cidade_id', escolaFake.cidade_id);
      setValue('bairro_id', escolaFake.bairro_id);
      setValue('tipo', escolaFake.tipo);
    }
  }, [id, setValue]);

  const onSubmit = async (formData) => {
    try {
      if (id) {
        console.log('Atualizar escola', id, formData);
      } else {
        console.log('Criar escola', formData);
      }
      navigate('/escolas');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ padding: 20, display: 'grid', gap: 12 }}>
      <Controller
        name="nome"
        control={control}
        defaultValue=""
        render={({ field }) => <TextField {...field} label="Nome da Escola" required />}
      />
      <Controller
        name="endereco"
        control={control}
        defaultValue=""
        render={({ field }) => <TextField {...field} label="Endereço" />}
      />
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
      <Controller
        name="bairro_id"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField select label="Bairro" {...field}>
            {bairros
              .filter(b => !field.value || b.cidade_id === (Number(field.value.cidade_id) || field.value))
              .map(b => (
                <MenuItem key={b.id} value={b.id}>{b.nome}</MenuItem>
              ))}
          </TextField>
        )}
      />
      <Controller
        name="tipo"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField select label="Tipo de Escola" {...field}>
            {tiposEscola.map(t => (
              <MenuItem key={t.id} value={t.id}>{t.nome}</MenuItem>
            ))}
          </TextField>
        )}
      />

      <div>
        <Button variant="contained" type="submit">Salvar</Button>
        <Button sx={{ ml: 2 }} onClick={() => navigate(-1)}>Cancelar</Button>
      </div>
    </form>
  );
}
