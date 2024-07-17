import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Typography, Button, Container, Grid } from "@mui/material";
import { styled } from "@mui/system";

const StyledContainer = styled(Container)({
  padding: "16px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "16px",
  maxWidth: "800px",
  margin: "40px auto",
  backgroundColor: "#f9f9f9",
  border: "1px solid #ddd",
  borderRadius: "10px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
});

const GridContainer = styled(Grid)({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
});

const GridItem = styled(Grid)({
  margin: "16px",
});

const Image = styled("img")({
  width: "70%",
  height: "100%",
  marginBottom: "16px",
  borderRadius: "10px",
});

const Price = styled(Typography)({
  fontSize: "24px",
  fontWeight: "bold",
  marginBottom: "16px",
});

const Description = styled(Typography)({
  marginBottom: "16px",
});

const AddToCartButton = styled(Button)({
  marginTop: "16px",
  marginRight: "8px",
});

const BuyNowButton = styled(Button)({
  marginTop: "16px",
});

const ProductDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;
  console.log(product, "product");

  if (!product) {
    return <div>No product data available</div>;
  }

  return (
    <StyledContainer>
      <GridContainer container spacing={2}>
        <GridItem item xs={12} md={6} order={1}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate(-1)}
            style={{ marginTop: "16px", float: "left" }}
          >
            Back
          </Button>
        </GridItem>
        <GridItem item xs={12} md={6} order={2}>
          <Typography variant="h6" gutterBottom>
            {product.name}
          </Typography>
        </GridItem>
      </GridContainer>

      <GridContainer container spacing={2}>
        <GridItem item xs={12} md={6} order={1}>
          <Image src={product.image} alt={product.name} />
        </GridItem>

        <GridItem item xs={12} md={6} order={2}>
          <Price variant="h4">Price: {product.price}</Price>
          <Description variant="body2" gutterBottom>
            {product.description}
          </Description>
          <AddToCartButton variant="contained" color="primary">
            Add to Cart
          </AddToCartButton>
          <BuyNowButton variant="contained" color="secondary">
            Buy Now
          </BuyNowButton>
        </GridItem>
      </GridContainer>
    </StyledContainer>
  );
};

export default ProductDetail;