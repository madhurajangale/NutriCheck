import React, { useState } from 'react';
import axios from 'axios';
import { Card, Grid, Typography, TextField, Button, Paper, CircularProgress } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { Link } from 'react-router-dom'

const ProductScan = () => {
  const [productName, setProductName] = useState('');
  const [productData, setProductData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchProductData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/product', {
        params: { name: productName },
      });
      setProductData(response.data.products[0]);
      setError('');
    } catch (err) {
      setProductData(null);
      setError(err.response?.data?.error || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  const renderNutrientChart = () => {
    if (!productData || !productData.nutriments) return null;

    const labels = Object.keys(productData.nutriments || {});
    const values = Object.values(productData.nutriments || {});

    const data = {
      labels,
      datasets: [
        {
          label: 'Nutrients per 100g',
          data: values,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
      ],
    };

    return <Bar data={data} />;
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', margin: '20px' }}>
      <Typography variant="h4" gutterBottom align="center">
        Product Analysis
      </Typography>

      <Grid container spacing={3} justifyContent="center" style={{ marginBottom: '20px' }}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Enter product name"
            variant="outlined"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={fetchProductData}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Search'}
          </Button>
        </Grid>
        <Grid item>
          <Link to ="/imgscan"><Button
            
          >
            scan
          </Button></Link>
        </Grid>
      </Grid>

      {error && (
        <Typography color="error" align="center">
          {error}
        </Typography>
      )}

      {productData && (
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card style={{ padding: '20px' }}>
              <Typography align="left" variant="h6">
                General Information
              </Typography>
              <Typography align="left"><strong>Name:</strong> {productData.product_name || 'N/A'}</Typography>
              <Typography align="left"><strong>Brand:</strong> {productData.brands || 'N/A'}</Typography>
              <Typography align="left"><strong>Categories:</strong> {productData.categories || 'N/A'}</Typography>
              <Typography align="left"><strong>Eco-Score:</strong> {productData.ecoscore_grade?.toUpperCase() || 'N/A'}</Typography>
              <Typography align="left"><strong>Nutri-Score:</strong> {productData.nutriscore_grade?.toUpperCase() || 'N/A'}</Typography>
              <Typography align="left"><strong>Barcode:</strong> {productData.code || 'N/A'}</Typography>
              <Typography align="left"><strong>Carbon Footprint:</strong> {productData.ecoscore_data?.agribalyse?.co2_total || 'N/A'}</Typography>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card style={{ padding: '20px' }}>
              <Typography variant="h6">Ingredients</Typography>
              <Typography>{productData.ingredients_text_en || 'No ingredients information available.'}</Typography>

              <Typography variant="h6" style={{ marginTop: '20px' }}>
                Allergens
              </Typography>
              <Typography>{productData.allergens || 'N/A'}</Typography>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card style={{ padding: '20px' }}>
              <Typography variant="h6">Nutrient Levels</Typography>
              <Grid container spacing={2}>
                {Object.entries(productData.nutrient_levels || {}).map(([key, value]) => (
                  <Grid item xs={6} md={3} key={key}>
                    <Typography><strong>{key.replace(/_/g, ' ')}:</strong> {value || 'N/A'}</Typography>
                  </Grid>
                ))}
              </Grid>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card style={{ padding: '20px' }}>
              <Typography variant="h6">Nutrient Analysis</Typography>
              {renderNutrientChart()}
            </Card>
          </Grid>
        </Grid>
      )}
    </Paper>
  );
};

export default ProductScan;
