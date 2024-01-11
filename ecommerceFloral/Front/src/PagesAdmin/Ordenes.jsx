import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from "react";
import { AdminNavbar } from './panel';
import { useDispatch, useSelector } from "react-redux";
import { getOrdenes } from '../state/actions/ordenes';



export default function Ordenes() {

  const dispatch = useDispatch()
  const { orden } = useSelector((state) => state.orden);



  useEffect(() => {
    dispatch(getOrdenes())
  }, [])

  const [rows, setRows] = React.useState(orden ? orden : []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 20 },
    { field: 'senderName', headerName: 'Nombre', width: 200 },
    { field: 'cellphone', headerName: 'Telefono', width: 200 },
    { field: 'estado', headerName: 'Estado', width: 200, color: "green" },
    { field: 'idCompra', headerName: 'MercadoPago ID', width: 240, color: "green" },
    {
      field: 'preferenceId',
      headerName: 'Detalles',

      width: 120,
      renderCell: (params) => (
        <button
          onClick={() => {
            window.location.href = `/success?preferenceId=${params.value}`
            console.log(params, "soy params")
          }}
          style={{ background: "green", borderRadius: "1px solid black", color: "white" }}
        >
          Ver detalles
        </button>
      ),
    },
    { field: 'description', headerName: 'Referencia', width: 300 },
    { field: 'updatedAt', headerName: 'Fecha y hora', width: 195, color: "green" },
  ];

  return (
    <div>
      <AdminNavbar />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ display: "flex", width: "90%" }}>
          <Box sx={{ height: 600, width: '100%' }}>
            <DataGrid
              rows={orden ? orden : rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick // Deshabilita la selección de filas al hacer clic
            />
          </Box>
        </Box>
      </Box>
    </div>
  );
}

