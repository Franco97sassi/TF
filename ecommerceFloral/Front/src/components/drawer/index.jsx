import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  styled,
} from "@mui/material";
import { useUIContext } from "../../context/ui";
import CloseIcon from "@mui/icons-material/Close";
import { DrawerCloseButton } from "../../styles/appbar";
import { lighten } from "polished";
import { Colors } from "../../styles/theme";

const MiddleDivider = styled((props) => (
  <Divider variant="middle" {...props} />
))``;


export default function AppDrawer() {
  const { drawerOpen, setDrawerOpen } = useUIContext();

  return (
    <>
      {drawerOpen && (
        <DrawerCloseButton onClick={() => setDrawerOpen(false)}>
          <CloseIcon
            sx={{
              fontSize: "2.5rem",
              color: lighten(0.09, Colors.secondary),
            }}
          />
        </DrawerCloseButton>
      )}
      <Drawer open={drawerOpen}>
        <List>
          <ListItemButton>
            <a style={{ textDecoration: "none", color: "white" }} href="/">
              <ListItemText >Inicio</ListItemText></a>
          </ListItemButton>
          <MiddleDivider />
          <ListItemButton>
            <a style={{ textDecoration: "none", color: "white" }} href="/subcripciones">
              <ListItemText>¡Suscribete!</ListItemText></a>
          </ListItemButton>
          <MiddleDivider />
          <ListItemButton>
            <a style={{ textDecoration: "none", color: "white" }} href="/productos">
              <ListItemText>Flores</ListItemText></a>
          </ListItemButton>
          <MiddleDivider />
          <a style={{ textDecoration: "none", color: "white" }} href="/snackcart">
            <ListItemButton>
              <ListItemText>Cotizar Snack</ListItemText>
            </ListItemButton></a>
          <MiddleDivider />
          <a style={{ textDecoration: "none", color: "white" }} href="/servicios">
            <ListItemButton>
              <ListItemText>Servicios</ListItemText>
            </ListItemButton></a>
          <MiddleDivider />

          <MiddleDivider />
        </List>
      </Drawer>
    </>
  );
}
