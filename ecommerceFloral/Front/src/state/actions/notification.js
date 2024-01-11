import axios from 'axios'
import swal from 'sweetalert';
import { getNotifications } from '../slices/notificationSlice';

const url = "localhost:5001"


export const getNotification = () => async (dispatch) => {


    try {
        let userData = JSON.parse(sessionStorage.getItem('userData'))
        let token = userData.user.token
        let res = await axios.get(`http://${url}/user/notification`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        dispatch(getNotifications(res.data))
    } catch (error) {
        console.log(error)
    }
}