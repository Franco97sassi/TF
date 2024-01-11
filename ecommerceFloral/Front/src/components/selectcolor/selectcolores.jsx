import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
//import { products } from '../../data';

const ColorSelect = ({ product, selectedColor, handleColorChange }) => {


  return (
    <FormControl fullWidth >
      <InputLabel sx={{ color: 'white', background: "white", borderRadius: "50%", maxWidth: "20px", maxHeight: "20px" }} id="color-select-label">

      </InputLabel>
      <Select
        labelId="color-select-label"
        id="color-select"
        value={selectedColor}
        onChange={handleColorChange}
        autoWidth

        sx={{
          '& .MuiOutlinedInput-notchedOutline': {
            border: 'none',
          },
        }}
        renderValue={() => (
          <div style={{display:"flex", }}>
            <div
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                border: "1px solid black",
                backgroundColor: selectedColor.CodigoColor,
                display: 'inline-block',
                marginRight: '5px',
              }}
            />
            <p style={{ width: "60px", margin: "0px", marginLeft: ".3em", overflow:"hidden" }}>{selectedColor.ColorName}</p>
          </div>

        )}
      >
        {product?.Stocks?.map((color) => (
          <MenuItem key={color.name} value={color} >
            <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: color.CodigoColor, border: "1px solid black" }} />
            <p style={{ width: "60px", margin: "0px", marginLeft: ".5rem" }}>{color.ColorName}</p>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ColorSelect;
