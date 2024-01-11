const apiUrl = import.meta.env.VITE_API_URL;
import { getAllColors } from "../slices/colorSlice";
import swal from "sweetalert";
import axios from "axios"

export const createColor = (payload) => async (dispatch) => {
    try {
        let userData = JSON.parse(localStorage.getItem('userData'))
        let token = userData.user
        let res = await axios.post(`${apiUrl}/product/createColor`, payload,
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
        let respuesta = JSON.parse(e.request.response).message;
        if (respuesta) {
            swal(respuesta)
        }
        else (swal("Ocurrio un error"))
    }
}

export const getColor = () => async (dispatch) => {
    try {
        let res = await axios.get(`${apiUrl}/product/getcolor`)
        dispatch(getAllColors(res.data))
    } catch (error) {
        console.log(error)
    }
}