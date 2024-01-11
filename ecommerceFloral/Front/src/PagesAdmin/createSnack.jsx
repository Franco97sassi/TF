import React, { useState } from "react";
import { Button, TextField, Alert, Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { createSnack } from "../state/actions/createSnack";

import { AdminNavbar } from "./panel";

export const CreateSnack = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [alert, setAlert] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && price && image && description) {
      dispatch(createSnack({ name, price, image, description }));

      //alert("Snack creado.")

      // Reiniciar los campos del formulario
      setName("");
      setPrice("");
      setImage("");
      setDescription("");
      setAlert(false);
    } else {
      setAlert(true);
    }
  };

  return (
    <Box>
      <AdminNavbar />
      <Typography
        sx={{
          display: "flex",
          width: "100%",
          textAlign: "center",
          justifyContent: "center",
          fontSize: "32px",
        }}
      >
        Crear Snacks!
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ maxWidth: "900px" }}>
          <div>
            {alert && <Alert severity="error">Completa todos los campos</Alert>}
            <form onSubmit={handleSubmit}>
              <TextField
                label="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                margin="normal"
                fullWidth
                required
              />
              <TextField
                label="Descripción"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                margin="normal"
                fullWidth
                required
              />
              <TextField
                label="Precio"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                margin="normal"
                fullWidth
                required
                type="number"
              />
              <TextField
                label="Imagen"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                margin="normal"
                fullWidth
                required
              />
              <Button variant="contained" type="submit" color="primary">
                Crear Snack
              </Button>
            </form>
          </div>
        </Box>
      </Box>
    </Box>
  );
};
