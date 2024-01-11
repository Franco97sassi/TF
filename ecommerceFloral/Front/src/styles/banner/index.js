import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Colors } from "../theme";
import { useMediaQuery } from "@mui/material";
import fondoInicio from "../../utils/image/fondoInicio.png"
 
const slideAndFade = {
  '@keyframes slideAndFade': {
    from: {
      opacity: 0,
      transform: 'translate(100%, 100%)', // Comenzando desde la esquina inferior derecha
    },
    to: {
      opacity: 1,
      // transform: 'translate(35%, 15%)', // Terminando en el centro
      transform: 'translate(20%, 20%)', // Terminando en el centro

    },
  },
};
export const BannerContainer = styled(Box)(({ matches, theme }) => ({
  display: "flex",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  padding: "0px 0px",
   
    background: Colors.light_gray,
    backgroundImage: `url(${fondoInicio})`, 
      backgroundRepeat: "no-repeat",
     backgroundPosition: "center",
     backgroundSize: "cover",  // Esto asegura que la imagen cubra todo el fondo
     overflow: "hidden", // Añadir para ocultar el desbordamiento

     [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  }));
  
  
  // backgroundImage: `url(/images/banner/banner.png)`,
  // backgroundRepeat: "no-repeat",
  // backgroundPosition: "center",
 

export const BannerContent = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  maxWidth: "35rem",
  padding: "30px",
}));


export const BannerImage = styled("img")(({ src, theme }) => ({
  ...slideAndFade, // Incluir la animación aquí
  src: `url(${src})`,
  width: "650px",
  animation: 'slideAndFade 1.5s ease-out forwards', // Se añade 'forwards' aquí
  [theme.breakpoints.down("md")]: {
    width: "350px",

  },
  [theme.breakpoints.down("sm")]: {
    width: "320px",
    height: "300px",
    
  },
}));



export const BannerTitle = styled(Typography)(({ matches, theme }) => ({
  lineHeight: 1.5,
  fontSize: "3.3rem",
  marginBottom: "20px",
  [theme.breakpoints.down('sm')]: {
    fontSize:  '36px',    
    textAlign:"center",
    fontFamily:"Commissioner"
  }
}));

export const BannerDescription = styled(Typography)(({ theme }) => ({
  lineHeight: 1.25,
  letterSpacing: 1.25,
  marginBottom: "3em",
  [theme.breakpoints.down("md")]: {
    lineHeight: 1.15,
    letterSpacing: 1.15,
    marginBottom: "1.5em",textAlign:"center",
  },
}));

export const BannerShopButton = styled(Button, {
  // Configure which props should be forwarded on DOM
  shouldForwardProp: (prop) => prop !== "color",
  name: "MyShopButton",
  slot: "Root",
   
  // We are specifying here how the styleOverrides are being applied based on props
  overridesResolver: (props, styles) => [
    styles.root,
    props.color === "primary" && styles.primary,
    props.color === "secondary" && styles.secondary,
  ],
})(({ theme }) => ({
  padding: "20px 0px",
  color: Colors.white,
  fontWeight: 600,
  fontSize: "24px", height:"64px",
  width:"293px",
  [theme.breakpoints.down("sm")]: {
    padding: "10px 0px",
    fontSize: "14px",
  },
}));
