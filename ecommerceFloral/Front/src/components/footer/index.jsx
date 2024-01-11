import styled from "@emotion/styled";
import {
  Grid,
  List,
  ListItemText,
  Typography,
  IconButton,
  Stack,
  InputAdornment,
} from "@mui/material";
import { Box } from "@mui/system";
import { Colors } from "../../styles/theme";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsappIcon from "@mui/icons-material/WhatsApp";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { SubscribeTf, FooterTitle } from "../../styles/footer";
import SendIcon from "@mui/icons-material/Send";
import { useMediaQuery } from "@mui/material";

import Swal from "sweetalert2";

export default function Footer() {
  const is600 = useMediaQuery("(max-width:600px)");
  return (
    <Box
      sx={{
        background: Colors.shaft,
        color: Colors.white,
        px: { xs: 2, md: 4 },
        pt: 2,
        pb: 0,
        fontSize: { xs: "12px", md: "14px" },
        position: "relative",
        bottom: 0,
        width: "100%",
      }}
    >
      <Grid
        sx={{ paddingBottom: is600 ? "150px" : 0, background:"" }}
        container
        spacing={0}
        justifyContent="space-around"
        
      >
        <Grid item md={6} lg={3} my={is600? 2 : 0}  sx={{height:is600?"100px":"200px"}}>
          <FooterTitle variant="body1">Nosotros</FooterTitle>
          <Typography variant="caption2">
            En Todo Floral, nos esforzamos por crear arreglos únicos que
            transmitan emociones y creen momentos inolvidables.
          </Typography>
          <Box sx={{ mt: 2, color: Colors.dove_gray }}>
            <a
              href="https://www.facebook.com/TodoFloralHermosillo/"
              style={{ color: "inherit", textDecoration: "none" }}
              target="_blank"
            >
              <FacebookIcon sx={{ mr: 1 }} />
            </a>
            <a
              href="https://www.instagram.com/todofloralhmo/"
              style={{ color: "inherit", textDecoration: "none" }}
              target="_blank"
            >
              <InstagramIcon sx={{ mr: 1 }} />
            </a>
            <a
              href="https://api.whatsapp.com/message/VPBWPSRCLRQHM1?autoload=1&app_absent=0"
              style={{ color: "inherit", textDecoration: "none" }}
              target="_blank"
            >
              <WhatsappIcon sx={{ mr: 1 }} />
            </a>
            <a
              href="https://goo.gl/maps/UXXhcj6YNDgAYEU59"
              style={{ color: "inherit", textDecoration: "none" }}
              target="_blank"
            >
              <LocationOnIcon sx={{ mr: 1 }} />
            </a>
          </Box>
        </Grid>
        
        {is600?<></>:<Grid item md={6} lg={4} my={is600? 4 : 0}  px={is600? 0 : 10} display={"flex"} justifyContent={"normal"} flexDirection={"column"} alignItems={"center"} sx={{height:is600?"50px":"200px"}}>
          <Box width={"100%"} >
            <FooterTitle sx={{fontSize:is600?"12px":""}} variant="body1">SUBSCRÍBETE A NUESTRO NEWSELLER</FooterTitle>
            <Stack>
              <SubscribeTf
                color="primary"
                label="Email address"
                variant="standard"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => Swal.fire("Gracias, ya estas registrado!")}
                    ><SendIcon sx={{ color: Colors.white }} />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </Stack>
          </Box>
        </Grid>}
        
        <Grid item md={6} lg={3} my={is600? 1 : 0} textAlign={"end"} sx={{pl:0, height:is600?"100px":"200px", background:""}} >
          <FooterTitle variant="body1">información</FooterTitle>
          <List>
            <ListItemText>
              <Typography lineHeight={1} variant="caption2">
                Tel: 6625130440
              </Typography>
            </ListItemText>

            <ListItemText>
              <Typography lineHeight={1} variant="caption2">
                Dirección: Plaza Paseo #14 entre Solidaridad y Av Paseo,
                Hermosillo, Sonora
              </Typography>
            </ListItemText>
          </List>
          <FooterTitle variant="body1">
            <a
              href="/terminos"
              target="_self"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Términos y Condiciones
            </a>
          </FooterTitle>
        </Grid>
      </Grid>
    </Box>
  );
}
