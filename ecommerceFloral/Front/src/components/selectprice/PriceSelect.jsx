import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const PriceSelect = ({ product, selectedPrice, setSelectedPrice, handlePriceChange }) => {
  return (
    <FormControl fullWidth>
      <InputLabel sx={{ color: 'Black', fontWeight: "500", textAlign: "center", display: "flex", marginLeft: "50%" }} id="price-select-label">
        
      </InputLabel>
      <Select
        labelId="price-select-label"
        id="price-select"
        value={selectedPrice}
        onChange={handlePriceChange}
        autoWidth
        sx={{
          '& .MuiOutlinedInput-notchedOutline': {
            border: '',
          },
          width: "100%",
          maxWidth: "120px",
          minWidth: "120px"
        }}
      >
        {product?.prices?.map((price) => (
          <MenuItem key={price.quantity} value={price}>
            {price.size} x{price.quantity}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default PriceSelect;