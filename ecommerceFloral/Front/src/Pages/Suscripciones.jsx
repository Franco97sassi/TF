import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent, Button ,useMediaQuery,Box} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Suscribirse } from "../state/actions/mercadoPago";
import { updateUser } from '../state/actions/user';
import Footer from '../components/footer';
import imgPop from "../../src/utils/image/fondo.png"


const plans = [
  { id: 'mensual', name: 'Mensual', price: '$399/mes' },
  { id: 'anual', name: 'Anual', price: '$3999/año' },
];

const Subscripciones = ({ decodedToken }) => {
  const dispatch = useDispatch();
  const [showLoginRegister, setShowLoginRegister] = useState(false);
  const [isLoggued, setIsLoggued] = useState(decodedToken?.id ? true : false);
  const is600 = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    if (isLoggued) {
      let userId = decodedToken.id
      dispatch(updateUser(userId))
    }
  }, [isLoggued])

  const handleSubscribe = (plan) => {
    if (decodedToken?.id) {
      const payload = {
        userId: decodedToken.id,
        userName: decodedToken.username,
        userEmail: decodedToken.email,
        subscriptionType: plan.id,
      };

      dispatch(Suscribirse(payload));
    } else {
      setShowLoginRegister(true);
    }
  };

  const handleLogin = () => {
    // Redirige a la página de inicio de sesión (ruta: /login)
    window.location.href = '/login';
  };

  const handleRegister = () => {
    // Redirige a la página de registro (ruta: /register)
    window.location.href = '/register';
  };


  return (
    <>
      <Container maxWidth="md" sx={{ marginTop: '2rem', minHeight: "66vh" }}>
        <Typography sx={{fontSize:is600?"12px":"16px", fontWeight:"600", marginBottom:"32px"}} variant="h1" align="center" gutterBottom>
        🌷 20% de descuento permanente en todos tus pedidos. 🌷
        </Typography>
        <Typography sx={{fontSize:is600?"20px":"36px", fontWeight:"600",fontFamily:"TanPearl" , color:"#ab9047"}} variant="h1" align="center" gutterBottom>
        Bienvenido al club de suscripción Todo Floral
        </Typography>
        <Box sx={{display:"flex", justifyContent:"center", marginTop:"-50px", marginBottom:"-50px"}}>
          <img src={imgPop} style={{width:"100%", maxWidth:"350px"}} alt="imagen subscripcion" />
        </Box>
        
        <Typography sx={{fontSize:is600?"14px":"18px", fontWeight:"500", marginTop:"24px"}} variant="h1" align="center" gutterBottom>
        🌹<span style={{fontWeight:"600"}}>Tu descuento del 20%:</span>  Desde arreglos que capturan la esencia de la temporada hasta la decoración perfecta para tu proximo evento y deliciosa barra de snacks, todo con un 20% de descuento.
        </Typography>
        <Typography sx={{fontSize:is600?"14px":"18px", fontWeight:"500", marginTop:"12px"}} variant="h1" align="center" gutterBottom>
        💐<span style={{fontWeight:"600"}}>Flexibilidad Total:</span>  Usa tu descuento las veces que quieras durante el mes. Cada pedido es una nueva oportunidad para crear belleza.
        </Typography>
        <Typography sx={{fontSize:is600?"14px":"18px", fontWeight:"500", marginTop:"12px"}} variant="h1" align="center" gutterBottom>
        🎉<span style={{fontWeight:"600"}}>Inspiración Constante:</span>  Recibe ideas y consejos exclusivos para decorar tus espacios y eventos.
        </Typography>
        <Typography sx={{fontSize:is600?"14px":"18px", fontWeight:"500", marginTop:"12px"}} variant="h1" align="center" gutterBottom>
        🍃<span style={{fontWeight:"600"}}>Prioridad y Conveniencia:</span>  Acceso prioritario a nuestros nuevos lanzamientos y colecciones especiales.
        </Typography>
        <Typography sx={{fontSize:is600?"14px":"18px", fontWeight:"500", marginTop:"12px"}} variant="h1" align="center" gutterBottom>
        <span style={{fontWeight:"600"}}>🚚 Envío Gratis:</span>  Aprovecha envíos sin costo en todos tus pedidos.
        </Typography>
        <Grid container spacing={2} justifyContent="center" sx={{ marginTop: '2rem', paddingBottom:"36px" }}>
          {plans.map((plan) => (
            <Grid item key={plan.id} xs={12} sm={6} md={4}>
              <Card sx={{display:"flex", justifyContent:"center", border:"2px solid #ffc0cb"}}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{textAlign:"center"}}>
                    Plan {plan.name}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom sx={{textAlign:"center"}}>
                    {plan.price}
                  </Typography>
                  {decodedToken?.id && decodedToken.suscrito ? (
                    decodedToken?.tipoDeSuscripcion === plan.id ? (<Button variant="contained" disabled>
                      ¡Ya lo tienes!
                    </Button>) : (<Button variant="contained" disabled>
                      ¡Ya estas suscripto!
                    </Button>)
                  ) : (
                    <Button  variant="contained" onClick={() => handleSubscribe(plan)}>
                      Suscribirse
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        {showLoginRegister && (
          <div>
            <Typography variant="h6" align="center" sx={{ marginTop: '2rem' }}>
              Por favor, inicia sesión o regístrate para suscribirte.
            </Typography>
            <Grid container spacing={2} justifyContent="center" sx={{ marginTop: '1rem' }}>
              <Grid item>
                <Button variant="contained" onClick={handleLogin}>
                  Iniciar sesión
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" onClick={handleRegister}>
                  Registrarse
                </Button>
              </Grid>
            </Grid>
          </div>
        )}
      </Container>
      <Footer />
    </>

  );
};

export default Subscripciones;