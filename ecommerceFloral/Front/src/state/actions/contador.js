import axios from 'axios'
import swal from 'sweetalert';
import { getContador } from '../slices/contadorSlice';

const url = "localhost:5001"


export const getContadorAction = () => async (dispatch) => {


    try {

        let res = await axios.get(`http://${url}/user/contador`)
        dispatch(getContador(res.data))
    } catch (error) {
        console.log(error)
    }
}