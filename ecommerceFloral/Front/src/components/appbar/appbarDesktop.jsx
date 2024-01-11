import {
  Box,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { AppbarContainer, AppbarHeader, MyList } from "../../styles/appbar";
import { Link as RouterLink } from "react-router-dom";
import logo from "../../utils/image/logo.png.png";

import Actions from "./actions";


export default function AppbarDesktop({ matches }) {
  

  return (
    <AppbarContainer sx={{backgroundColor: "#ffc0cb ", margin: "0", maxHeight: "100px"}}>
      <Box>
        {" "}
        <img style={{ maxWidth: "100px" }} src={logo} alt="todo floral" />
      </Box>
      <MyList type="row" sx={{ justifyContent: "flex-end" }}>
        <ListItemButton
          component={RouterLink}
          to="/"
          style={{ textDecoration: "none", maxWidth: "7rem", justifyContent:"center"}}
        >
          <div style={{fontFamily:"Montserrat", fontWeight:"600", textAlign:"center"}}>Inicio</div>
          
          {/* <ListItemText  primary="Inicio" sx={{textAlign: "center"}}/> */}
        </ListItemButton>
        <ListItemButton
          component={RouterLink}
          to="/subcripciones"
          style={{ textDecoration: "none", maxWidth: "7rem", justifyContent:"center"}}
        >
          <div style={{fontFamily:"Montserrat", fontWeight:"600", textAlign:"center"}}>¡Suscribete!</div>
          {/* <ListItemText sx={{textAlign: "center"}} primary="¡Suscribete!" /> */}
        </ListItemButton>

        <ListItemButton
          component={RouterLink}
          to="/productos"
          style={{ textDecoration: "none", maxWidth: "7rem", justifyContent:"center"}}
        >
          <div style={{fontFamily:"Montserrat", fontWeight:"600", textAlign:"center"}}>Flores</div>
          {/* <ListItemText sx={{textAlign: "center"}} primary="Flores" /> */}
        </ListItemButton>
        <ListItemButton
          component={RouterLink}
          to="/snackcart"
          style={{ textDecoration: "none", maxWidth: "10rem", justifyContent:"center"}}
        >
          <div style={{fontFamily:"Montserrat", fontWeight:"600", textAlign:"center"}}>Cotizar Snacks</div>
          {/* <ListItemText sx={{textAlign: "center"}} primary="Cotizar Snacks" /> */}
        </ListItemButton>

        <ListItemButton
          component={RouterLink}
          to="/servicios"
          style={{ textDecoration: "none", maxWidth: "7rem"}}
        >
          <div style={{fontFamily:"Montserrat", fontWeight:"600", textAlign:"center"}}>Servicios</div>
          {/* <ListItemText sx={{textAlign: "center"}} primary="Servicios" /> */}
        </ListItemButton>
      </MyList>
      <Actions matches={matches} />
    </AppbarContainer>
  );
}
