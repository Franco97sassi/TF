const apiUrl = import.meta.env.VITE_API_URL;
import { getAllCategories } from "../slices/categories";
import swal from "sweetalert";
import axios from "axios"

export const createCategory = (payload) => async (dispatch) => {
  try {
    let userData = JSON.parse(localStorage.getItem('userData'))
    let token = userData.user

    let res = await axios.post(`${apiUrl}/product/createCategory`, payload,
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
      console.log("error")
    }
  } catch (e) {
    console.log(e)
    let respuesta = JSON.parse(e.request.response).message;
    if (respuesta) {
      swal(respuesta)
    }
    else (swal("Ocurrio un error"))
  }
}

export const getCategories = () => async (dispatch) => {
  try {
    let res = await axios.get(`${apiUrl}/product/getcategory`)
    dispatch(getAllCategories(res.data))
  } catch (error) {
    console.log(error)
  }
}

export const deleteCategory = (productId) => async (dispatch) => {
  try {
    let userData = JSON.parse(localStorage.getItem('userData'))
    let token = userData.user
    const res = await axios.delete(`${apiUrl}/product/deletecategory`,
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
      swal("", "Categoria eliminada correctamente!", "success");
    }
    dispatch(getCategories())
  } catch (error) {
    console.log(error)
    let respuesta = JSON.parse(error.request.response).message;
    if (respuesta) {
      swal(respuesta);
    } else {
      swal("Ocurrió un error");
    }
  }
};