import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { CssBaseline, ThemeProvider, Box, Typography } from '@mui/material';
import axios from 'axios';
import theme from '../src/styles/theme/index';
import { UIProvider } from './context/ui';

// Fechas App
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import 'moment/locale/es-mx';

// Pages
import { Home } from './Pages/Home';
import { Productos } from './Pages/Products'
import { Servicios } from './Pages/Servicios'
import { SnackCalculator } from './Pages/SnackCart';
import { Cart } from './Pages/Cart';
import { Account } from './Pages/Account';
import { LogInForm } from './Pages/Login'
import { RegisterForm } from './Pages/Register';
import { FormFinal } from './Pages/FormFinal';
import { Orden } from './Pages/Orden'
import { Terminos } from './Pages/Terminos';

// Pages Admin
import { AudioQR } from './PagesAdmin/AudioQR';
import { ProductForm } from './PagesAdmin/createProduct';
import { ColorPickerComponent } from './PagesAdmin/createColor';
import { AdminNavbar } from './PagesAdmin/panel';
import { CategoryComponent } from './PagesAdmin/createCategory';
import { CreateSnack } from './PagesAdmin/createSnack';
import Ordenes from './PagesAdmin/Ordenes';
import ProductDelete from './PagesAdmin/ProductDelete';
import SnackDelete from './PagesAdmin/SnackDelete';
import CategoryDelete from './PagesAdmin/CategoryDelete';
import { EditProduct } from './PagesAdmin/editProduct';


// Components
import Appbar from './components/appbar';
import SearchBox from './components/search';
import AppDrawer from './components/drawer';

import imageLogo from "./../src/utils/image/logo2.png"


import './App.css';
import Subscripciones from './Pages/Suscripciones';

function App() {


  const userData = localStorage.getItem('userData');
  const token = userData ? JSON.parse(userData).user : null;
  const decoded = token ? JSON.parse(atob(token.split('.')[1])) : null;
  const decodedToken = decoded?.user
  //console.log(decodedToken);

  const [showNetflix, setShowNetflix] = useState(false);

  useEffect(() => {
    // Comprobar si ya se ha mostrado el pop-up
    const hasPopupBeenShown = sessionStorage.getItem("showLogo");

    // Si no se ha mostrado el pop-up, lo mostramos y almacenamos la bandera en la caché
    if (!hasPopupBeenShown) {
      setShowNetflix(true);
      setTimeout(() => {
        setShowNetflix(false);
        // Almacena la bandera en localStorage para indicar que ya se mostró
        sessionStorage.setItem("showLogo", "true");
      }, 2000);
    }
  }, []);

  const [locale, setLocale] = useState('es-mx');

  if (moment.locale() !== locale) {
    moment.locale(locale);
  }

  return (
    
    <div className='App'>
      {showNetflix?
      <div style={{background:"black"}}>
      <Box
  sx={{
    display: "flex",
    width: "100%",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
    background: "black",
    m:0,
    p:0
  }}
>
  <img
    src={imageLogo}
    alt=""
    style={{
      width: "100%",
      maxWidth: "250px",
      animation: "zoomIn 2s ease-in-out infinite",
    }}
  />
</Box>
      </div>
      :
      <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={"es-mx"}>
        <ThemeProvider theme={theme} >
          <CssBaseline />
          <UIProvider><Appbar /><SearchBox /><AppDrawer /> </UIProvider>    {/* NavBar + Search + MobileNav */}
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/productos' element={<Productos />} />
            <Route path='/servicios' element={<Servicios />} />
            <Route path='/snackcart' element={<SnackCalculator />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/realizarpedido' element={<FormFinal decodedToken={decodedToken} />} />
            <Route path='/subcripciones' element={<Subscripciones decodedToken={decodedToken} />} />
            <Route path='/success' element={<Orden />} />
            <Route path='/terminos' element={<Terminos />} />

            {decodedToken && decodedToken.username ?
              (<>
                <Route path='/account' element={<Account decodedToken={decodedToken} />} /></>)
              :
              (<>
                <Route path='/account' element={<LogInForm />} />
                <Route path='/login' element={<LogInForm />} />
                <Route path='/register' element={<RegisterForm />} />
              </>
              )}

            {decodedToken && decodedToken.admin ?
              (<>
                <Route path='/admin/createproduct' element={<ProductForm />} />
                <Route path='/admin/editproduct/:id' element={<EditProduct />} />
                <Route path='/admin/createcolor' element={<ColorPickerComponent />} />
                <Route path='/admin/createcategoria' element={<CategoryComponent />} />
                <Route path='/admin' element={<AdminNavbar />} />
                <Route path='/admin/ordenes' element={<Ordenes />} />
                <Route path='/admin/audioQr' element={<AudioQR />} />
                <Route path='/admin/createsnack' element={<CreateSnack />} />
                <Route path='/admin/deleteproduct' element={<ProductDelete />} />
                <Route path='/admin/deletesnack' element={<SnackDelete />} />
                <Route path='/admin/deletecategory' element={<CategoryDelete />} />
              </>) : (<></>)}

          </Routes>
        </ThemeProvider>
        
      </LocalizationProvider>}
      
    </div>
  );
}

export default App;
