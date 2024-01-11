import { Container, Typography, Box, Stack, Grid, Button } from "@mui/material";
import Products from "../components/products";
import { UIProvider } from "../context/ui";
import Footer from "../components/footer";
import AppDrawer from "../components/drawer";




export const Productos = () => {
  return (
    <>
      <Container disableGutters maxWidth="100%" sx={{ background: "rgb(230,230,230)", }}>
        <Stack>
          <UIProvider>
            <Box display="flex" justifyContent="center" sx={{ py:9 }}>
              <Typography variant="h4" fontFamily={'TanPearl'} fontSize={"2rem"} textAlign="center">NUESTROS PRODUCTOS</Typography>
            </Box>
            <Products />
            <AppDrawer />
          </UIProvider>
        </Stack> 
        
      </Container>
      <Footer />
    </>
  )
}