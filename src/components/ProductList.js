import React, { useEffect, useState } from "react";
import { Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";
import { fetchProducts } from "../Api";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import { Spinner } from "../Spinner";

const ProductCard = styled(Card)({
  maxWidth: 345,
  margin: 16,
});

const ProductList = () => {
  const [originalProducts, setOriginalProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [sort, setSort] = useState("");
  const [order, setOrder] = useState("asc");
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const data = await fetchProducts(page, sort, order);
        setOriginalProducts(data.products);
        setProducts(data.products);
        const uniqueCategories = [
          ...new Set(
            data.products.map((product) => product.category.toLowerCase())
          ),
        ];
        setCategories(uniqueCategories);
        setTotalPages(data.totalPages);
        setLoading(false);
      } catch (err) {
        setError('Something went wrong !!');
        setLoading(false);
      }
    };

    loadProducts();
  }, [page, sort, order]);

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearch(searchTerm);
    const filteredData = originalProducts.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.trim())
    );
    setProducts(filteredData);
    setPage(1);
  };
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    if (event.target.value === "") {
      setProducts(originalProducts);
    } else {
      const filteredData = originalProducts.filter(
        (item) => item.category === event.target.value
      );
      setProducts(filteredData);
    }
  };

  const handleSortChange = (event) => {
    const value = event.target.value;
    setSort(value);
    if (value === "asc") {
      setOrder("asc");
    } else if (value === "desc") {
      setOrder("desc");
    } else {
      setOrder("asc");
    }
  };


  if (loading) return <Spinner />;
  if (error) {
    return (
      <Grid container justifyContent="center" alignItems="center" style={{ minHeight: "100vh" }}>
        <Grid item xs={12}>
          <Typography variant="h5" color="error" gutterBottom textAlign="center">
            {error}
          </Typography>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom textAlign={'center'}>
          Shoppers
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          label="Search"
          variant="outlined"
          value={search}
          onChange={handleSearchChange}
          fullWidth
          style={{ backgroundColor: "#fff", borderRadius: "4px"}}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            onChange={handleCategoryChange}
            label="Category"
            style={{ backgroundColor: "#fff", borderRadius: "4px" }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {categories.map((cat, index) => (
              <MenuItem key={index} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sort}
            onChange={handleSortChange}
            label="Sort By"
            style={{ backgroundColor: "#fff", borderRadius: "4px" }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="asc">Price: Low to High</MenuItem>
            <MenuItem value="desc">Price: High to Low</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} style={{ backgroundColor: "#f9f9f9" }}>
  <Grid container spacing={2}>
    {products.length > 0 ? (
      products.map((product) => (
        <Grid key={product.id} item xs={12} sm={6} md={4} sx={10}>
          <ProductCard>
            <CardMedia
              component="img"
              height="200"
              image={product.image}
              alt={product.name}
            />
            <CardContent>
              <Typography variant="subtitle1" component="h6">
                <Link
                  to={`/product/${product.id}`}
                  state={{ product: product }}
                  style={{ textDecoration: 'none' }}
                >
                  {product.name}
                </Link>
              </Typography>
              <Grid container justifyContent={'space-between'} alignItems={'center'} style={{marginTop:10}}>
                <Grid item>
                  <Typography variant="body1" color="textPrimary">
                    {product.price}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2" color="textSecondary">
                    {product.category}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </ProductCard>
        </Grid>
      ))
    ) : (
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          No products found matching your search.
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Try searching for a different term or category.
        </Typography>
      </Grid>
    )}
  </Grid>
</Grid>

      {products.length > 0 && (
    <Grid item xs={12} container justifyContent="center" alignItems="center">
      <Pagination
        count={totalPages}
        page={page}
        onChange={(event, value) => setPage(value)}
        style={{ marginTop: "16px" }}
      />
    </Grid>
  )}
  
    </Grid>
  );
};

export default ProductList;
