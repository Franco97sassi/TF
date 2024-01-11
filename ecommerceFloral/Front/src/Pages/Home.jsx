import { Container, Typography, Box, Stack, Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions, useMediaQuery } from "@mui/material";
import Banner from "../components/banner";
import { UIProvider } from "../context/ui";
import Footer from "../components/footer";
import AppDrawer from "../components/drawer";
import Promotions from "../components/promotions";
import { useEffect, useState } from "react";
import popupImg from "../../src/utils/image/popup.png"


export const Home = () => {



  const [showNetflix, setShowNetflix] = useState(false);

  useEffect(() => {
    // Comprobar si ya se ha mostrado el pop-up
    const hasPopupBeenShown = localStorage.getItem("showLogo");

    // Si no se ha mostrado el pop-up, lo mostramos y almacenamos la bandera en la caché
    if (!hasPopupBeenShown) {
      setShowNetflix(true);
      setTimeout(() => {
        setShowNetflix(false);
        // Almacena la bandera en localStorage para indicar que ya se mostró
        localStorage.setItem("showLogo", "true");
      }, 2000);
    }
  }, []);



  // Estado para controlar si el pop-up debe mostrarse
  const [showPopup, setShowPopup] = useState(false);
  
  const is600 = useMediaQuery("(max-width:600px)");

  const handleClosePopup = () => {
    setShowPopup(false);
    sessionStorage.setItem("popupShown", "true");
  };
  
  useEffect(() => {
    // Comprobar si ya se ha mostrado el pop-up
    const hasPopupBeenShown = sessionStorage.getItem("popupShown");
    

    // Si no se ha mostrado el pop-up, lo mostramos y almacenamos la bandera en la caché
    if (!hasPopupBeenShown) {
      setTimeout(() => {
        setShowPopup(true);
      }, 1200);
      
    }
  }, []);


  

  return (
    <>
    <>
      <Container disableGutters maxWidth={"100%"} sx={{ background: "#fff" }}>
        <Stack>
          <UIProvider>
            <Box height={"100%"}>
              <Banner />
              {/* <Promotions /> */}
            </Box>

            <Footer />
            <AppDrawer />
          </UIProvider>
        </Stack>
      </Container>
      <Dialog open={showPopup} onClose={handleClosePopup} sx={{ height:"100%"}} >
        <Box sx={{display:"flex", justifyContent:"flex-end"}}>
          <Box onClick={handleClosePopup} sx={{margin:"8px", cursor:"pointer"}}>
            X
          </Box>
        </Box>
        <DialogTitle sx={{textAlign:"center", fontSize:is600?"11px":"16px", marginBottom:"-40px"}}>🌸¡Bienvenido a la Experiencia Todo Floral!🌸</DialogTitle>
        <DialogContent >
          
          

        </DialogContent>

        <Box sx={{margin:"16px"}}>
          <Typography sx={{width:"100%",textAlign:"center", fontFamily:"" , color:"#ab9047", fontSize:is600?"11px":"16px", fontWeight:"600"} }>
            Únete al exclusivo Club de Suscripción de Todo Floral por $399 MXN al mes o $3999 MXN al año y disfruta de la magia de las flores todos los días.
          </Typography>
         
          <Typography sx={{width:"100%",textAlign:"center", fontSize:is600?"11px":"16px"}}>
            Beneficios de ser miembro:
          </Typography>
          <Box sx={{display:"flex", alignItems:"center"}}>
          • <Typography sx={{width:"100%",textAlign:"center", fontWeight:600,fontSize:is600?"11px":"16px"}}>
          🌹 20% de descuento permanente en todos tus pedidos.
          </Typography>
          </Box>
          <Box sx={{display:"flex", alignItems:""}}>
          • <Typography sx={{width:"100%",textAlign:"center", fontWeight:500,fontSize:is600?"11px":"16px"}}>
          💐 Descuento válido en arreglos florales, decoración de eventos y servicios de barra de snacks.
          </Typography>
          </Box>
          <Box sx={{display:"flex",}}>
          • <Typography sx={{width:"100%",textAlign:"center", fontWeight:500,fontSize:is600?"11px":"16px"}}>
          🎉 El privilegio de embellecer cada evento con un toque floral único.
          </Typography>
          </Box>
          <Box sx={{display:"flex",}}>
          • <Typography sx={{width:"100%",textAlign:"center", fontWeight:500,fontSize:is600?"11px":"16px"}}>
          🍃 Disfruta de estas ventajas cada vez que realices un pedido con tu suscripción activa.
          </Typography>
          
          </Box>
          <Box sx={{display:"flex",}}>
          • <Typography sx={{width:"100%",textAlign:"center", fontWeight:500,fontSize:is600?"11px":"16px"}}>
          🚚 Envío Gratis: Aprovecha envíos sin costo en todos tus pedidos.
          </Typography>
          </Box>
          </Box>

        <DialogActions>
          <Button style={{background:"#ffc4cc", color:"black", textShadow:"1 1 2 3 4 black", fontWeight:"600", textAlign:"center",fontSize:is600?"11px":"16px"}} href="/subcripciones" onClick={handleClosePopup}>
          ¡Suscríbete ahora y deja que Todo Floral sea el artista de tus espacios!
          </Button>
          
        </DialogActions>
        <div style={{display:"flex", justifyContent:"center"}}>
        <img style={{width:"80%"}} src={popupImg} alt="" />
        </div>
      </Dialog>
    </>
    </>
  );
};



// import { Container, Typography, Box, Stack, Grid, Button } from "@mui/material";
// import Banner from "../components/banner";
// import { UIProvider } from "../context/ui";
// import Footer from "../components/footer";
// import AppDrawer from "../components/drawer";
// import Promotions from "../components/promotions";




// export const Home = () => {
//   return (
//     <>
//       <Container disableGutters maxWidth={"100%"} sx={{ background: "#fff", }}>
//         <Stack>
//           <UIProvider >
//             <Box height={"100%"}>
//               <Banner />
//             <Promotions />
//             </Box>
            
//             <Footer />
//             <AppDrawer />
//           </UIProvider>
//         </Stack>
//       </Container>
//     </>
//   )
// }