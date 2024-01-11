import styled from "@emotion/styled";
import { Button, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { slideInBottom, slideInRight } from "../../animation";
import { Colors } from "../theme";

export const Product = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize:"14px",
  flexDirection: "column",
  [theme.breakpoints.up("md")]: {
    position: "relative",
  },
}));

export const ProductImage = styled("img")(({ src, theme }) => ({
  src: `url(${src})`,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  background: Colors.light_gray,
  padding: "0px",
  borderRadius: "6px",
  animation: "fadeIn 0.8s ease",
  "@keyframes fadeIn": {
    "0%": { opacity: 0, filter: "blur(20px)" },
    "10%": {
      opacity: 1,
      filter: "brightness(2) blur(10px)",
    },
  },
  [theme.breakpoints.down("md")]: {
    width: "100%",
    padding: "0",
  },
}));

export const ProductActionButton = styled(IconButton)(() => ({
  background: Colors.white,
  margin: 4,
}));

export const ProductFavButton = styled(ProductActionButton)(
  ({ isfav, theme }) => ({
    color: isfav ? Colors.primary : Colors.light,
    [theme.breakpoints.up("md")]: {
      position: "absolute",
      right: 0,
      top: 0,
    },
  })
);

export const ProductAddToCart = styled(Button, {
  shouldForwardProp: (prop) => prop !== "show",
})(({ show, theme }) => ({
  width: "120px",
  fontSize: "12px",
  [theme.breakpoints.up("md")]: {
    position: "absolute",
    bottom: "0%",
    width: "300px",
    padding: "10px 5px",
    animation:
      show &&
      `${slideInBottom} 0.2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`,
  },
  background: Colors.secondary,
  opacity: 0.9,
}));

export const ProductActionsWrapper = styled(Box)(({ show, theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: show ? "visible" : "none",
    position: "absolute",
    right: 0,
    top: "20%",
    animation:
      show &&
      `${slideInRight} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`,
  },
}));

export const ProductData = styled(Box)(({ theme }) => ({}));

export const ProductMetaWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  [theme.breakpoints.up("md")]: {
    padding: "0 0 0 2.3rem",
  },
}));

export const ProductName = styled(Box)(({ theme }) => ({
  fontSize: "1em",
  fontFamily: "Roboto,sans-serif",
  fontWeight: 700,
  [theme.breakpoints.down("md")]: {
    display: "flex",
    justifyContent: "center"
  },
  // width:"100%",
  // maxWidth:is600?"9rem":"",
  // minWidth:"9rem"
}));

export const ProductPrice = styled(Box)(({ theme }) => ({
  fontSize: "22px",
  fontWeight: "700",
  marginRight:"0.5rem",
}));

export const ProductPriceDiscount = styled(Box)(({ theme }) => ({
  fontSize: "22px",
  fontWeight: "700",
  color: "green"
}));
