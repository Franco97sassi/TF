import { createSlice } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-start',
  showConfirmButton: false,
  timer: 1000,
  timerProgressBar: true,
  customClass: {
    container: 'my-toast-container', // Clase CSS para el contenedor principal
    popup: 'my-toast-popup' // Clase CSS para el cuadro emergente
  },
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
    document.querySelector('.my-toast-container').style.zIndex = '10000';
  }

})


const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addProduct: (state, action) => {
      const product = action.payload;
      const existingProduct = state.find((item) => item.id === product.id && JSON.stringify(item.color) === JSON.stringify(product.color) && product.size === item.size && product.price === item.price);

      if (existingProduct) {
        if (existingProduct.id === "4c8d59f7-2c46-4c4f-bd86-329cdde5857e") {
          existingProduct.quantity = 1
          Toast.fire({
            icon: 'success',
            title: 'Signed in successfully envio'
          })
        } else {
          existingProduct.quantity += product.quantity;
          Toast.fire({
            icon: 'success',
            title: `Se agrego +1 ${product.name} ${product.quantityPrice ? "x" + product.quantityPrice : ""} al carrito`,

          })
        }

      } else {
        state.push(product);
        Toast.fire({
          icon: 'success',
          title: `${product.name} ${product.quantityPrice ? "x" + product.quantityPrice : ""}  se agrego al carrito`
        })
      }
    },
    removeProduct: (state, action) => {

      const { productId, color } = action.payload;
      const index = state.findIndex((item) => item.id === productId && JSON.stringify(item.color) === JSON.stringify(color));
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    updateQuantity: (state, action) => {
      const { productId, quantity, color, size, price } = action.payload;
      const product = state.find((item) => item.id === productId && JSON.stringify(item.color) === JSON.stringify(color) && item.price === price && item.size === size);
      if (product && product.id != "4c8d59f7-2c46-4c4f-bd86-329cdde5857e") {
        product.quantity = quantity;
      }
    },
  },
});

export const { addProduct, removeProduct, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;