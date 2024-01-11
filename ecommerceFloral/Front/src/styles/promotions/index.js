import { Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
import { Colors } from "../theme";

export const PromotionsContainer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    padding: "30px 0px 30px 0px",
  },
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "15px 0px 15px 0px",
  overflow: "hidden",
  background: Colors.secondary,
}));

export const MessageText = styled(Typography)(({ theme }) => ({
     fontFamily: '',
  [theme.breakpoints.up("md")]: {
    fontSize: "26px",
    textAlign:"center",
    
  },
  color: Colors.white,
  fontSize: "1.5rem",
}));
