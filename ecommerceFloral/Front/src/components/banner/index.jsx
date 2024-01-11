import { Button, Typography, Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/system";
import {
  BannerContainer,
  BannerContent,
  BannerDescription,
  BannerImage,
  BannerShopButton,
  BannerTitle,
} from "../../styles/banner";
import banner from "../../utils/image/banner.png"
import fondoInicioFlor from "../../utils/image/fondoFlor.png"
import tuercas from "../../utils/image/tuercas.png"

export default function Banner() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const is600 = useMediaQuery("(max-width:600px)");

  const handleClick = () => {
    window.location.href = "/productos";
  };


  return (
    <BannerContainer sx={{ justifyContent: "space-evenly" }} >
       <BannerContent sx={{width: "100%"}}>
        <BannerTitle   sx={{ fontWeight: "700", whiteSpace: 'nowrap',fontSize:"100px"  }}  fontFamily={'Commissioner'}>
         TODO FLORAL
        </BannerTitle>
        <Typography sx={{ fontWeight: "500", fontSize: "36px",textAlign:is600?"center":"left" }}   fontFamily={'Commissioner'}>
          Regalar flores es regalar amor
        </Typography>


        <BannerDescription   sx={{ paddingTop: "1rem", fontSize: "24px", mb: 5,width:is600?"100%":"125%" }} fontFamily={'Commissioner'}>
        Sorprende con las flores más frescas para toda ocasión y con los mejores complementos como globos, accesorios y más. Cotiza nuestra barra de snacks y agenda tu fecha. <br/> <br/>  Tenemos envíos a domicilio disponibles 
         <span style={{fontWeight:600}}> Todos los días.</span>  
        </BannerDescription>
        <Box  sx={{width:is600?"100%":"125%",display:"flex",flexDirection:is600?"column":"row",justifyContent:"space-around",alignContent:"space-around"}}      >
          <BannerShopButton onClick={handleClick}  sx={{borderRadius:"45px",color:"black" ,height:"64px",
  width:"293px",  marginBottom:is600? "25px":"0px", backgroundColor:"white",fontFamily:"Inter"  }}  >Ver Flores  <img src={tuercas}  style={{marginLeft:"7px"}}/></BannerShopButton>
          <BannerShopButton onClick={handleClick} color="black" sx={{ borderRadius:"45px", color:"white" ,  backgroundColor:"black",fontFamily:"Inter"  }}  >Más información</BannerShopButton>

        </Box>
      </BannerContent>
      <BannerImage src={fondoInicioFlor} />

    </BannerContainer>
  );
}
