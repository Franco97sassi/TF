import { Container, Typography, Box, Divider} from "@mui/material";

import Footer from "../components/footer";

export const Terminos = () => {
  return (
    <div style={{background:"rgb(230,230,230)"}}>
      <Container my={5}>
        <Typography variant="h3" align="center" p={5} fontFamily={'TanPearl'} fontSize={"2rem"}>
          TÉRMINOS Y CONDICIONES
        </Typography>
        <Box my={4}>
          <Typography variant="h5" align="center" m={2} fontFamily={'TanPearl'} fontSize={"1.5rem"}>
            Términos de
            servicio
          </Typography>
          <Divider sx={{ borderColor: "#ffc4cc", my: 2 }} />
          <Typography fontFamily={'sans-serif'} p={2} fontSize={".9rem"} textAlign="justify">
            Política de sustitución
            Flores Frescas: Estamos comprometidos a entregar su pedido a tiempo y tan frescos y hermosos como sea posible. Debido a la
            naturaleza, la estacionalidad y la disponibilidad regional de flores, a veces es necesario hacer sustituciones de igual o mayor valor.
            Haremos todo lo posible para mantener el "aspecto y la sensación" del arreglo al considerar las combinaciones generales de
            forma, tamaño, estilo y color. En arreglos variados, primará la variedad sobre el color. Por ejemplo, si un pedido es de margaritas
            amarillas, lo sustituirán por otro color de margaritas, no por otra flor amarilla. Las rosas blancas y las rosas crema se pueden
            sustituir entre sí, así como las rosas durazno y las rosas rosadas, etc.
            Fillers: Para las plantas verdes y en flor, se podrán sustituir plantas similares de igual o mayor valor. Para plantas únicas, como las
            orquídeas, haremos todo lo posible para que coincida con el tipo de planta, pero podemos sustituirlo por otro color.
            Sustituciones para ocasiones especiales: Debido a la importancia de entregar pedidos para ocasiones especiales, como
            funerales, cumpleaños y aniversarios, en días específicos, podemos hacer una sustitución de igual o mayor valor para garantizar la
            entrega oportuna, si las flores que solicitó no están disponibles y no podemos comunicarnos con usted a través de los números
            de teléfono o la dirección de correo electrónico que nos proporcionó.
            Cualquier cambio será avisado antes de realizarse, por eso es importante que nos comparta un número telefonico
          </Typography>
        </Box>
        <Box my={4}>
          <Typography variant="h5" align="center" m={2} fontFamily={'TanPearl'} fontSize={"1.5rem"}>
            Términos de
            envio
          </Typography>
          <Divider sx={{ borderColor: "#ffc4cc", my: 2 }} />
          <Typography fontFamily={'sans-serif'} p={2} fontSize={".9rem"} textAlign="justify">
            IMPORTANTE: En caso de solicitar servicio a domicilio, este tiene un costo extra de $80 pesos. Los envíos empiezan apartir de las
            10 am y solo se esperará en el domicilio 10 minutos. En caso de no respuesta del número que fue proporcionado, será enviado a
            sucursal . Podrá ser enviado de nuevo por un costo de $60 pesos extras. El costo de envío a domicilio tiene un costo extra en
            días festivos como San valentín, Dia de las Madres, etc.
          </Typography>
        </Box>
        <Box my={4}>
          <Typography variant="h5" align="center" m={2} fontFamily={'TanPearl'} fontSize={"1.5rem"}>
            Devoluciones
          </Typography>
          <Divider sx={{ borderColor: "#ffc4cc", my: 2 }} />
          <Typography fontFamily={'sans-serif'} p={2} fontSize={".9rem"} textAlign="justify">
          Cada pedido es importante para nosotros porque sabemos lo importante que es para usted. Una vez que se realiza un pedido, no podemos reembolsarlo; sin embargo, recibirá crédito de la tienda por el monto total pagado. El crédito de su tienda no caduca y puede usarlo en cualquier época del año, incluidos los días festivos. Además, si no está completamente satisfecho con la calidad de uno de nuestros productos, comuníquese con nosotros de inmediato y tomaremos las medidas adecuadas.

En caso de querer desuscribirse, debe ingresar a la aplicación de MercadoPago. En el apartado de suscripciones, busque "Todo Floral" y haga clic en cancelar suscripción."
          </Typography>
        </Box>
      </Container>
      <Footer />
    </div>
  )
}