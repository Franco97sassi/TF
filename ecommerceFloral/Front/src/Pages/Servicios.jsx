import React from 'react';
import { Grid, Typography, Container, Button, Box , useMediaQuery} from '@mui/material';
import imagenCarro from "../utils/image/52.jpg"
import { useTheme } from "@mui/material/styles";
import Footer from '../components/footer';
import { Colors } from '../styles/theme';

export const Servicios = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const servicios = [

    {
      titulo: 'Bodas',
      imagen: 'https://cdn.pixabay.com/photo/2017/08/06/20/11/wedding-2595862_1280.jpg',
      frase: 'Celebra el amor con estilo',
    },
    {
      titulo: 'Fiestas',
      imagen: 'https://cursodeorganizaciondelhogar.com/wp-content/uploads/2018/03/decoracion-guirnaldas-con-globos-color-plata-2018-1-3.jpg',
      frase: 'Diversión asegurada para todos',
    },
    {
      titulo: 'Post bodas',
      imagen: 'https://previews.123rf.com/images/dolgachov/dolgachov1501/dolgachov150104738/35771286-d%C3%ADas-de-fiesta-la-gente-los-sentimientos-y-saludos-concepto-cerca-de-hombre-con-cesta-llena-de.jpg',
      frase: 'Celebra el inicio de una nueva etapa',
    },
    {
      titulo: 'Xv’s',
      imagen: 'https://centrosdemesa.co/wp-content/uploads/2018/09/YYYYYYYYYdecoracion-con-globos-para-15-anos-696x335.jpg',
      frase: 'Un día especial para celebrar',
    },
    {
      titulo: 'Centros de mesa',
      imagen: 'https://estudio070.files.wordpress.com/2020/02/decoracic3b3n-flores-boda.jpg',
      frase: 'Detalles únicos para tu evento',
    },
    {
      titulo: 'Baby showers y más…',
      imagen: 'https://decoracionesbonitas.com/wp-content/uploads/2022/01/baby-shower-flores.jpg',
      frase: 'Celebra la llegada de un nuevo miembro',
    },
  ];

  return (
    <div style={{ background: "rgb(230,230,230)" }}>
      <Container>
        <Typography variant="h3" align="center" p={9} fontFamily={'TanPearl'} fontSize={"2rem"}>
          NUESTROS SERVICIOS
        </Typography>
        <Grid container spacing={2}>
          {servicios.map((servicio, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box sx={{ width: "100%" , height: "80%" }}>
              <img src={servicio.imagen} alt={servicio.titulo} style={{ width: '100%', height: "100%", objectFit: "cover", objectPosition: "50% 0%"   }} />  
              </Box>
              <Typography variant="h6" align="center">
                {servicio.titulo}
              </Typography>
              <Typography variant="body1" align="center">
                {servicio.frase}
              </Typography>
            </Grid>
          ))}
          <Box sx={{ display: "flex", 
          flexDirection: matches? "column" : "",
          alignItems: "center", 
          width:"100%",
          ml:"16px",
          justifyContent: "space-between", 
          border: "solid 4px", 
          borderRadius: "10px", 
          maxHeight:"300px",
          mb: 8, 
          mt: matches? 4 : 6,
          overflow: "hidden", 
          borderColor: Colors.black }}>
            <Box sx={{ width:matches? "100%" : "33%", height: "100%" }}>
              <img src={imagenCarro} alt="" style={{ width: '100%', height: "100%", objectFit: "cover", objectPosition: "50% 25%"  }} />
            </Box>
            <Box sx={{ width:matches? "85%" : "66%", display: "flex", alignItems: "center", flexDirection: 'column' }}>
              <Typography sx={{
                fontSize: "1.9rem",
                fontFamily: "TanPearl",
                textAlign: "center",
                my: 4
              }}>
                CARRITO DE SNACKS PARA TU EVENTO
              </Typography>
              <Typography sx={{
                fontSize: "1.1rem", px: matches? 0 : 8, mb: 5
              }}>
                Cotizá muy rápido en nuestra sección de Snacks, eleíi la cantidad de invitados, los Snacks que más te gusten, la fecha del evento y listo!
              </Typography>
              <Button href='/snackcart' sx={{
                background: Colors.primary, color: "white",
                textAlign: 'center',
                px: 5,
                mb:5
              }}>
                Cotizar Carrito de Snacks
              </Button>
            </Box>
          </Box>
        </Grid>
      </Container>
      <Footer />
    </div >
  );
};

