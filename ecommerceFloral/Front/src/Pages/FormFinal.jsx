import { useState, useEffect } from "react";
import { Box, Button, MenuItem, Select, TextField, FormControlLabel, Checkbox, Typography, InputLabel, FormControl } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import moment from "moment-timezone";
import imageEnvio from "../assets/envio.jpg"
import imageDesc from "../assets/discountPhoto.jpg"
import { useDispatch, useSelector } from 'react-redux';
import { Pagar } from "../state/actions/mercadoPago"
import { addProduct, removeProduct } from "../state/slices/CartSlice";
import { OfferCard } from "../components/offerCard/offerCard";
import { TimeCalendar } from "../components/calendar/timeCalendar";
const apiUrl = import.meta.env.VITE_API_URL;


export const FormFinal = ({ decodedToken }) => {
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)
  const [cartItems, setCartItems] = useState(cart);
  const [priceTotal, setPriceTotal] = useState(0)
  const [valorDesc, setValorDesc] = useState(0)
  const [termsAcepted, setTermsAcepted] = useState(false);
  const [horarioEntrega, setHorarioEntrega] = useState(null);

  const [userCompras, setUserCompras] = useState(null)
  const isSub = decodedToken?.user?.suscrito || false;

  useEffect(() => {
    // Aquí puedes establecer el valor del userId

    const fetchUserCompras = async () => {
      try {
        const response = await fetch(`${apiUrl}/user/totalcompras?id=${decodedToken?.id ? decodedToken.id : "-"}`);
        const data = await response.json();
        setUserCompras(data);

      } catch (error) {
        console.log(error);
      }
    };

    fetchUserCompras();
  }, []);

  useEffect(() => {
    if (valorDesc > 0) {
      handleAddDesc()
    }
    if (valorDesc === 0) {
      handleDeleteDesc()
      setValorDesc(null)
    }
  }, [valorDesc])

  const initialValues = {
    senderName: "",
    receiverName: "",
    deliveryType: "",
    address: "",
    cellphone: "",
    pickupTime: "",
    description: "",
    checkTerms: false,
  };

  const validationSchema = Yup.object().shape({
    senderName: Yup.string().required("Campo requerido"),
    receiverName: Yup.string().required("Campo requerido"),
    cellphone: Yup.number().required("Campo requerido").typeError("Debe ser un numero"),
    deliveryType: Yup.string().required("Campo requerido"),
  });


  const invitadoID = "48ad6fdc-a31a-49a3-aca1-b157755d745e"
  const envioID = "4c8d59f7-2c46-4c4f-bd86-329cdde5857e"
  const descID = "4c8d59f7-2c46-4c4f-bd86-329cdde5857f"

  const onSubmit = (values) => {
    if (values.deliveryType === "address" && !values.address) {

      alert("Por favor, completa una direccion para hacer el envio.");
    }
    if (values.deliveryType === "address" && !horarioEntrega) {
      alert("Por favor, selecciona un horario para recoger tu compra.");
    }
    if (values.deliveryType === "pickupTime" && !horarioEntrega) {
      alert("Por favor, selecciona un horario para recoger tu compra.");
    }
    else {
      const payload = {
        cart: cart,
        senderName: values.senderName,
        receiverName: values.receiverName,
        pickupTime: moment(horarioEntrega).format('DD/MM/YYYY hh:mm'),
        deliveryType: values.deliveryType,
        cellphone: values.cellphone,
        address: values.address,
        description: values.description,
        userId: decodedToken?.id ? decodedToken.id : invitadoID,

        totalCompras: userCompras ? userCompras : 0 // Le envio el total de compras al creador de link de mercadopago para saber si aplicar descuento o no, ya que en el 5 compra se hace descuento
      }

      dispatch(Pagar(payload))
    }
  };


  const handleDeliveryTypeChange = (event) => {
    const selectedDeliveryType = event.target.value;
    formik.setFieldValue("deliveryType", selectedDeliveryType);

    if (selectedDeliveryType === "address") {
      handleAddEnvio()
      setPriceTotal(80)
      formik.setFieldValue("pickupTime", "");
    } else if (selectedDeliveryType === "pickupTime") {
      setPriceTotal(0)
      handleDeleteEnvio()
      formik.setFieldValue("address", "");
    }
  };


  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const handleAddEnvio = () => {
    const priceEnvio =
    {
      id: envioID,
      name: "Envio a domicilio",
      image: imageEnvio,
      price: isSub? 0 : 80,
      color: [],
      ColorName: [],
      quantity: 1

    };
    dispatch(addProduct(priceEnvio));
  };

  const handleDeleteEnvio = () => {
    const productId = envioID
    const color = []
    dispatch(removeProduct({ productId, color }));
  };

  const handleAddDesc = () => {
    const valor = calculateSubTotal() * valorDesc * -1;
    const priceEnvio =
    {
      id: descID,
      name: `Descuento del ${valorDesc * 100}%`,
      image: imageDesc,
      price: valor,
      color: [],
      ColorName: [],
      quantity: 1

    };
    dispatch(addProduct(priceEnvio));
  }
  const handleDeleteDesc = () => {
    const productId = descID
    const color = []
    dispatch(removeProduct({ productId, color }));
  };

  const calculateSubTotal = () => {
    let total = cartItems.reduce((total, item) => total + item.price * item.quantity, 0); // suma de todo + envio si es que tiene
    const contieneEnvio = cartItems.some(producto => producto.id === envioID);
    let total2 = contieneEnvio ? total : total + priceTotal
    return total2;
  };

  const calculateTotal = () => {
    let subTotal = calculateSubTotal()
    const contieneDesc = cartItems.some(producto => producto.id === descID)
    let total = contieneDesc ? subTotal : subTotal - (subTotal * valorDesc)
    return total;
  };


  return (
    <Box sx={{ maxWidth: 600, margin: "auto", padding: 2 }}>
      <Typography sx={{ my: 2 }} fontFamily={'TanPearl'} fontSize={"2rem"} textAlign={"center"}>Completa los datos para recibir tu producto</Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          id="senderName"
          name="senderName"
          label="Nombre del comprador"
          value={formik.values.senderName}
          onChange={formik.handleChange}
          error={formik.touched.senderName && Boolean(formik.errors.senderName)}
          helperText={formik.touched.senderName && formik.errors.senderName}
          fullWidth
          margin="normal"
        />

        <TextField
          id="receiverName"
          name="receiverName"
          label="Nombre de quién recibe"
          value={formik.values.receiverName}
          onChange={formik.handleChange}
          error={formik.touched.receiverName && Boolean(formik.errors.receiverName)}
          helperText={formik.touched.receiverName && formik.errors.receiverName}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="dense">
          <InputLabel id="entrega-label">Tipo de entrega</InputLabel>
          <Select
            labelId="entrega-label"
            id="deliveryType"
            name="deliveryType"
            label="Tipo de entrega"
            value={formik.values.deliveryType}
            onChange={handleDeliveryTypeChange}
            fullWidth
            error={formik.touched.deliveryType && Boolean(formik.errors.deliveryType)}
            helperText={formik.touched.deliveryType && formik.errors.deliveryType}
          >
            <MenuItem value="address">Domicilio</MenuItem>
            <MenuItem value="pickupTime">Pasar a recoger</MenuItem>
          </Select>
        </FormControl>

        {formik.values.deliveryType === "address" && (
          <>
            <TextField
              id="address"
              name="address"
              label="Dirección"
              value={formik.values.address}
              onChange={formik.handleChange}
              fullWidth
              margin="normal"
            />
            <TimeCalendar value={horarioEntrega} onChange={setHorarioEntrega} />
          </>
        )}

        {formik.values.deliveryType === "pickupTime" && (
          <>
            <TimeCalendar value={horarioEntrega} onChange={setHorarioEntrega} />
          </>
        )}



        <TextField
          id="cellphone"
          name="cellphone"
          label="Celular"
          value={formik.values.cellphone}
          onChange={formik.handleChange}
          fullWidth
          margin="normal"
          error={formik.touched.cellphone && Boolean(formik.errors.cellphone)}
          helperText={formik.touched.cellphone && formik.errors.cellphone}
        />
        <TextField
          id="description"
          name="description"
          label="Referencia"
          value={formik.values.description}
          onChange={formik.handleChange}
          fullWidth
          margin="normal"
          helperText={formik.touched.description && formik.errors.description}
        />

        <Typography mt={1}>¡Ingrese su Código de Descuento!</Typography>
        <OfferCard valueDesc={setValorDesc} />
        <Box textAlign={"start"} display={"flex"} alignItems={"center"}>
          <FormControlLabel
            sx={{ mr: 0.5 }}
            control={
              <Checkbox
                checked={termsAcepted}
                onChange={(e) => setTermsAcepted(e.target.checked)}
                name="checkTerms"
              />
            }
            label="Acepto los "
          /><a href="/terminos" target="_blank"
            style={{ color: "inherit", ml: 0 }}>
            Términos y Condiciones
          </a>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", margin: "8px", flexDirection: "column" }}>
            <Typography sx={{ fontWeight: 600, fontSize: "24px" }}>TOTAL A PAGAR: <span style={{ fontWeight: 600 }}>${calculateTotal().toFixed(2)}</span></Typography>

            {userCompras && userCompras === 5 ?
              (<>
                <Typography sx={{ color: "green", textAlign: "end" }}><span style={{ color: "red" }}>- ${calculateTotal().toFixed(2) * 0.4} </span> </Typography>
                <Typography sx={{ color: "green" }}>¡Esta es tu 5ta compra </Typography>
                <Typography sx={{ color: "green" }}>40% de descuento!</Typography>
              </>) :
              (<></>)
            }

          </Box>
        </Box>
        <Button sx={{ background: "primary", fontSize: "18px", maxWidth: "800px", width: "100%", marginBottom: "36px" }} type="submit" variant="contained" color="primary" disabled={!termsAcepted}>
          PAGAR
        </Button>
        <img
          src="https://imgmp.mlstatic.com/org-img/banners/mx/medios/MLM_575X40_new.jpg"
          title="Mercado Pago - Medios de pago"
          alt="Mercado Pago - Medios de pago"
          style={{ width: "100%", height: "auto" }}
        />
      </form>
    </Box>
  );
};