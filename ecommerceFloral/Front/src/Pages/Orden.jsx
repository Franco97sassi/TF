import React, { useEffect, useState } from 'react';
import { Box, Typography, useMediaQuery, Grid } from '@mui/material';
const apiUrl = import.meta.env.VITE_API_URL;

import Footer from '../components/footer';

const userData = localStorage.getItem('userData');
const token = userData ? JSON.parse(userData).user : null;
const decoded = token ? JSON.parse(atob(token.split('.')[1])) : null;
const decodedToken = decoded?.user;
const isAdmin = decodedToken && decodedToken.admin === true ? true : false;

export const Orden = () => {
  const [orden, setOrden] = useState(null);
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    // Aquí haces la llamada al backend para obtener la orden según el preferenceId
    // y actualizas el estado con la respuesta
    const fetchOrden = async () => {
      try {
        const preferenceId = new URLSearchParams(window.location.search).get('preferenceId');
        const response = await fetch(`${apiUrl}/pagos/orden?preferenceId=${preferenceId}`);
        const data = await response.json();
        setOrden(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrden();
  }, []);

  const calculateTotal = () => {
    let total = 0
    orden.cart.forEach(product => {
      total = total + product.price * product.quantity
    });
    return total.toFixed(2);
  };

  if (!orden) {
    return <Typography>Cargando...</Typography>;
  }
  const estadoColor = orden.estado === 'PAGADO CON EXITO' ? 'green' : 'orange';
  const conEnvio = orden.deliveryType === 'address' ? true : false;

  if (isAdmin) {
    return (
      <Box sx={{ color: "Black", display: "flex", justifyContent: "center", flexDirection: "column", width: "100%" }}>
        <Box bgcolor={estadoColor} mb={2} p={2} borderRadius={0}>
          <Typography sx={{ textAlign: "center" }} variant="h5" color="white">
            Estado: {orden.estado}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box sx={{ width: "100%", maxWidth: "900px", border: "1px solid black", p: 2, mb: 2 }}>
            <Typography sx={{ textAlign: "center", border: "1px solid black", background: "rgb(230,230,230)" }} variant="h4">Detalle de la Orden</Typography>
            <Box p={2}>
              <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>Nombre del comprador: {orden.senderName}</Typography>
              <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>Nombre de quien recibe: {orden.receiverName}</Typography>
              <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>Tipo de orden: {conEnvio ? "A Domicilio" : "Pasar a Recoger"}</Typography>
              {conEnvio ? <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>Dirección: {orden.address}</Typography> : <></>}
              <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>Teléfono: {orden.cellphone}</Typography>
              <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>Fecha y Hora de Entrega: {orden.pickupTime}hs.</Typography>

              <Typography>Id de Compra: {orden.estado === 'PAGADO CON EXITO' ? orden.idCompra : 'NO PAGADO'}</Typography>
              <Typography>Fecha de Creación: {orden.createdAt}</Typography>
              <Typography>Fecha de Pago: {orden.estado === 'PAGADO CON EXITO' ? orden.updatedAt : 'NO PAGADO'}</Typography>
            </Box>

            <Typography sx={{ border: "1px solid black", textAlign: "center", background: "rgb(230,230,230)" }}>DETALLES DE VENTA</Typography>
            {orden.cart?.map((product) => {
              return (
                <Box sx={{ border: "1px solid black", p: 2 }}>
                  <Typography>Nombre: {product.name} {product.quantityPrice ? "x" + product.quantityPrice : ""}</Typography>
                  <Typography>Precio por unidad: ${product.price}</Typography>
                  <Typography>Tamaño: {product.size}</Typography>
                  <Typography>Color: {product.ColorName}</Typography>
                  <Typography>Cantidad: {product.quantity}</Typography>
                  <Typography>Detalle/s: {(product.detailDescription === "") ? "(Sin detalles)" : product.detailDescription}</Typography>
                </Box>
              )
            })}

            <Box sx={{ border: "1px solid black", textAlign: "end", background: "rgb(230,230,230)", p: 2 }}>
              <Typography sx={{ fontSize: "1.6rem", fontWeight: "600" }}>TOTAL: </Typography>
              <Typography sx={{ fontSize: "1.6rem", fontWeight: "500" }}>${calculateTotal()}</Typography>
            </Box>
          </Box>
        </Box>
        <Footer />
      </Box>
    )
  }

  return (
    <Box sx={{ color: "Black", display: "flex", justifyContent: "center", flexDirection: "column", width: "100%" }}>

      <Box bgcolor={estadoColor} mb={2} p={2} borderRadius={0}>
        <Typography sx={{ textAlign: "center" }} variant="h5" color="white">
          Estado: {orden.estado}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ width: "100%", maxWidth: "1100px", border: "1px solid black", p: 2, mb: 2 }}>
          <Typography sx={{ textAlign: "center", border: "1px solid black", background: "#ffc0cb" }} fontFamily={'TanPearl'} fontSize={"2rem"} variant="h4" py={2}>DETALLE DE LA ORDEN</Typography>
          <Box p={2}>
            <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>Nombre del comprador: {orden.senderName}</Typography>
            <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>Nombre de quien recibe: {orden.receiverName}</Typography>
            <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>Tipo de orden: {conEnvio ? "A Domicilio" : "Pasar a Recoger"}</Typography>
            {conEnvio ? <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>Dirección: {orden.address}</Typography> : <></>}
            <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>Teléfono: {orden.cellphone}</Typography>
            <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>Fecha y Hora de Entrega: {orden.pickupTime} hs.</Typography>
          </Box>

          <Typography sx={{ border: "1px solid black", textAlign: "center", background: "#ffc0cb" }}>DETALLES DE VENTA</Typography>
          <Box border={"1px solid black"} backgroundColor={"#D9D9D9"}>
            {isMobile ? (
              <></>
            ) : (
              <>
                <Grid container spacing={0} display="flex" justifyContent="space-between" >
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    container
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Typography variant="h6">Producto</Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={1}
                    container
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Typography variant="h6">Color</Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={1}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Typography variant="h6">Precio</Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={1}
                    container
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Typography variant="h6">Cantidad</Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={1}
                    container
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Typography variant="h6" pl={0}>Subtotal</Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={3}
                    container
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Typography variant="h6" pl={2}>Notas</Typography>
                  </Grid>
                </Grid>
                <hr />
              </>

            )}
            {orden.cart?.map((product) => {
              return (
                <>
                  <Grid container spacing={0} display="flex" justifyContent="space-between"  >
                    <Grid item xs={12} sm={4} sx={{ px: isMobile ? 1 : 2, paddingRight: "0" }}>
                      <Box display="flex" alignItems="center" my={isMobile ? 2 : 0} justifyContent={isMobile ? "space-around" : ""} pl={isMobile ? "" :"10%"}>
                        <img
                          src={product.image}
                          alt={product.name}
                          style={{ width: isMobile ? "120px" : "80px", height: isMobile ? "120px" : "80px", marginInline: isMobile ? "0" : "1rem", borderRadius: "5px" }}
                        />
                        <Box display={"flex"} flexDirection={"column"}>
                          <Typography style={{ whiteSpace: "pre-line" }}>
                            {product.name}
                          </Typography>
                          <Typography>
                            {product.size ? "Tamaño: " + product.size : ""}
                          </Typography>
                          <Typography>
                            {product.quantityPrice ? "Cantidad: " + product.quantityPrice + "u." : ""}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={1} display="flex" alignItems="center" justifyContent="center" flexDirection="column" my={isMobile ? 2 : 0}>
                      <Typography>{isMobile ? "Color" : ""}</Typography>
                      {Array.isArray(product.ColorName)
                        ? product.ColorName.map((item) => (
                          <Typography key={item} textAlign="center">
                            {item}
                          </Typography>
                        ))
                        : <Typography textAlign="center">{product.ColorName}</Typography>}
                    </Grid>
                    <Grid item xs={6} sm={1} container justifyContent="center" alignItems="center" my={isMobile ? 2 : 0}>
                      <Typography>
                        {isMobile ? "Precio" : ""}
                        <Typography textAlign={"center"}>
                          ${product.price?.toFixed(2)}
                        </Typography>
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={1} container justifyContent="center" alignItems="center" my={isMobile ? 2 : 0}>
                      <Typography>
                        {isMobile ? "Cantidad" : ""}
                        <Typography textAlign={"center"}>
                          {product.quantity}
                        </Typography>
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={1} container justifyContent="center" alignItems="center" my={isMobile ? 2 : 0}>
                      <Typography>
                        {isMobile ? "Subtotal " : ""}
                        <Typography textAlign={"center"}>
                          ${(product.price * product.quantity).toFixed(2)}
                        </Typography>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={3} container justifyContent="center" alignItems="center" my={isMobile ? 3 : 0}   >
                      <Box border={"3px #ccc solid"} borderRadius={"5px"} width={"95%"} height={"95%"}>
                        <Typography px={isMobile ? 2 : 1} py={isMobile ? 1 : 0} >
                        {isMobile ? "Nota: " : ""}
                        <Typography >
                          {(product.detailDescription === "") ? "(Sin detalles)" : product.detailDescription}
                        </Typography>
                      </Typography>
                      </Box>
                      
                    </Grid>
                  </Grid>
                  <hr />
                </>
              )
            })}
          </Box>
          <Box sx={{ border: "1px solid black", textAlign: "end", background: "rgb(230,230,230)", p: 2 }}>
            <Typography sx={{ fontSize: "1.6rem", fontWeight: "600" }}>TOTAL: </Typography>
            <Typography sx={{ fontSize: "1.6rem", fontWeight: "500" }}>${calculateTotal()}</Typography>
          </Box>

        </Box>
      </Box>
      <Footer />
    </Box>
  );
};