import { ListItemButton, ListItemIcon } from "@mui/material";
import { ActionIconsContainerDesktop, ActionIconsContainerMobile, MyList } from "../../styles/appbar";
import PersonIcon from "@mui/icons-material/Person";
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import React, {useEffect, useState} from "react";
import { useTheme } from '@mui/material/styles';
import {useDispatch, useSelector} from "react-redux"

export default function Actions({ matches }) {

  const Component = matches ? ActionIconsContainerMobile : ActionIconsContainerDesktop;
  const theme = useTheme();

  const [w, setW] = useState(window.innerWidth);

  useEffect(()=>{
    const handleResize = () =>{
      setW(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () =>{
      window.removeEventListener("resize", handleResize)
    };
  }, [])

  const cart = useSelector(state => state.cart)
  return (
    <Component>
      <MyList type="row">
        <ListItemButton
          sx={{
            justifyContent: "center",
          }}
          to="/cart"
        >
          <ListItemIcon
            sx={{
              display: "flex",
              justifyContent: "center",
              color: "white",
            }}
            primary="Cart"
          ><Badge badgeContent={cart?.length} sx={{color: w>900 ? 'black' : 'white'}}>
            <ShoppingCartIcon/></Badge>
          </ListItemIcon>
        </ListItemButton>
        
        <ListItemButton
          sx={{
            justifyContent: "center",
          }}
          to="/account"
        >
          <ListItemIcon
            sx={{
              display: "flex",
              justifyContent: "center",
              color: w>900 ? 'black' : 'white',
            }}
          >
            <PersonIcon  />
          </ListItemIcon>
        </ListItemButton>
      </MyList>
    </Component>
  );
}
