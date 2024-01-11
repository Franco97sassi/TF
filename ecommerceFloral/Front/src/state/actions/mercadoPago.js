const apiUrl = import.meta.env.VITE_API_URL;

import swal from "sweetalert";
import axios from "axios"

export const Pagar = (payload) => async (dispatch) => {
  try {
    let res = await axios.post(`${apiUrl}/pagos/pagar`, payload);
    if (res.data.response && res.data.response.body) {
      const initPoint = res.data.response.body.init_point;
      window.location.href = initPoint; // Redirigir al enlace de pago de MercadoPago
    } else {
      swal("", "Producto creado correctamente!", "success");
      console.log(res);
    }
  } catch (e) {
    let respuesta = JSON.parse(e.request.response).message;
    if (respuesta) {
      swal(respuesta);
    } else {
      swal("Ocurrió un error");
    }
    console.log(e);
  }
};

export const Suscribirse = (payload) => async (dispatch) => {
  try {  
    let res = await axios.post(`${apiUrl}/pagos/subscribe`, payload);
    if (res.data.status === 201) {
      const initPoint = res.data.response.init_point;
      console.log(initPoint);
      // Abre una nueva ventana o pestaña del navegador con la URL de pago de MercadoPago
      window.location.href = initPoint;
    } else {
      // En caso de que no se obtenga la URL de pago
      console.log(res);
    }
  } catch (e) {
    let respuesta = JSON.parse(e.request.response).message;
    if (respuesta) {
      swal(respuesta);
    } else {
      swal("Ocurrió un error");
    }
    console.log(e);
  }
};
