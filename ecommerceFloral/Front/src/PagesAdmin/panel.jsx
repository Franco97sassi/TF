import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, IconButton, useMediaQuery, AppBar, Typography, Toolbar as AppBarToolbar } from '@mui/material';
import { AddBox, Category, Palette, Menu, People, ShoppingBasket, Fastfood } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { AdminNavbar2 } from './panel2';

export function AdminNavbar() {
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
          <ListItem button component={Link} to="/admin/createproduct">
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
          {/*<ListItem button component={Link} to="/admin/createsnack">
            <ListItemIcon>
              <People />
            </ListItemIcon>
            <ListItemText primary="Nuevo snack" />
          </ListItem>*/}
          <ListItem button component={Link} to="/admin/ordenes">
            <ListItemIcon>
              <ShoppingBasket />
            </ListItemIcon>
            <ListItemText primary="Ordenes" />
          </ListItem>

        </List>
      </Drawer>
    </div>
  );

  const renderNavbarDesktop = () => (
    <>
      <AppBar position="static" sx={{ marginBottom: "0" }}>
        <AppBarToolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Panel Administrador
          </Typography>
          <IconButton color="inherit">
            <AddBox sx={{ fontSize: '1.5rem' }} />
          </IconButton>
          <Typography variant="subtitle1" component={Link} to="/admin/createproduct" sx={{ cursor: 'pointer', fontSize: '0.8rem', color: 'white', textDecoration: 'none', marginRight: '8px' }}>
            Nuevo Producto
          </Typography>
          <IconButton color="inherit">
            <Category sx={{ fontSize: '1.5rem' }} />
          </IconButton>
          <Typography variant="subtitle1" component={Link} to="/admin/createcategoria" sx={{ cursor: 'pointer', fontSize: '0.8rem', color: 'white', textDecoration: 'none', marginRight: '8px' }}>
            Nueva Categoría
          </Typography>
          <IconButton color="inherit">
            <Palette sx={{ fontSize: '1.5rem' }} />
          </IconButton>
          <Typography variant="subtitle1" component={Link} to="/admin/createcolor" sx={{ cursor: 'pointer', fontSize: '0.8rem', color: 'white', textDecoration: 'none', marginRight: '8px' }}>
            Nuevo Color
          </Typography>
          {/*<IconButton color="inherit">
            <Fastfood sx={{ fontSize: '1.5rem' }} />
          </IconButton>
          <Typography variant="subtitle1" component={Link} to="/admin/createsnack" sx={{ cursor: 'pointer', fontSize: '0.8rem', color: 'white', textDecoration: 'none', marginRight: '8px' }}>
          Nuevo Snack
        </Typography>*/}
          <IconButton color="inherit">
            <ShoppingBasket sx={{ fontSize: '1.5rem' }} />
          </IconButton>
          <Typography variant="subtitle1" component={Link} to="/admin/ordenes" sx={{ cursor: 'pointer', fontSize: '0.8rem', color: 'white', textDecoration: 'none', marginRight: '8px' }}>
            Ordenes
          </Typography>
        </AppBarToolbar>
      </AppBar>
      <AdminNavbar2 />
    </>
  );

  return (
    <>
      {isMobile ? renderNavbarMobile() : renderNavbarDesktop()}
    </>
  );
}














