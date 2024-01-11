import { useEffect, useState } from "react";
import {
  Product,
  ProductActionsWrapper,
  ProductImage,
} from "../../styles/product";
import { Stack, Tooltip, Typography, Box } from "@mui/material";
import useDialogModal from "../../hooks/useDialogModal";
import ProductDetail from "../productdetail";
import ProductMeta from "./ProductMeta";



export default function SingleProductDesktop({ product, matches }) {
  const [productPrice, setProductPrice] = useState(product?.prices?.[0]);

  const [ProductDetailDialog, showProductDetailDialog, closeProductDialog] =
    useDialogModal(ProductDetail);

  const [showOptions, setShowOptions] = useState(false);

  const handleMouseEnter = (event) => {
    setShowOptions(true);
    event.target.style.cursor = "pointer";
  };
  const handleMouseLeave = () => {
    setShowOptions(false);
  };

  return (
    <>
      <Product
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => showProductDetailDialog()}
        border={"2px solid #ab904775"} borderRadius={"6px"}
      >
        <Box
          sx={{
            maxWidth: "300px",
            maxHeight: "300px",
            minWidth: "300px",
            minHeight: "300px",
          }}
        >
          <ProductImage src={product.image} />
        </Box>
        <ProductActionsWrapper show={showOptions || matches}>
          <Stack direction={matches ? "row" : "column"}></Stack>
        </ProductActionsWrapper>
      </Product>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "flex-start",
          marginLeft: "0%",
          width: "100%",
        }}
      >
        <ProductMeta product={product} selectedPrice={productPrice} />
      </Box>

      
      <ProductDetailDialog product={product}/>
    </>
  );
}
