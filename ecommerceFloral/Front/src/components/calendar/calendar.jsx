import React, { useEffect } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import { useDispatch, useSelector } from "react-redux";
import { getOrdenes } from '../../state/actions/ordenes';
import moment from 'moment';
import 'moment/locale/es-mx';

const getFecha = (str) => {
  const startIndex = str.indexOf("Fecha: ");
  const subStr = str.substring(startIndex);
  const fechaCompleta = subStr.split("\n")[0];
  const fechastr = fechaCompleta.replace("Fecha: ", "");
  // Obtener los componentes de la fecha
  const [day, month, year] = fechastr.split("/");
  // Crear un objeto de fecha
  const fecha = `${year}-${month}-${day}`;
  return fecha;
}

export const Calendar = ({ value, onChange }) => {
  const { orden } = useSelector((state) => state.orden);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrdenes());

  }, []);

  const snackImage = "https://static.vecteezy.com/system/resources/previews/005/013/755/original/snack-logo-design-with-cassava-chips-icon-and-letter-s-initials-free-vector.jpg";

  moment.locale('es-mx');
  const getDateEvents = () => {
    const fechas = [];
    if (Array.isArray(orden)) {
      orden.forEach((obj) => {
        if (obj.estado === 'PAGADO CON EXITO') {
          const cart = obj.cart;
          cart.forEach((item) => {
            if (item.image === snackImage) {
              const snack = getFecha(item.name);
              fechas.push(snack);
            }
          });
        }
      });
    }
    return fechas;
  };

  const disabledDates = getDateEvents();

  // Función para desactivar días anteriores al día actual y las fechas proporcionadas
  const shouldDisableDate = (date) => {
    const currentDate = moment().startOf('day');
    const selected = moment(date).startOf('day');

    // Desactivar días anteriores al día actual
    if (selected.isBefore(currentDate)) {
      return true;
    }

    // Desactivar fechas proporcionadas
    return disabledDates.some((disabledDate) =>
      moment(disabledDate).isSame(selected, 'day')
    );
  };

  return (
    <DatePicker
      sx={{ width: "10rem", margin: 1 }}
      locale="es-mx"
      format="DD/MM/YYYY"
      label={"Fecha"}
      value={value}
      onChange={onChange}
      shouldDisableDate={shouldDisableDate}
    />
  );
};