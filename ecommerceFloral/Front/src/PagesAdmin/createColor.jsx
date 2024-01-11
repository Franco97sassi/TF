import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import { TextField, Button, Grid, Typography } from '@mui/material';
import { AdminNavbar } from './panel';
import { createColor } from '../state/actions/createColor';
import {useDispatch} from "react-redux"


export function ColorPickerComponent() {
  const dispatch = useDispatch()
  const [color, setColor] = useState('#FF0000');
  const [formData, setFormData] = useState({
    name: '',
    codigo: '#FF0000'
  });

  const handleColorChange = (selectedColor) => {
    const updatedFormData = {
      ...formData,
      codigo: selectedColor.hex
    };
    setColor(selectedColor.hex);
    setFormData(updatedFormData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: value
    };
    setFormData(updatedFormData);
  };

  const handleCrearColor = () => {
    // Aquí puedes realizar alguna acción con los datos del color creado
    console.log(formData);
    dispatch(createColor(formData))
    
  };

  return (
    <Grid container direction="column" alignItems="center" >
        <AdminNavbar/>
      <Grid item>
        <Typography variant="h6" sx={{fontSize:"28px"}}>Crear Color de producto</Typography>
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
        <SketchPicker color={color} onChange={handleColorChange} />
      </Grid>
      <Grid item>
        <Typography variant="body1">
          <strong>Nombre:</strong> {formData.name}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body1">
          <strong>Código de color:</strong> {formData.codigo}
        </Typography>
      </Grid>
      <Grid item>
        <Button variant="contained" onClick={handleCrearColor}>
          Crear Color
        </Button>
      </Grid>
    </Grid>
  );
}





