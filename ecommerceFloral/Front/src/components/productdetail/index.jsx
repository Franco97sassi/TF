import {
  Dialog,
  DialogTitle,
  Slide,
  Box,
  IconButton,
  DialogContent,
  Typography,
  Button,
  TextField,
  Divider,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { Colors } from "../../styles/theme";
import styled from "@emotion/styled";
import { Product, ProductImage } from "../../styles/product";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

import { useDispatch } from "react-redux";
import { addProduct } from "../../state/slices/CartSlice";

import PriceSelect from "../selectprice/PriceSelect";
import ColorSelect from "../selectcolor/selectcolores";

import ImageGallery from "react-image-gallery";

import { useEffect, useState } from "react";
import logo from "../../utils/image/logo.png.png";

import "react-image-gallery/styles/css/image-gallery.css";



const userData = JSON.parse(localStorage.getItem('userData') || '{}');
const decodedToken = userData?.user ? JSON.parse(atob(userData.user.split('.')[1])) : null;
const isSub = decodedToken?.user?.suscrito || false;

function SlideTransition(props) {
  return <Slide direction="down" {...props} />;
}

const ProductDetailWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  padding: theme.spacing(2),
}));

const ProductDetailInfoWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  maxWidth: 500,
  lineHeight: 0,
}));

export default function ProductDetail({
  open,
  onClose,
  product
}) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch()
  const [description, setDescription] = useState("")
  const [quantity, setQuantity] = useState(1); // O la cantidad deseada
  const [selectedColors, setSelectedColors] = useState([product?.Stocks[0]]);
  const [selectedPrice, setSelectedPrice] = useState(product?.prices?.[0] );

  const handleAddToCart = () => {
    const { id, name, image } = product;
    const productData = {
      id,
      name: name,
      image,
      size: selectedPrice.size,
      price: isSub? selectedPrice.price * 0.8 :selectedPrice.price,
      quantityPrice: selectedPrice.quantity,
      quantity: quantity,
      color: selectedColors.map((item) => item.CodigoColor),
      ColorName: selectedColors.map((item) => item.ColorName),
      detailDescription: description,
    };
    dispatch(addProduct(productData));
  };

  const handleColorChange = (index, event) => {
    const color = event.target.value;
    const newSelectedColors = [...selectedColors];
    newSelectedColors[index] = color;
    setSelectedColors(newSelectedColors);
  };

  const handleAddColorSelect = () => {
    if (selectedColors.length < 3) {
      setSelectedColors([...selectedColors, product?.Stocks[0]]);
    }
  };

  const handleRemoveColorSelect = () => {
    const numSelectedColors = selectedColors.length;
    if (numSelectedColors > 0) {
      const newSelectedColors = selectedColors.slice(0, numSelectedColors - 1);
      setSelectedColors(newSelectedColors);
    }
  };

  const handlePriceChange = (event) => {
    setSelectedPrice(event.target.value);
  };

  const imageGalleryItems = [
    {
      original: product?.image, // La URL de la imagen de portada
      thumbnail: product.image, // Puedes usar la misma URL para el thumbnail o proporcionar una diferente
     // description: product.description, // Opcional: Puedes proporcionar una descripción si la tienes
    },
    ...(product?.images?.length
      ? product.images.map((image) => ({
          original: image.url, // La URL original de las otras imágenes
          thumbnail: image.url, // Puedes usar la misma URL para el thumbnail o proporcionar una diferente
          // description: image.description, // Opcional: Puedes proporcionar una descripción si la tienes
        }))
      : []),
  ];

  const ImageGalleryWrapper = styled(Box)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background:"",
    height: "100%",  // Ajusta según tus necesidades
    width:"100%",
    overflow: "hidden",  // Evita que las imágenes desborden
    ".image-gallery-image": {
      objectFit: "cover",  // Ajusta esto según tus necesidades
      height: "433px",  // Establece un alto fijo para las imágenes
      width: "100vw",   // Establece un ancho fijo para las imágenes
      maxWidth:"577px"
      //margin: "auto",   // Centra la imagen horizontalmente
    },
    
  
  ".image-gallery-thumbnail": {
    width: "40px",
    height: "40px", // Ajusta según tus necesidades
    
  },
  ".image-gallery-fullscreen-button": {
    display: "none", // Oculta el botón de pantalla completa
  },
  });


  
  return (
    <Dialog
      TransitionComponent={SlideTransition}
      variant="permanant"
      open={open}
      fullScreen
      
    >
      <DialogTitle
        sx={{
          background: Colors.secondary,
          mb: "55px"
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent={"space-between"}
          sx={{ height: "4rem" }}
        >
          <Box>
            {" "}
            <a  href="/productos">
            <img style={{ maxWidth: "100px" }} src={logo} alt="todo floral" />
            </a>
          </Box>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <ProductDetailWrapper display={"flex"} flexDirection={matches ? "column" : "row"} justifyContent={"center"} alignItems={matches ? "center" : "normal"}>
          <Product sx={{ overflow: "hidden", border: "solid 1px lightgrey", borderRadius: "3px",  background:"" }}
            maxWidth={matches ? "500px" : "700px"}
            width={"100%"}
            
            
          >
            <ImageGalleryWrapper>
              <ImageGallery autoPlay={true} thumbnailAlt={true} items={imageGalleryItems ? imageGalleryItems : []} />
            </ImageGalleryWrapper>
            {/* <ProductImage src={product.image} />
            a */}

            

          </Product>
          <ProductDetailInfoWrapper sx={{ mr: "2vw", ml: "2vw", }}
            width={matches ? '100%' : '45%'}
            height={matches ? '100%' : '45%'}>

            <Typography sx={{ fontWeight: "500", fontSize: "2.5rem" }} variant="h4" fontFamily={'TanPearl'}>
              {product.name.charAt(0).toLocaleUpperCase()}{product.name.slice(1).toLocaleLowerCase()}
            </Typography>
            <Divider sx={{ borderColor: "#ffc4cc", my: 2 }} />
            <Typography sx={{ fontFamily: "Roboto,sans-serif", fontWeight: "500", fontSize: "2.25rem" }} variant="h5" alignItems="center">$
              {isSub? <>
              <strike>{selectedPrice.price}</strike> ${selectedPrice.price * 0.8}</>  :
              selectedPrice.price}
            </Typography>


            <Box sx={{ my: 2, border: "solid 1px lightgrey", borderRadius: "3px", p: 1 }}>
              <Typography sx={{ fontFamily: "Roboto,sans-serif", fontWeight: "400", fontSize: "1.1rem" }} variant="h5">
                Descripción
              </Typography>
              <Box display="flex"
                alignItems="center" sx={{ height: "auto", px: 2, py: 3 }}>
                <Typography sx={{ fontFamily: "Roboto,sans-serif", fontWeight: "400", fontSize: ".95rem" }} variant="h5">
                  {product.description}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box sx={{ display: "flex", alignItems: "center", width: "100%", flexDirection: "column" }}>
                <Box sx={{ display: "flex", mb: 2, alignItems: "center", justifyContent: "space-evenly", flexDirection: matches ? "column" : "row" }}>
                  <Typography>Color:</Typography>
                  {selectedColors.map((selectedColor, index) => (
                    <Box key={index} sx={{ ml: matches ? "" : index > 0 ? 2 : 0 }}>
                      <ColorSelect
                        product={product}
                        selectedColor={selectedColor}
                        handleColorChange={(color) => handleColorChange(index, color)}
                      />
                    </Box>
                  ))}
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-evenly", width: "100%", mb: 3 }}>
                  <Button variant="contained" disabled={selectedColors.length === 3} onClick={handleAddColorSelect}>
                    agregar color
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleRemoveColorSelect}
                    disabled={selectedColors.length === 1}
                  >
                    remover color
                  </Button>
                </Box>

              </Box>

              <Box sx={{}}>
                <TextField inputProps={{ style: { height: 50 }, maxLength: 2000 }}
                  name="description"
                  multiline
                  fullWidth
                  placeholder="Envia un mensaje especial… Por ejemplo: ¡Feliz Cumpleaños!"
                  label="Nota (opcional):"
                  onChange={(e) => setDescription(e.target.value)} />
              </Box>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3, mt: 4 }} >
              <Box display="flex" alignItems="center" sx={{ borderRadius: "3px", width: "45%", border: "solid 1px lightgrey", }}>
                <IconButton
                  sx={{ width: "25%", height: '100%', background: "#f2f2f2", borderRadius: "0", }}
                  disabled={quantity <= 1}
                  onClick={() => setQuantity(quantity - 1)}
                >
                  -
                </IconButton>
                <Typography sx={{
                  width: "50%", height: '100%', display: 'flex', justifyContent: "center", alignItems: "center", border: "solid 1px lightgrey", borderTop: 0,
                  borderBottom: 0,
                }}
                >
                  {quantity}
                </Typography>
                <IconButton
                  sx={{ width: "25%", height: '100%', background: "#f2f2f2", borderRadius: "0", }}
                  onClick={() => setQuantity(quantity + 1)}>
                  +
                </IconButton>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography sx={{ textAlign: "center", mr: 0.5 }}>Tamaño:
                </Typography>
                <Box >
                  <PriceSelect product={product} selectedPrice={selectedPrice} setSelectedPrice={setSelectedPrice} handlePriceChange={handlePriceChange} />
                </Box>
              </Box>
            </Box>
            <Box
              sx={{ width: "100%", display: "flex", justifyContent: "center", }}
            >
              {/* <IncDec /> */}

              <Button variant="contained"
                fullWidth
                sx={{ py: 2, width: "45%" }}
                onClick={handleAddToCart}>
                Añadir al carrito
              </Button>
            </Box>
          </ProductDetailInfoWrapper>
        </ProductDetailWrapper>
      </DialogContent>
    </Dialog >
  );
}
