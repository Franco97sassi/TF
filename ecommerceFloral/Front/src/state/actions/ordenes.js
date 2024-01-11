import axios from 'axios'
import swal from 'sweetalert';
import { getOrden } from '../slices/OrdenSlice';
const apiUrl = import.meta.env.VITE_API_URL;



export const getOrdenes = () => async (dispatch) => {


    try {
        //let userData = JSON.parse(sessionStorage.getItem('userData'))
        //let token = userData.user.token
        let res = await axios.get(`${apiUrl}/pagos/ordentodas`
            // //     headers:{
            // //         'Authorization': `Bearer ${token}`,
            // //         'Accept' : 'application/json',
            // //         'Content-Type': 'application/json'
            // //     }
            // }
        )
        dispatch(getOrden(res.data))
    } catch (error) {
        console.log(error)
    }
}