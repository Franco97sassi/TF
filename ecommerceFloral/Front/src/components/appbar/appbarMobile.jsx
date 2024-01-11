import { AppbarContainer, AppbarHeader } from "../../styles/appbar";
import MenuIcon from "@mui/icons-material/Menu";
import Actions from "./actions";
import { IconButton } from "@mui/material";
import { useUIContext } from "../../context/ui";
import logo from "../../utils/image/logo.png.png"

export default function AppbarMobile({ matches }) {
  const { setDrawerOpen, setShowSearchBox } = useUIContext();
  return (
    <AppbarContainer sx={{backgroundColor: "#ffc4cc" , margin: "0", height: "6rem"}}>
      <IconButton onClick={() => setDrawerOpen(true)}>
        <MenuIcon />
      </IconButton>
      <AppbarHeader textAlign={"center"} variant="h4" >
       <img src={logo} style={{maxWidth:"100px", paddingTop: "1.4rem"}} alt="todo floral"></img>
      </AppbarHeader>
      <IconButton >
        <div style={{margin:"10px"}}></div>
      </IconButton>
      <Actions matches={matches} />
    </AppbarContainer>
  );
}
