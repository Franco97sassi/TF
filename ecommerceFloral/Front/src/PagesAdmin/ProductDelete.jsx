import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from "react";
import { AdminNavbar } from './panel';
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from '../state/actions/createProduct';
import { deleteProduct } from '../state/actions/createProduct';



export default function ProductDelete() {

  const dispatch = useDispatch()
  const { products } = useSelector((state) => state.products);



  useEffect(() => {
    dispatch(getAllProduct())

  }, [dispatch])
  
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Nombre', width: 350 },

    {
      field: 'preferenceId',
      headerName: 'Detalles',

      width: 120,
      renderCell: (params) => (
        <button
          onClick={() => {
            dispatch(deleteProduct(params.id))
          }}
          style={{ background: "red", borderRadius: "1px solid black", color: "white" }}
        >
          Eliminar
        </button>
      ),
    },
    {
      field: 'editar',
      headerName: 'Editar',

      width: 120,
      renderCell: (params) => (
        <button
          onClick={() => {
            console.log(params.id)
            window.location.href=`/admin/editproduct/${params.id}`
          }}
          style={{ background: "orange", borderRadius: "1px solid black", color: "white" }}
        >
          Editar
        </button>
      ),
    },
    { field: 'updatedAt', headerName: 'Fecha y hora', width: 195, color: "green" },
  ];

  return (
    <div>
      <AdminNavbar />

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ display: "flex", width: "90%" }}>
          <Box sx={{ height: 600, width: '100%' }}>
            <DataGrid
              rows={products.products ? products.products : []}
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