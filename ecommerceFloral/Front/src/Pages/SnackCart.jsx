import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Box,
  CardContent,
} from "@mui/material";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Paper from "@mui/material/Paper";
import "./SnackCalculator.css";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { addProduct } from "../state/slices/CartSlice";
import { getSnacks } from "../state/actions/createSnack";
import { Calendar } from "../components/calendar/calendar";
import Footer from "../components/footer";
import moment from 'moment';
import 'moment/locale/es-mx';

moment.locale('es-mx');

const StepContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  position: "relative",
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export const SnackCalculator = () => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [cantidad, setCantidad] = useState(0);
  const [fechaEvento, setFechaEvento] = useState(null)
  const [formData, setFormData] = useState({
    id: 1,
    name2: "Snacks:",
    guests: "",
    snacks: [],
    selectedSnacks: [],
    eventDate: null,
    eventTime: "",
    eventDirection: "",
    total: 0,
  });

  const mobile = useMediaQuery("(max-width:720px)");

  useEffect(() => {
    dispatch(getSnacks());
  }, [dispatch]);

  const handleAddToCart = () => {
    const { id, name2, selectedSnacks, guests, total, eventDate, eventTime, eventDirection } = formData;
    // O la cantidad deseada
    const snacksName = selectedSnacks.map((el) => el);
    const fecha = cambiarFormatoFecha(moment(fechaEvento).format('DD-MM-YYYY'));
    const name =
      name2 +
      " " +
      snacksName.join(", ") +
      "\nInvitados: " +
      cantidad +
      "\nFecha: " + fecha +
      "\nHorario: " + eventTime +
      "hs. \nDirección: " + eventDirection;

    const price = total;
    const quantity = 1;
    const image =
      "https://static.vecteezy.com/system/resources/previews/005/013/755/original/snack-logo-design-with-cassava-chips-icon-and-letter-s-initials-free-vector.jpg";

    const productData = { id, name, price, image, quantity };
    dispatch(addProduct(productData));
    window.location.href = "/cart";
  };

  function cambiarFormatoFecha(fecha) {
    const partes = fecha.split('-');
    const dia = partes[0];
    const mes = partes[1];
    const anio = partes[2];

    return `${dia}/${mes}/${anio}`;
  }

  const snackOptions = [
    {
      cantidad: 30,
      name: "Pack 1",
      price: 1600,
      packName: "✨30 vasos locos",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/71fUvVB-ctL._AC_UL600_SR600,600_.jpg",
    },
    {
      cantidad: 30,
      name: "Pack 2",
      price: 2100,
      packName: "✨30 tostielotes",
      image: "https://m.media-amazon.com/images/I/91vVgmcL6GL.jpg",
    },
    {
      cantidad: 30,
      name: "Pack 3",
      price: 1900,
      packName: "✨15 vasos locos y 15 tostielotes",
      image: "https://m.media-amazon.com/images/I/91vVgmcL6GL.jpg",
    },
    {
      cantidad: 50,
      name: "Pack 4",
      price: 2250,
      packName: "✨50 vasos locos",
      image:
        "https://img2.freepng.es/20180202/luq/kisspng-popcorn-maker-clip-art-popcorn-transparent-png-5a74c0926c58c7.5964079715176009144438.jpg",
    },
    {
      cantidad: 50,
      name: "Pack 5",
      price: 3100,
      packName: "✨50 tostielotes",
      image:
        "https://www.marialabonita.com/wp-content/uploads/2019/07/chips-sabor-jalapeno-barcel-46g.jpg",
    },
    {
      cantidad: 50,
      name: "Pack 6",
      price: 2900,
      packName: "✨25 vasos locos y 25 tostielotes",
      image:
        "https://d1on8qs0xdu5jz.cloudfront.net/webapp/images/fotos/b/0000000000/1545_1.jpg",
    },
    {
      cantidad: 80,
      name: "Pack 7",
      price: 3200,
      packName: "✨80 vasos locos",
      image:
        "https://img2.freepng.es/20180202/luq/kisspng-popcorn-maker-clip-art-popcorn-transparent-png-5a74c0926c58c7.5964079715176009144438.jpg",
    },
    {
      cantidad: 80,
      name: "Pack 8",
      price: 4700,
      packName: "✨80 tostielotes",
      image:
        "https://www.marialabonita.com/wp-content/uploads/2019/07/chips-sabor-jalapeno-barcel-46g.jpg",
    },
    {
      cantidad: 80,
      name: "Pack 9",
      price: 4100,
      packName: "✨40 vasos locos y 40 tostielotes",
      image:
        "https://d1on8qs0xdu5jz.cloudfront.net/webapp/images/fotos/b/0000000000/1545_1.jpg",
    },
    {
      cantidad: 100,
      name: "Pack 10",
      price: 3500,
      packName: "✨100 vasos locos",
      image:
        "https://img2.freepng.es/20180202/luq/kisspng-popcorn-maker-clip-art-popcorn-transparent-png-5a74c0926c58c7.5964079715176009144438.jpg",
    },
    {
      cantidad: 100,
      name: "Pack 11",
      price: 5700,
      packName: "✨100 tostielotes",
      image:
        "https://www.marialabonita.com/wp-content/uploads/2019/07/chips-sabor-jalapeno-barcel-46g.jpg",
    },
    {
      cantidad: 100,
      name: "Pack 12",
      price: 5000,
      packName: "✨50 vasos locos y 50 tostielotes",
      image:
        "https://d1on8qs0xdu5jz.cloudfront.net/webapp/images/fotos/b/0000000000/1545_1.jpg",
    },
    {
      cantidad: 150,
      name: "Pack 13",
      price: 5200,
      packName: "✨150 vasos locos",
      image:
        "https://img2.freepng.es/20180202/luq/kisspng-popcorn-maker-clip-art-popcorn-transparent-png-5a74c0926c58c7.5964079715176009144438.jpg",
    },
    {
      cantidad: 150,
      name: "Pack 14",
      price: 8600,
      packName: "✨150 tostielotes",
      image:
        "https://www.marialabonita.com/wp-content/uploads/2019/07/chips-sabor-jalapeno-barcel-46g.jpg",
    },
    {
      cantidad: 150,
      name: "Pack 15",
      price: 7200,
      packName: "✨75 vasos locos y 75 tostielotes",
      image:
        "https://d1on8qs0xdu5jz.cloudfront.net/webapp/images/fotos/b/0000000000/1545_1.jpg",
    },
  ];

  const [atLeastOneChecked, setAtLeastOneChecked] = useState(false);
  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleFinish = () => {
    const selectedSnacksData = snackOptions.filter((item) =>
      formData.selectedSnacks.includes(item.name)
    );
    const totalPrice = selectedSnacksData.reduce(
      (sum, item) => sum + item.price,
      0
    );

    setFormData((prevFormData) => ({
      ...prevFormData,
      total: totalPrice,

    }));

    const currentDate = new Date().toISOString().split("T")[0]; // Obtiene la fecha actual en formato 'YYYY-MM-DD'
    if (formData.eventDate < currentDate) {
      // La fecha ingresada es anterior al día de hoy, muestra una alerta o realiza alguna acción apropiada
      Swal.fire({
        title: "Elige una fecha correcta",
        text: "La fecha debe ser de hoy en adelante!.",
        imageUrl:
          "https://i.gifer.com/origin/78/787899e9d4e4491f797aba5c61294dfc_w200.webp",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
      });
      return;
    }
    if (formData.eventTime === '' || formData.eventTime === null) {
      Swal.fire({
        title: "Elige una valida correcta",
        text: "Debes de ingresar un horario",
        imageUrl:
          "https://i.gifer.com/origin/78/787899e9d4e4491f797aba5c61294dfc_w200.webp",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
      });
      return;
    }
    if (formData.eventDirection === '' || formData.eventDirection === null) {
      Swal.fire({
        title: "Elige una dirección",
        text: "Debes de ingresar una dirección",
        imageUrl:
          "https://i.gifer.com/origin/78/787899e9d4e4491f797aba5c61294dfc_w200.webp",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
      });
      return;
    }
    setStep(step + 1);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };


  const handleSnackChange = (event) => {
    const { value, checked } = event.target;
    let updatedSelectedSnacks = [...formData.selectedSnacks];
    if (checked) {
      updatedSelectedSnacks.push(value);
    } else {
      updatedSelectedSnacks = updatedSelectedSnacks.filter(
        (item) => item !== value
      );
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      selectedSnacks: updatedSelectedSnacks,
    }));

    const checkedSnacks = updatedSelectedSnacks.filter((snack) => snack !== value);
    setAtLeastOneChecked(checkedSnacks.length > 0 || checked);
  };

  const renderStepOne = () => {
    return (
      <CSSTransition key="step1" classNames="slide" timeout={500}>
        <StepContainer className="step-1" sx={{ minHeight: "51vh" }}>
          <Typography
            sx={{
              marginBottom: "28px",
              marginTop: "28px",
              fontSize: "1.8rem",
              display: "flex",
              textAlign: "center",
              justifyContent: "center",
              fontFamily: '"TanPearl","cursive"',
              py: 5
            }}
            variant="h6"
          >
            CANTIDAD DE INVITADOS
          </Typography>
          <Box
            sx={{
              display: "flex",
              flex: "wrap",
              gap: "1rem",
              flexDirection: mobile ? "column" : "row",
              mb: mobile ? "0" : "20px",
            }}
          >
            <Button
              value={30}
              onClick={() => {
                setCantidad(30);
                handleNext();
              }}
              sx={{
                bgcolor: "primary.main",
                color: "white",
                p: 2,
                borderRadius: "2rem",
                "&:hover": { bgcolor: "primary.main" },
              }}
            >
              30 personas
            </Button>
            <Button
              value={50}
              onClick={() => {
                setCantidad(50);
                handleNext();
              }}
              sx={{
                bgcolor: "primary.main",
                color: "white",
                p: 2,
                borderRadius: "2rem",
                "&:hover": { bgcolor: "primary.main" },
              }}
            >
              50 personas
            </Button>
            <Button
              value={80}
              onClick={() => {
                setCantidad(80);
                handleNext();
              }}
              sx={{
                bgcolor: "primary.main",
                color: "white",
                p: 2,
                borderRadius: "2rem",
                "&:hover": { bgcolor: "primary.main" },
              }}
            >
              80 personas
            </Button>
            <Button
              value={100}
              onClick={() => {
                setCantidad(100);
                handleNext();
              }}
              sx={{
                bgcolor: "primary.main",
                color: "white",
                p: 2,
                borderRadius: "2rem",
                "&:hover": { bgcolor: "primary.main" },
              }}
            >
              100 personas
            </Button>
            <Button
              value={150}
              onClick={() => {
                setCantidad(150);
                handleNext();
              }}
              sx={{
                bgcolor: "primary.main",
                color: "white",
                p: 2,
                borderRadius: "2rem",
                "&:hover": { bgcolor: "primary.main" },
              }}
            >
              150 personas
            </Button>
          </Box>
        </StepContainer>
      </CSSTransition>
    );
  };

  const renderStepTwo = (cantInvitados) => {
    const filteredSnackOptions = snackOptions.filter(
      (snack) => snack.cantidad === cantInvitados
    );

    return (
      <CSSTransition key="step2" classNames="slide" timeout={500}>
        <StepContainer className="step-2" sx={{ display: "flex" }}>
          <Typography
            sx={{
              marginBottom: "28px",
              marginTop: "28px",
              fontSize: "32px",
              display: "flex",
              textAlign: "center",
              justifyContent: "center",
              fontFamily: '"TanPearl","cursive"',
              py: 5
            }}
            variant="h6"
          >
            SELECCIONE SU PACK PREFERIDO
          </Typography>
          <FormGroup sx={{ gap: "1rem", display: "flex", flex: "wrap", maxWidth: mobile ? "95%" : "60%" }}>
            {filteredSnackOptions.map((snack) => (
              <Box
                container
                rowSpacing={12}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={8}>
                  <Item>
                    <FormControlLabel
                      key={snack.name}
                      control={
                        <Checkbox
                          value={snack.name}
                          checked={formData.selectedSnacks.includes(snack.name)}
                          onChange={handleSnackChange}
                        />
                      }
                      sx={{ display: "flex", justifyContent: "flex-start", width: "100%" }}
                      label={
                        <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                          <div> <span style={{ fontWeight: "600" }}>{snack.name}</span> Incluye: {snack.packName}</div>
                          <div>Precio: ${snack.price}</div>
                        </div>
                      }
                    />
                  </Item>
                </Grid>

                {/*            <Grid item xs={4}>
                  <Item>
                    <img
                      src={snack.image}
                      alt="imageSnack"
                      style={{ width: "50px", height: "43px", gap: "5px" }}
                    />
                  </Item>
                    </Grid> */}
              </Box>
            ))}
            <Box>
              <CardContent
                sx={{
                  backgroundColor: "transparent",
                  padding: "16px",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  IMPORTANTE
                </Typography>
                <Typography sx={{ fontSize: "15px" }}>
                  - Todos los Packs incluyen 4 horas de servicio con personal
                </Typography>
                <Typography sx={{ fontSize: "15px" }}>
                  - Transporte y montaje eventos fuera de la ciudad con costo de
                  transporte extra
                </Typography>
              </CardContent>
            </Box>
            <Box>
              <CardContent
                sx={{
                  backgroundColor: "transparent",
                  padding: "16px",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  INGREDIENTES
                </Typography>
                <Typography sx={{ fontSize: "15px" }}>
                  - Vasos Locos: Papas Blancas, Doritos, Nachos, Tostitos, Fritos Azteca, Chips Verdes, Cacahuates Japoneses, Rielito, Gomitas Enchilosas, Gusanitos.
                </Typography>
                <Typography sx={{ fontSize: "15px" }}>
                  - Tostielotes: Tostitos, Elotes, Crema, Mantequilla, Queso Amarillo, Queso Blanco.
                </Typography>
                <Typography sx={{ fontSize: "15px" }}>
                  - Ambas: Salsa Beisbolera, Chamoy Beisbolero, Limones, Jalapeños, Vasos, Servilletas, Cucharas, Tenedores.
                </Typography>
              </CardContent>
            </Box>
          </FormGroup>
          <Box display={"flex"} flexDirection={mobile ? "column" : "row"}>
            <Button
              variant="contained"
              onClick={handleBack}
              sx={{ margin: "26px", width: "8rem" }}
            >
              Atrás
            </Button>
            <Button
              variant="contained"
              onClick={handleNext}
              sx={{ margin: "26px", width: "8rem" }}
              disabled={!atLeastOneChecked}
            >
              Siguiente
            </Button>
          </Box>
        </StepContainer>
      </CSSTransition>
    );
  };

  const renderStepThree = () => {
    return (
      <CSSTransition key="step3" classNames="slide" timeout={500}>
        <StepContainer className="step-3">
          <Typography
            sx={{
              marginBottom: "20px",
              marginTop: "28px",
              fontSize: "32px",
              display: "flex",
              textAlign: "center",
              justifyContent: "center",
              fontFamily: '"TanPearl","cursive"',
              py: 5
            }}
            variant="h6"
          >
            INGRESE LA FECHA DEL EVENTO
          </Typography>
          <Box>
            <Calendar
              name="eventDate"
              value={fechaEvento}
              onChange={setFechaEvento} />
          </Box>

          <TextField
            sx={{ width: "10rem", margin: 1 }}
            type="time"
            name="eventTime"
            label="Horario"
            value={formData.eventTime}
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 600, // 5 minutos
              min: "00:00",
              max: "23:55",
              pattern: "(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]", // Patrón para validar el formato HH:MM
            }}
          />

          <TextField
            sx={{ width: "10rem", margin: 1 }}
            type="text"
            name="eventDirection"
            value={formData.eventDirection}
            onChange={handleInputChange}
            label="Dirección"
          />
          <Box display={"flex"} flexDirection={mobile ? "column" : "row"}>
            <Button
              variant="contained"
              onClick={handleBack}
              sx={{ margin: "26px", width: "8rem" }}
            >
              Atrás
            </Button>
            <Button
              variant="contained"
              onClick={handleFinish}
              sx={{ margin: "26px", width: "8rem" }}
            >
              Siguiente
            </Button>
          </Box>
        </StepContainer>
      </CSSTransition>
    );
  };

  const renderResult = () => {
    const fecha = cambiarFormatoFecha(moment(fechaEvento).format('DD-MM-YYYY')) //cambiarFormatoFecha(formData.eventDate);
    return (
      <CSSTransition key="step4" classNames="slide" timeout={500}>
        <StepContainer className="step-4">
          <Typography
            sx={{
              fontSize: "38px",
              display: "flex",
              textAlign: "center",
              justifyContent: "center",
              fontFamily: '"TanPearl","cursive"',
              marginBottom: "28px",
              marginTop: "28px",
              py: 5
            }}
            variant="h6"
          >
            MI CARRITO DE SNACKS
          </Typography>
          <Box width={mobile ? "95%" : "60%"}>
            <Item sx={{ display: "flex", justifyContent: "space-between", my: 1, p: 2.1 }}>
              <Typography
                sx={{ fontSize: "20px" }}
                variant="body1"
              >
                Cantidad de invitados:
              </Typography>
              <Typography sx={{ fontSize: "20px" }}
                variant="body1">
                {cantidad}
              </Typography>
            </Item>
            <Item sx={{ display: "flex", justifyContent: "space-between", my: 1, p: 2.1 }}>
              <Typography
                sx={{ fontSize: "20px" }}
                variant="body1"
              >
                Snacks seleccionados:
              </Typography>
              <Typography sx={{ fontSize: "20px" }}
                variant="body1">
                {formData.selectedSnacks.join(", ")}
              </Typography>
            </Item>
            <Item sx={{ display: "flex", justifyContent: "space-between", my: 1, p: 2.1 }}>
              <Typography
                sx={{ fontSize: "20px" }}
                variant="body1"
              >
                Fecha del evento:
              </Typography>
              <Typography sx={{ fontSize: "20px" }}
                variant="body1">
                {fecha} a las {formData.eventTime} hs
              </Typography>
            </Item>
            <Item sx={{ display: "flex", justifyContent: "space-between", my: 1, p: 2.1 }}>
              <Typography
                sx={{ fontSize: "20px" }}
                variant="body1"
              >
                Lugar del evento:
              </Typography>
              <Typography sx={{ fontSize: "20px" }}
                variant="body1">
                {formData.eventDirection}
              </Typography>
            </Item>
            <Box display={"flex"} flexDirection={"column"} alignItems={"flex-end"} my={3}>
              <Typography
                sx={{
                  fontSize: "28px",
                  display: "flex",
                }}
                variant="body1"
              >
                TOTAL:
              </Typography>
              <Typography sx={{ fontSize: "30px" }}
                variant="body1">
                ${formData.total},00
              </Typography>
            </Box>

          </Box>
          <Box display={"flex"} flexDirection={mobile ? "column" : "row"}>
            <Button
              variant="contained"
              onClick={handleBack}
              sx={{ margin: "26px", width: "8rem" }}
            >
              Atrás
            </Button>
            <Button
              variant="contained"
              onClick={handleAddToCart}
              sx={{ margin: "26px", width: "8rem" }}
            >
              Finalizar
            </Button>
          </Box>
        </StepContainer>
      </CSSTransition>
    );
  };

  const renderContent = () => {
    switch (step) {
      case 1:
        return renderStepOne();
      case 2:
        return renderStepTwo(cantidad);
      case 3:
        return renderStepThree();
      case 4:
        return renderResult();
      default:
        return null;
    }
  };

  return (
    <div style={{ background: "rgb(230,230,230)" }}>
      <Container >
        <TransitionGroup className="steps-container">
          {renderContent()}
        </TransitionGroup>
      </Container>
      <Grid sx={{ padding: mobile ? "10vh" : "10vh" }}></Grid>
      <Footer />
    </div>
  );
};
