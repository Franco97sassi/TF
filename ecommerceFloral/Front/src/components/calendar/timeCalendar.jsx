import React from 'react';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import moment from 'moment';
import 'moment/locale/es-mx';

export const TimeCalendar = ({ value, onChange }) => {

  const minimunSelect = (fecha) => {
    let minHour = moment().tz("America/Hermosillo").set({ hour: 10, minute: 0 })
    if (fecha !== null){
      if (fecha.date() === moment().date()){
        minHour = moment().tz("America/Hermosillo").add(2, "hours");
      } 
    }
    return minHour
  }

  const shouldDisableTime = (selectedDateTime) => {
    const selectedHour = moment(selectedDateTime).hour();
    return selectedHour < 9 || selectedHour >= 22;
  };
  const horaMinima = minimunSelect(value)//moment().tz("America/Hermosillo").set({ hour: 10, minute: 0 });
  const horaMaxima = moment().tz("America/Hermosillo").set({ hour: 19, minute: 0 });
  const fechaMinima = moment().tz("America/Hermosillo").add(2, "hours");

  return (
    <MobileDateTimePicker
    sx={{width: "100%"}}
      locale="es-mx"
      ampm={false}
      minDate={fechaMinima}
      minTime={horaMinima}
      maxTime={horaMaxima}
      label={"Fecha y Horario"}
      value={value}
      onChange={onChange}
      shouldDisableTime={shouldDisableTime}
      minutesStep={30}
    />
  )
}