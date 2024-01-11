import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Container,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
//import { products } from "../../data";
import SingleProduct from "./SingleProduct";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import SingleProductDesktop from "./SingleProductDesktop";
import { getAllProduct } from "../../state/actions/createProduct";

export default function Products() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const { products } = useSelector((state) => state.products);
  //console.log(products)
  const categories = [
    { id: 1, name: "Flores" },
    { id: 2, name: "Rosas" },
    { id: 3, name: "Girasoles" },
  ];

  useEffect(() => {
    dispatch(getAllProduct());
  }, []);

  const filterProducts = () => {
    //let filtered = products?.products?products.products:[]
    let filtered =
      products && products.products
        ? JSON.parse(JSON.stringify(products.products))
        : [];

    if (selectedCategory) {
      filtered = filtered.filter((product) =>
        product.categories.some((cat) => cat.name === selectedCategory)
      );
    }

    if (selectedPrice === "menor") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (selectedPrice === "mayor") {
      filtered.sort((a, b) => b.price - a.price);
    }

    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const handleCategoryChange = (event) => {
    setCurrentPage(1);
    setSelectedCategory(event.target.value);
  };

  const handlePriceChange = (event) => {
    setSelectedPrice(event.target.value);
  };

  const handleSearchChange = (event) => {
    setCurrentPage(1);
    setSearchQuery(event.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderProducts = () => {
    const filteredProducts = filterProducts();
    const lastIndex = currentPage * productsPerPage;
    const firstIndex = lastIndex - productsPerPage;
    const currentProducts = filteredProducts.slice(firstIndex, lastIndex);

    return currentProducts.map((product) => (
      <Grid
        item
        key={product.id}
        xs={2}
        sm={4}
        md={4}
        display="flex"
        flexDirection={"column"}
        alignItems="center"
      >
        {matches ? (
          <SingleProduct product={product} matches={matches} />
        ) : (
          <SingleProductDesktop product={product} matches={matches} />
        )}
      </Grid>
    ));
  };

  const pageCount = Math.ceil(filterProducts().length / productsPerPage);

  const renderPagination = () => {
    const paginationButtons = [];
    for (let i = 1; i <= pageCount; i++) {
      paginationButtons.push(
        <Button
          key={i}
          variant={i === currentPage ? "contained" : "outlined"}
          onClick={() => handlePageChange(i)}
          sx={{ m: "0.3rem" }}
        >
          {i}
        </Button>
      );
    }
    return paginationButtons;
  };

  return (
    <Container>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        justifyContent="center"
        sx={{ margin: `20px 4px 10px 4px`, minHeight: "600px" }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Box sx={{ display: "flex", flexDirection: "row", width: matches? "90%":"90%", justifyContent: matches? "center": "space-between"}}>
          <Box >
            <TextField
              sx={{width:matches? "11rem":"43.2rem", marginRight:matches? "":"5.8rem", marginLeft:matches? "1rem":""}}
              label="Buscar producto"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </Box>
          <Box>
            <FormControl sx={{ width:matches? "9rem":"18.7rem"}}>
              <InputLabel >Categorías</InputLabel>
              <Select
                labelId="category-label"
                id="category"
                value={selectedCategory}
                onChange={handleCategoryChange}
                displayEmpty
                label="Categorias"
                
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.name}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box sx={{ width: "100%" }}></Box> {/* Salto de línea */}
        {renderProducts()}
      </Grid>

      <Box sx={{ textAlign: "center", padding: "2rem" }}>
        {renderPagination()}
      </Box>
    </Container>
  );
}
