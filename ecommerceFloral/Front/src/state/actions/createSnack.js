const apiUrl = import.meta.env.VITE_API_URL;
//import { getAllProducts } from "../slices/productSlice";
import { getAllSnacks } from "../slices/SnackSlice";
import swal from "sweetalert";
import axios from "axios"

export const createSnack = (payload) => async (dispatch) => {
  try {
    let userData = JSON.parse(localStorage.getItem('userData'))
    let token = userData.user
    let res = await axios.post(`${apiUrl}/product/createsnack`, payload,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
    if (res.data.message) {
      swal("", res.data.message, "success")

    } else {
      swal("", "Snack creado correctamente!", "success")
      console.log("error")
    }
  } catch (e) {
    let respuesta = JSON.parse(e.request.response).message;
    if (respuesta) {
      swal(respuesta)
    }
    else (swal("Ocurrio un error"))
  }
}

export const getSnacks = () => async (dispatch) => {
  try {
    let res = await axios.get(`${apiUrl}/product/getsnack`)
    dispatch(getAllSnacks(res.data))
  } catch (error) {
    console.log(error)
  }
}

export const deleteSnack = (productId) => async (dispatch) => {
  console.log(productId)
  try {
    let userData = JSON.parse(localStorage.getItem('userData'))
    let token = userData.user

    const res = await axios.delete(`${apiUrl}/product/deletesnack`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        data: { id: productId },
      }
    );

    if (res.data.message) {
      swal("", res.data.message, "success");
    } else {
      swal("", "Snack eliminado correctamente!", "success");
    }
    dispatch(getSnacks())
  } catch (error) {
    let respuesta = JSON.parse(error.request.response).message;
    if (respuesta) {
      swal(respuesta);
    } else {
      swal("Ocurrió un error");
    }
  }
};