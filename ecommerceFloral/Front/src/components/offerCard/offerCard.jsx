import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { codigosDesc } from "../../data/codigosDesc"
import { Box, Typography } from '@mui/material';

export const OfferCard = ({ valueDesc }) => {
  const [textoBusqueda, setTextoBusqueda] = useState('');
  const [resultado, setResultado] = useState(null);
  const [activado, setActivado] = useState(false);

  const findDesc = () => {
    const resultadoBusqueda = codigosDesc.find(
      (objeto) => objeto.name === textoBusqueda && objeto.activo
    );
    if (resultadoBusqueda) {
      setActivado(true)
      valueDesc(resultadoBusqueda.valor);
      setResultado(resultadoBusqueda.valor);
    } else {
      alert("Código No Válido")
      setTextoBusqueda('');
    }
  };

  const eliminarDesc = () => {
    setTextoBusqueda('');
    valueDesc(0)
    setResultado(0)
    setActivado(false);
  }

  return (
    <Box display={"flex"} justifyContent={"space-between"} my={2}>
      <TextField
        label="Código"
        value={textoBusqueda}
        onChange={(e) => setTextoBusqueda(e.target.value)}
        disabled={activado}
        sx={{maxWidth:"70%"}}
      />
      {activado ?
        <Button variant="contained" onClick={eliminarDesc}>
          Eliminar
        </Button>
        :
        <Button variant="contained" onClick={findDesc}>
          Aplicar
        </Button>
      }
    </Box>
  );
};