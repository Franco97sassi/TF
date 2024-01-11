import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, IconButton, useMediaQuery, AppBar, Typography, Toolbar as AppBarToolbar } from '@mui/material';
import { AddBox, Category, Palette, Menu, People, ShoppingBasket, Fastfood } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export function AdminNavbar2() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [open, setOpen] = useState(false);

  const handleToggleDrawer = () => {
    setOpen(!open);
  };

  const renderNavbarMobile = () => (
    < div style={{ display: "flex", marginTop: "28px" }}>
      <IconButton color="inherit" onClick={handleToggleDrawer}>
        <Menu />
      </IconButton>
      <Drawer
        variant="temporary"
        anchor="left"
        open={open}
        onClose={handleToggleDrawer}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          position: 'absolute',
          top: '64px', // Ajusta la posición vertical según tu diseño
          left: '0',
          width: '250px',
          '& .MuiDrawer-paper': {
            width: '250px',
            boxSizing: 'border-box',
            borderRadius: '0px',
          },
        }}
      >
        <Toolbar />
        <List>
          <ListItem button component={Link} to="/admin/createproducto">
            <ListItemIcon>
              <AddBox />
            </ListItemIcon>
            <ListItemText primary="Nuevo Producto" />
          </ListItem>
          <ListItem button component={Link} to="/admin/createcategoria">
            <ListItemIcon>
              <Category />
            </ListItemIcon>
            <ListItemText primary="Nueva Categoría" />
          </ListItem>
          <ListItem button component={Link} to="/admin/createcolor">
            <ListItemIcon>
              <Palette />
            </ListItemIcon>
            <ListItemText primary="Nuevo Color" />
          </ListItem>
          <ListItem button component={Link} to="/admin/usuarios">
            <ListItemIcon>
              <People />
            </ListItemIcon>
            <ListItemText primary="Usuarios" />
          </ListItem>
          <ListItem button component={Link} to="/admin/ventas">
            <ListItemIcon>
              <ShoppingBasket />
            </ListItemIcon>
            <ListItemText primary="Ventas" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );

  const renderNavbarDesktop = () => (
    <AppBar position="static" sx={{ marginBottom: "28px" }}>
      <AppBarToolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>

        </Typography> 
        <Typography variant="subtitle1" component={Link} to="/admin/deleteproduct" sx={{ cursor: 'pointer', fontSize: '0.9rem', color: 'white', textDecoration: 'none', marginRight: '15px' }}>
          Productos
        </Typography>
        <Typography variant="subtitle1" component={Link} to="/admin/deletecategory" sx={{ cursor: 'pointer', fontSize: '0.9rem', color: 'white', textDecoration: 'none', marginRight: '10px' }}>
          Categorias
        </Typography>
        {/*
        <IconButton color="inherit">
          <AddBox sx={{ fontSize: '1.5rem' }} />
        </IconButton>
        <Typography variant="subtitle1" component={Link} to="/admin/deletesnack" sx={{ cursor: 'pointer', fontSize: '0.8rem', color: 'white', textDecoration: 'none', marginRight: '8px' }}>
          Snacks
        </Typography>*/}
      </AppBarToolbar>
    </AppBar>
  );

  return (
    <>
      {isMobile ? renderNavbarMobile() : renderNavbarDesktop()}
    </>
  );
}














