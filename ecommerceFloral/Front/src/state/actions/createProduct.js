const apiUrl = import.meta.env.VITE_API_URL;
import { getAllProducts } from "../slices/productSlice";
import swal from "sweetalert";
import axios from "axios"

export const createProduct = (payload) => async (dispatch) => {
  try {
    
    let userData = JSON.parse(localStorage.getItem('userData'))
    let token = userData.user
    let res = await axios.post(`${apiUrl}/product/createproduct`, payload,
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
      swal("", "Producto creado correctamente!", "success")
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

export const editProduct = (payload,id) => async (dispatch) => {
  try {
    
    let userData = JSON.parse(localStorage.getItem('userData'))
    let token = userData.user
    let res = await axios.put(`${apiUrl}/product/editproduct/${id}`, payload,
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
      swal("", "Producto editado correctamente!", "success")
      console.log("error")
    }
  } catch (e) {
    let respuesta = JSON.parse(e.request.response).message;
    console.log(e)
    if (respuesta) {
      swal(respuesta)
    }
    else (swal("Ocurrio un error"))
  }
}


export const getAllProduct = () => async (dispatch) => {
  try {
    let res = await axios.get(`${apiUrl}/product/getproduct`)
    dispatch(getAllProducts(res.data))
  } catch (error) {
    console.log(error)
  }
}

export const deleteProduct = (productId) => async (dispatch) => {
  try {
    let userData = JSON.parse(localStorage.getItem('userData'))
    let token = userData.user

    const res = await axios.delete(`${apiUrl}/product/deleteproduct`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: { id: productId },
    });

    if (res.data.message) {
      swal("", res.data.message, "success");
    } else {
      swal("", "Producto eliminado correctamente!", "success");
    }
    dispatch(getAllProduct())
  } catch (error) {
    let respuesta = JSON.parse(error.request.response).message;
    if (respuesta) {
      swal(respuesta);
    } else {
      swal("Ocurrió un error");
    }
  }
};