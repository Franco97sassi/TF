import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { Typography, FormControl, InputLabel, Grid, MenuItem, Select, Box, Chip, Button, TextField } from '@mui/material';
import { AdminNavbar } from './panel';

import { getCategories } from '../state/actions/createCategory';
import { getColor } from '../state/actions/createColor';
import { editProduct } from '../state/actions/createProduct';
import swal from 'sweetalert';
import axios from 'axios';
import { getAllProduct } from '../state/actions/createProduct';

import CargarImagenImg from "../assets/cargaimg.png"
import { useParams } from 'react-router-dom';



const ImageInput = ({ images, onChange }) => {
  const handleImageChange = (index, value) => {
    const updatedImages = images.map((image, i) =>
      i === index ? { ...image, url: value } : image
    );
    onChange(updatedImages);
  };

  const handleAddImage = () => {
    onChange([...images, { id: Date.now(), url: '' }]);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    onChange(updatedImages);
  };

  return (
    <div>
      {images.map((image, index) => (
        <div key={image.id}>
          <TextField
            label={`Imagen ${index + 1}`}
            value={image.url}
            onChange={(event) =>
              handleImageChange(index, event.target.value)
            }
          />
          <Button onClick={() => handleRemoveImage(index)}>
            Eliminar Imagen
          </Button>
        </div>
      ))}
      <Button onClick={handleAddImage}>Agregar Imagen</Button>
    </div>
  );
};






const PriceInput = ({ prices, onChange }) => {
  const handlePriceChange = (index, field, value) => {
    const updatedPrices = prices.map((price, i) => {
      if (i === index) {
        return {
          ...price,
          [field]: value,
        };
      }
      return price;
    });
    onChange(updatedPrices);
  };

  const handleAddPrice = () => {
    onChange([...prices, { quantity: null, price: '', size: null }]);
  };

  const handleRemovePrice = (index) => {
    const updatedPrices = prices.filter((_, i) => i !== index);
    onChange(updatedPrices);
  };

  return (
    <div>
      {prices.map((price, index) => (
        <div key={index}>
          <TextField
            label="Cantidad"
            type='number'
            value={price.quantity}
            onChange={(event) =>
              handlePriceChange(index, 'quantity', event.target.value)
            }
          />
          <TextField
            label="Precio"
            value={price.price}
            type='number'
            onChange={(event) =>
              handlePriceChange(index, 'price', event.target.value)
            }
          />
          <TextField
            label="Tamaño"
            value={price.size}
            onChange={(event) =>
              handlePriceChange(index, 'size', event.target.value)
            }
          />
        </div>
      ))}
      <Button onClick={handleAddPrice}>Agregar Precio</Button>
      {prices.length > 1 && (
        <Button onClick={() => handleRemovePrice(prices.length - 1)}>
          Eliminar Precio
        </Button>
      )}
    </div>
  );
};

export const EditProduct = () => {

  

  const dispatch = useDispatch()

  const { products } = useSelector((state) => state.products);

  const { categories } = useSelector((state) => state.categories.categories);
  const { colors } = useSelector((state) => state.colors);

  const { id } = useParams();

  const [product, setProduct] = useState({
    name: '',
    price: [{ quantity: null, price: '', size: null }],
    description: '',
    image: '',
    color: [],
    stock: [],
    images: [],
  });


  useEffect(() => {
    dispatch(getAllProduct());
  }, []);


  console.log(products, "AQUI")



  const uploadAdditionalImagesToCloudinary = async (files) => {
    try {
      const uploadedImages = await Promise.all(
        files.map(async (file) => {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('upload_preset', 'lhrxavmr'); // Reemplaza con tu upload_preset
  
          const response = await axios.post(
            'https://api.cloudinary.com/v1_1/dumk9db4g/image/upload', // Reemplaza con tu cloud_name
            formData
          );
  
          return response.data.secure_url;
        })
      );
  
      setProduct({
        ...product,
        images: product.images.concat(
          uploadedImages.map((url) => ({ id: Date.now(), url }))
        ),
      });
    } catch (error) {
      console.error('Error uploading images to Cloudinary:', error);
    }
  };
  
  






  const uploadImageToCloudinary = async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'mikfz4tc'); // Reemplaza con tu upload_preset
  
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dt3akiobn/image/upload', // Reemplaza con tu cloud_name
        formData
      );
  
      setProduct({
        ...product,
        image: response.data.secure_url
      });
  
      // Haz algo con la imageUrl, como guardarla en el estado
      // o mostrarla en algún lugar de tu componente
      console.log('Image URL:', imageUrl);

      

      

      
  
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
    }
  };

  const handleImagePortadaChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      
      uploadImageToCloudinary(file);
    }
  };

  const handleImagesChange = (newImages) => {
    setProduct({
      ...product,
      images: newImages,
    });
  };


  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!product.name || !product.price[0].price || !product.description || !product.image || !product.color.length || !selectedCategories.length) {
      return swal("Todos los campos son requeridos, excepto Cantidad y tamaño")
    } else {
      dispatch(editProduct(product,id))
    }
  };

  const handlePriceChange = (prices) => {
    setProduct({
      ...product,
      price: prices,
    });
  };

  const handleColorChange = (event) => {
    const selectedColors = event.target.value;
  console.log(selectedColors, "EPA")
    const updatedStock = selectedColors.map((colorOption) => ({
      ...colorOption,
      color: '',
    }));
  
    setProduct({
      ...product,
      stock: selectedColors.map((colorOption) => colorOption.id), // Usa solo el ID para representar los colores seleccionados
      color: updatedStock,
    });
  };



  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleImageLoad = (event) => {
    const img = event.target;
    if (img.width > 400 || img.height > 400) {
      // Redimensionar la imagen si supera el tamaño máximo permitido
      if (img.width > img.height) {
        img.style.width = '400px';
        img.style.height = 'auto';
      } else {
        img.style.width = 'auto';
        img.style.height = '400px';
      }
    }
  };

  const handleCategoryChange = (event) => {
    const selectedCategories = event.target.value;
    setSelectedCategories(selectedCategories);
    setProduct({
      ...product,
      categories: selectedCategories.map((categoryId) =>
        categories.find((category) => category.id === categoryId)
      ),
    });
  };

  console.log(product, "PRODUCT")

  useEffect(() => {
    dispatch(getCategories())
    dispatch(getColor())
  }, [dispatch])


  useEffect(() => {
    // Obtener el producto específico para editar
    console.log(id);
    const productToEdit = products?.products?.find((product) => product.id === Number(id)) // Ajusta el ID según tu lógica
    
    console.log(productToEdit, "JAJA");
    if (productToEdit) {
      setProduct({
        name: productToEdit.name,
        categories:productToEdit.categories || [],
        price: productToEdit.prices || [],
        description: productToEdit.description,
        image: productToEdit.image,
        stock: productToEdit.Stocks?.map((stock) => stock.ColorId) || [], // Usa solo el ID para representar los colores existentes
        color: productToEdit.Stocks?.map((stock) =>({id:stock.ColorId,name:stock.ColorName,codigo:stock.CodigoColor} )),
        images: productToEdit.images || [],
      });
  
      // También necesitarás manejar las categorías seleccionadas
      const selectedCategories = productToEdit.categories.map((category) => category.id);
      setSelectedCategories(selectedCategories);
    }
  }, [products, id]);

  return (
    <div>
      <AdminNavbar />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Grid sx={{ maxWidth: "80%" }}>
          <Typography variant="h6" sx={{ fontSize: "28px", fontWeight: "500" }}>
            EDITAR PRODUCTO
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="category-select-label">Categoría</InputLabel>
                  <Select
                    labelId="category-select-label"
                    multiple
                    value={selectedCategories}
                    onChange={handleCategoryChange}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        {selected.map((categoryId) => {
                          const category = categories?.find((cat) => cat.id === categoryId);
                          return (
                            <Chip
                              key={category?.id}
                              label={category?.name}
                              sx={{
                                marginRight: '8px',
                                marginBottom: '8px',
                              }}
                            />
                          );
                        })}
                      </Box>
                    )}
                  >
                    {categories?.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth required margin="normal">
  <InputLabel id="color-select-label">Color</InputLabel>
  <Select
  labelId="color-select-label"
  multiple
  value={product.stock.map((colorId) => colors?.colors?.find((color) => color.id === colorId))}
  onChange={handleColorChange}
  renderValue={(selected) => (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      {selected.map((colorOption) => (
        <Chip
          key={colorOption?.id}
          label={colorOption?.ColorName || colorOption?.name}
          sx={{
            backgroundColor: colorOption?.CodigoColor || colorOption?.codigo,
            color: '#fff',
            marginRight: '8px',
            marginBottom: '8px',
          }}
        />
      ))}
    </Box>
  )}
>
  {colors?.colors?.map((colorOption) => (
    <MenuItem key={colorOption?.id} value={colorOption}>
      <Box
        sx={{
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          backgroundColor: colorOption?.codigo,
          display: 'inline-block',
          marginRight: '8px',
        }}
      />
      {colorOption?.name}
    </MenuItem>
  ))}
</Select>
</FormControl>
              </Grid>



              <Grid item xs={12}>
                <TextField
                  required
                  label="Nombre"
                  name="name"
                  value={product.name}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12}>
                <PriceInput prices={product.price} onChange={handlePriceChange} />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  label="Descripción"
                  name="description"
                  value={product.description}
                  onChange={handleInputChange}
                  fullWidth
                  multiline
                  rows={4}
                />
              </Grid>
              {/* <Grid item xs={12}>
                <TextField
                  label="URL de imagen"
                  name="image"
                  value={product.image}
                  onChange={handleInputChange}
                  fullWidth
                />
                {product.image && (
                  <img
                    src={product.image}
                    alt="Product Image"
                    onLoad={handleImageLoad}
                    style={{ maxWidth: '400px', maxHeight: '400px', marginTop: '10px' }}
                  />
                )}
              </Grid> */}



              <Grid sx={{display:"flex", alignItems:"center"}} container spacing={3} >
      <Grid item xs={12}>
        <label
            className=""
            htmlFor="fileUploadButton2"
            style={{
              backgroundColor: '',
              color: 'white',
              padding: '10px 15px',
              cursor: 'pointer',
            }}
          >
            <img style={{ width: '20px' }} src={CargarImagenImg} alt="Cargar Imagen" />
          </label>
          <input
            id="fileUploadButton2"
            type="file"
            accept="image/*"
            onChange={
              handleImagePortadaChange // Manejo de cambios de la imagen
            }
            style={{ display: 'none' }}
          /><Box sx={{height:"100%", maxHeight:"200px"}}>
            {product?.image?
            <>
            <img style={{height:"190px"}} src={product?.image} alt="portada" />
            </>
              :
          <div>Cargar imagen de portada</div>}
          

          </Box>
      </Grid>
      <Grid sx={{display:"flex", }} item xs={12}>
      
      </Grid>
    </Grid>






              


              
<Grid item xs={12}>
  <ImageInput images={product.images} onChange={handleImagesChange} />
</Grid>

<Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">Guardar</Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Box>
    </div>
  );
};
































