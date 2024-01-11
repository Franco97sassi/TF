import React, { useState } from "react";
import {
  Typography,
  IconButton,
  Grid,
  Box,
  Button,
  useMediaQuery,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Colors } from "../styles/theme";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  removeProduct,
  updateQuantity,
} from "../state/slices/CartSlice";
import Footer from "../components/footer";


const CartItem = ({ item, onUpdateQuantity, onDelete }) => {
  const {
    id,
    name,
    price,
    quantity,
    image,
    color,
    ColorName,
    size,
    quantityPrice,
  } = item;
  const handleQuantityChange = (newQuantity) => {
    onUpdateQuantity(id, newQuantity, color, size, price);
  };
  const isMobile = useMediaQuery("(max-width:600px)");
  const isDiscount = item.id === "4c8d59f7-2c46-4c4f-bd86-329cdde5857f"
  const isEnvio = item.id === "4c8d59f7-2c46-4c4f-bd86-329cdde5857e"
  const isSnack = item.image === "https://static.vecteezy.com/system/resources/previews/005/013/755/original/snack-logo-design-with-cassava-chips-icon-and-letter-s-initials-free-vector.jpg"

  return (
    <Grid container spacing={0} alignItems="center" sx={{ py: "1.3rem" }}>
      <Grid item xs={12} sm={4} sx={{ px: isMobile ? 1 : 2, paddingRight: "0" }}>
        <Box display="flex" alignItems="center" my={isMobile ? 2 : 0} justifyContent={isMobile ? "space-around" : ""} >
          <img
            src={image}
            alt={name}
            style={{ width: "115px", height: "115px", marginInline: isMobile ? "0" : "1rem", borderRadius: "5px" }}
          />
          <Box display={"flex"} flexDirection={"column"}>
            <Typography style={{ whiteSpace: "pre-line" }}>
              {name}
            </Typography>
            <Typography>
              {size ? "Tamaño: " + size : ""}
            </Typography>
            <Typography>
              {quantityPrice ? "Cantidad: " + quantityPrice + "u." : ""}
            </Typography>
          </Box>

        </Box>
      </Grid>
      <Grid item xs={6} sm={1} display="flex" alignItems="center" justifyContent="center" flexDirection="column" my={isMobile ? 2 : 0}>
        <Typography>{isMobile ? "Color" : ""}</Typography>
        {Array.isArray(ColorName) ?
          ColorName.map((item) => (
            <Typography key={item} textAlign="center">
              {item}
            </Typography>
          ))
          : <Typography textAlign="center">{ColorName}</Typography>}
      </Grid>

      <Grid item xs={6} sm={2} container justifyContent="center" alignItems="center" my={isMobile ? 2 : 0}>
        <Typography >
          {isMobile ? "Precio" : ""}
          <Typography >
            ${price?.toFixed(2)}
          </Typography>
        </Typography>
      </Grid>
      <Grid item xs={12} sm={2} container justifyContent="center" my={isMobile ? 2 : 0}>
        <Box display="flex" alignItems="center" sx={{ borderRadius: "3px", width: isMobile ? "70%" : "45%", border: "solid 1px lightgrey", }}>
          {isMobile ? <Typography px={1}> Cantidad  </Typography> : <></>}
          <IconButton
            sx={{ width: "25%", height: '100%', background: "#f2f2f2", borderRadius: "0", }}
            disabled={quantity <= 0 || isDiscount || isEnvio || isSnack}
            onClick={() => handleQuantityChange(quantity - 1)}
          >
            -
          </IconButton>
          <Typography sx={{
            width: "50%", height: '100%', display: 'flex', justifyContent: "center", alignItems: "center", border: "solid 1px lightgrey", borderTop: 0,
            borderBottom: 0,
          }}>{quantity}</Typography>
          <IconButton
            sx={{ width: "25%", height: '100%', background: "#f2f2f2", borderRadius: "0", }}
            disabled={isDiscount || isEnvio || isSnack}
            onClick={() => handleQuantityChange(quantity + 1)}
          >
            +
          </IconButton>
        </Box>
      </Grid>
      <Grid item xs={6} sm={2} container justifyContent={isMobile ? "center" : "flex-end"} alignItems="center" my={isMobile ? 2 : 0}>
        <Typography>
          {isMobile ? "Subtotal " : ""}
          <Typography>
            ${(price * quantity).toFixed(2)}
          </Typography>
        </Typography>
      </Grid>
      <Grid item xs={6} sm={1} container justifyContent={isMobile ? "center" : "flex-end"} alignItems="center" my={isMobile ? 2 : 0}>
        <IconButton
          size={isMobile ? "" : "small"}
          sx={{ color: "#F44336" }}
          onClick={() => onDelete(id)}
        >
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [cartItems, setCartItems] = useState(cart);
  const [shippingChecked, setShippingChecked] = useState(false);

  const isMobile = useMediaQuery('(max-width:600px)');

  const updateQuantitys = (productId, newQuantity, color, size, price) => {
    if (newQuantity < 1) {
      return;
    }

    const updatedItems = cartItems.map((cartItem) => {
      if (
        cartItem.id === productId &&
        cartItem.color === color &&
        cartItem.size === size &&
        cartItem.price === price
      ) {
        dispatch(
          updateQuantity({
            productId: cartItem.id,
            quantity: newQuantity,
            color: cartItem.color,
            size: cartItem.size,
            price: cartItem.price,
          })
        );

        return { ...cartItem, quantity: newQuantity };
      }
      return cartItem;
    });

    setCartItems(updatedItems);
  };

  const removeFromCart = (productId, color) => {
    const index = cartItems.findIndex(
      (cartItem) => cartItem.id === productId && cartItem.color === color
    );
    if (index !== -1) {
      const updatedItems = [...cartItems];
      updatedItems.splice(index, 1);
      setCartItems(updatedItems);
      dispatch(removeProduct({ productId, color }));
    }
  };

  const calculateTotal = () => {
    let total = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    if (shippingChecked) {
      total += 80;
    }
    return total;
  };

  const calculateDiscountedTotal = () => {
    if (isSub) {
      return (calculateTotal() * 0.80).toFixed(2);
    } else {
      return calculateTotal().toFixed(2);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          minHeight: "70vh"
        }}
      >
        <div
          style={{
            marginBottom: "28px",
            marginTop: "28px",
            background: Colors.light_gray,
            width: isMobile ? "95%" : "80%",
            padding: isMobile ? "15px" : "20px",
            borderRadius: "5px",
          }}
        >
          <Typography
            variant="h5"
            sx={{ display: "flex", justifyContent: "center", textAlign: "center" }}
            fontFamily={'TanPearl'} fontSize={"2rem"} my={3}
          >
            CARRITO DE COMPRA
          </Typography>
          <hr />
          {cartItems.length === 0 ? (
            <Typography>No hay productos en el carrito.</Typography>
          ) : (
            <div>
              {isMobile ? (
                <></>
              ) : (
                <>
                  <Grid container spacing={0} display="flex" justifyContent="space-between">
                    <Grid
                      item
                      xs={12}
                      sm={3}
                      container
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Typography variant="h6">Producto</Typography>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={1}
                      container
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    ></Grid>
                    <Grid
                      item
                      xs={12}
                      sm={1}
                      container
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Typography variant="h6">Color</Typography>
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      sm={2}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Typography variant="h6">Precio</Typography>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={2}
                      container
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Typography variant="h6">Cantidad</Typography>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={2}
                      container
                      display="flex"
                      justifyContent="end"
                      alignItems="center"
                    >
                      <Typography variant="h6" pl={5}>Subtotal</Typography>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={1}
                      container
                      display="flex"
                      justifyContent="stretch"
                      alignItems="center"
                    >
                    </Grid>
                  </Grid>
                  <hr />
                </>

              )}

              {cartItems.map((item) => (
                <>
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={(
                      productId,
                      newQuantity,
                      color,
                      size,
                      price
                    ) =>
                      updateQuantitys(
                        productId,
                        newQuantity,
                        color,
                        size,
                        price
                      )
                    }
                    onDelete={(productId, color) =>
                      removeFromCart(productId, item.color)
                    }
                  />
                  <hr />
                </>
              ))}

              <Grid container spacing={2} justifyContent="flex-end">
                <Grid
                  item
                  xs={12}
                  sm={2}
                  container
                  justifyContent="flex-end"
                  alignItems="center"
                ></Grid>
                <Grid
                  item
                  xs={12}
                  sm={2}
                  container
                  justifyContent="flex-end"
                  alignItems="center"
                ></Grid>
                <Grid
                  item
                  xs={12}
                  sm={2}
                  container
                  justifyContent="flex-end"
                  alignItems="center"
                >
                  <Typography
                    sx={{
                      fontSize: "1.5rem",
                      fontWeight: "500",
                      color: "#000",
                    }}
                  >
                    <Typography sx={{ textAlign: "end", color: "black", fontWeight: "700", fontSize: "1.5rem", }}>
                      TOTAL
                    </Typography>{" "}
                    ${calculateTotal().toFixed(2)}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container justifyContent="flex-end" pt={5}>
                <a href="/realizarpedido">
                  <Button variant="contained" color="primary">
                    Realizar pedido
                  </Button>
                </a>
              </Grid>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};
