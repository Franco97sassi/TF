import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import  { useState,useEffect } from "react";
import { AdminNavbar } from './panel';
import { useDispatch, useSelector } from "react-redux";


import { getSnacks } from '../state/actions/createSnack';
import { deleteSnack } from '../state/actions/createSnack';


export default function SnackDelete() {

  const dispatch = useDispatch()
  const { snack } = useSelector((state) => state.snack);



  useEffect(()=>{
    dispatch(getSnacks())
    
  },[dispatch])

console.log(snack)

 

  const columns = [
    { field: 'id', headerName: 'ID', width: 200 },
    { field: 'name', headerName: 'Nombre', width: 500 },
    
    
    
    {
      field: 'preferenceId',
      headerName: 'Detalles',
      
      width: 120,
      renderCell: (params) => (
        <button
          onClick={() => {
            
           
            dispatch(deleteSnack(params.id))
            
          }}
          style={{background:"red", borderRadius:"1px solid black", color:"white"}}
        >
          Eliminar
        </button>
      ),
    },
    { field: 'updatedAt', headerName: 'Fecha y hora', width: 200 , color:"green"},
  ];

  return (
    <div>
      <AdminNavbar/>
      
      <Box sx={{display:"flex", justifyContent:"center"}}>
      <Box sx={{display:"flex", width:"90%"}}>
      <Box sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={snack.snacks?snack.snacks:[]}
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