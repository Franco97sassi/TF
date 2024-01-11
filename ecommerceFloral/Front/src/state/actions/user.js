import axios from "axios";
import swal from "sweetalert";
import { getUser } from "../slices/userSlice";
const apiUrl = import.meta.env.VITE_API_URL;

export const logIn = (email, password) => async (dispatch) => {
  try {
    let res = await axios.post(`${apiUrl}/user/login`, email, password);
    //dispatch(getUser(res.data))
    localStorage.setItem("userData", JSON.stringify(res.data));
    window.location.href = "/";
  } catch (e) {
    let respuesta = JSON.parse(e.request.response).error;
    if (respuesta) {
      swal(respuesta);
    } else swal("Ocurrio un error");
  }
};

export const updateUser = (userId) => async () => {
  let envio = {userId : userId}
  try {
    let res = await axios.post(`${apiUrl}/user/updateUser`, envio);
    if (res.data != {}){
      localStorage.setItem("userData", JSON.stringify(res.data));
    }
  } catch (e) {
    let respuesta = JSON.parse(e.request.response).error;
    if (respuesta) {
      //swal(respuesta);
    } else swal("Ocurrio un error");
  }
};

export const register = (email, password, username) => async (dispatch) => {
  try {
    let res = await axios.post(
      `${apiUrl}/user/singin`,
      email,
      password,
      username
    );

    if (res.data.message) {
      swal("", res.data.message, "success").then(() => {
        window.location.href = "/";
      });
    } else {
      console.log("error");
    }
  } catch (e) {
    let respuesta = JSON.parse(e.request.response).message;
    if (respuesta) {
      swal(respuesta);
    } else swal("Ocurrio un error");
  }
};

export const getUsers = () => async (dispatch) => {
  try {
    let userData = JSON.parse(sessionStorage.getItem("userData"));
    let token = userData.user.token;
    let res = await axios.get(`${apiUrl}/user/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    dispatch(getUser(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const changeEmailConfirm = (id) => async (dispatch) => {
  try {
    let userData = JSON.parse(sessionStorage.getItem("userData"));
    let token = userData.user.token;
    let res = await axios.post(
      `${apiUrl}/user/confirmaccount`,
      { id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    await dispatch(getUsers());
    //dispatch(getUser(res.data))
    swal("", "Usuario modificado correctamente!", "success");
  } catch (e) {
    console.log(e);
  }
};

export const banear = (id) => async (dispatch) => {
  try {
    let userData = JSON.parse(sessionStorage.getItem("userData"));
    let token = userData.user.token;
    let res = await axios.post(
      `${apiUrl}/user/banear`,
      { id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    await dispatch(getUsers());
    //dispatch(getUser(res.data))
    swal("", "Usuario eliminado correctamente!", "success");
  } catch (e) {
    console.log(e);
  }
};
