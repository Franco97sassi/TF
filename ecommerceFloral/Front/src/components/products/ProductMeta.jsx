import { Box , useMediaQuery} from "@mui/material";
import { ProductMetaWrapper, ProductPrice, ProductName, ProductPriceDiscount } from "../../styles/product";

const userData = JSON.parse(localStorage.getItem('userData') || '{}');
const decodedToken = userData?.user ? JSON.parse(atob(userData.user.split('.')[1])) : null;
const isSub = decodedToken?.user?.suscrito || false;

export default function ProductMeta({ product, matches, selectedPrice }) {
  const is600 = useMediaQuery("(max-width:600px)");
  return (
    <ProductMetaWrapper>
      <ProductName sx={{width:"100%", maxWidth:is600?"9rem":"100%", minWidth:is600?"9rem":"100%"}}>
        {product.name}
      </ProductName>
      <Box sx={{ display: "flex" }}>
        {isSub ? (
          selectedPrice ? 
          (<>
            <ProductPrice><strike>${selectedPrice.price}</strike></ProductPrice>
            <ProductPriceDiscount> ${selectedPrice.price * 0.8}</ProductPriceDiscount>
          </>) :
            (<>
              <ProductPrice><strike>${product?.prices[0]?.price}</strike></ProductPrice>
              <ProductPriceDiscount>${product?.prices[0]?.price * 0.8}</ProductPriceDiscount>
            </>)) : (<ProductPrice>
              ${selectedPrice ? selectedPrice.price : product?.prices[0]?.price}
            </ProductPrice>)
        }
      </Box>
    </ProductMetaWrapper >
  );
}