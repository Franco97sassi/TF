import React, { useState } from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';
import { AdminNavbar } from './panel';
import { createCategory } from '../state/actions/createCategory';
import { useDispatch } from 'react-redux';

export function CategoryComponent({ name }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: name,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: value,
    };
    setFormData(updatedFormData);
  };

  const handleCreateCategory = () => {
    // Aquí puedes realizar alguna acción con los datos de la categoría creada
    console.log(formData);
    dispatch(createCategory(formData));
  };

  return (
    <Grid container direction="column" alignItems="center">
      <AdminNavbar />
      <Grid item>
        <Typography variant="h6" sx={{ fontSize: '28px' }}>
          Crear Categoría
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body1">
          <strong>Categoría:</strong> {name}
        </Typography>
      </Grid>
      <Grid item sx={{width:"80%", marginBottom:"32px"}}>
        <TextField
          type="text"
          name="name"
          label="Nombre"
          variant="outlined"
          value={formData.name}
          onChange={handleInputChange}
          fullWidth
          
        />
      </Grid>
      <Grid item>
        <Button variant="contained" onClick={handleCreateCategory}>
          Crear Categoría
        </Button>
      </Grid>
    </Grid>
  );
}