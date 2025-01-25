import React, { useState } from 'react';
import axios from 'axios';
import { Card, Grid, Typography, TextField, Button, Paper, CircularProgress } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { Link } from 'react-router-dom'
import '../styles/details.css';
import ingredients from '../images/ingredients.png';
import allergy from '../images/allergy.png';

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


  const getStyle = (scoreType, grade) => {
    const styles = {
      ecoScore: {
        A: { color: 'darkgreen', image: '/images/A.png' },
        B: { color: 'lightgreen', image: '/images/B.png' },
        C: { color: 'yellow', image: '/images/C.png' },
        D: { color: 'orange', image: '/images/D.png' },
        E: { color: 'red', image: '/images/E.png' },
      },
      greenScore: {
        A: { color: 'darkblue' },
        B: { color: 'blue' },
        C: { color: 'lightblue'},
        D: { color: 'gray' },
        E: { color: 'darkgray'},
      },
      carbonFootprint: {
        A: { color: 'darkgreen'},
        B: { color: 'green'},
        C: { color: 'orange' },
        D: { color: 'red'},
        E: { color: 'darkred'},
      },
    };
  
    if (grade === 'N/A') {
      return { color: 'gray', image: '/images/default.jpeg' };
    }
  
    return styles[scoreType][grade] || { color: 'gray', image: '/images/default.jpeg' };
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

  const ecoGrade = productData?.ecoscore_grade?.toUpperCase() || 'N/A';
  const greenGrade = productData?.green_score_grade?.toUpperCase() || 'N/A';
  const carbonGrade = productData?.carbon_footprint_grade?.toUpperCase() || 'N/A';

  const { color: ecoColor } = getStyle('ecoScore', ecoGrade);
  const { color: greenColor } = getStyle('greenScore', greenGrade);
  const { color: carbonColor } = getStyle('carbonFootprint', carbonGrade);

  return (
    <Paper elevation={3} style={{ padding: '20px', margin: '20px' }}>
      <Typography variant="h4" gutterBottom align="center" color='#2f524d' fontWeight={600}>
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
          <Link to ="/imgscan"><Button>scan</Button></Link>
        </Grid>
      </Grid>

      {error && (
        <Typography color="error" align="center">
          {error}
        </Typography>
      )}
      <Typography align="left" variant="h5" marginTop={6}>
        <strong>Product:</strong> {productData?.product_name || 'N/A'}
      </Typography>

      {productData && (
        <Grid >
          <div style={{ display: 'flex', flexDirection: 'column', justifyItems: 'space-between' }}>
          {/* Eco-Score */}
          <Card style={{ padding: '20px', marginBottom: '20px', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <Typography style={{ color: ecoColor, fontWeight: 'bold', marginRight: '8px' }}>
              Eco-Score: {ecoGrade}
            </Typography>
            {ecoGrade !== 'N/A' && ( <img src={require(`../images/${ecoGrade}.png`)} alt={`Eco Score ${ecoGrade}`} style={{ width: '150px', height: '70px' }} /> )}
          </Card>

          {/* Green Score */}
          <Card style={{ padding: '20px', marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
            <Typography style={{ color: greenColor, fontWeight: 'bold', marginRight: '8px' }}>
              Green Score: {greenGrade}
            </Typography>
          </Card>

          {/* Carbon Footprint */}
          <Card style={{ padding: '20px', display: 'flex', alignItems: 'center' }}>
            <Typography marginBottom={6} style={{ color: carbonColor, fontWeight: 'bold', marginRight: '8px' }}>
              Carbon Footprint: {carbonGrade}
            </Typography>
          </Card></div>

          <Grid item xs={12} md={6} style={{ display: 'flex', flexDirection: 'column', marginTop: '40px', backgroundColor: '#f5f5f5', padding: '20px' }}>
            
            <Card style={{ padding: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column'}}>
              <Typography variant="h6" align="left" style={{ color: 'black', fontWeight: 'bold', marginRight: '8px' , marginBottom: '1rem', fontSize: '1.5rem' }}>Ingredients </Typography>
              <img src={ingredients} alt="ingredients" style={{ width: '70px', height: '50px', marginBottom: '1rem' , align: 'left'}} />
              </div>
              <Typography  align="left" marginBottom={3} >{productData.ingredients_text_en || 'No ingredients information available.'}</Typography>
              </Card>
              <Card style={{ padding: '20px', marginTop: '10px' }}><div style={{ display: 'flex', flexDirection: 'column'}}>
              <Typography  align="left" variant="h6" style={{ color: 'black', fontWeight: 'bold', marginRight: '8px' , fontSize: '1.5rem' }}>
                Allergens
              </Typography>
              <img src={allergy} alt="ingredients" style={{ width: '70px', height: '70px', marginBottom: '1rem' , align: 'left'}} />
              </div><Typography  align="left" marginBottom={2}>{productData.allergens || 'N/A'}</Typography>
              </Card>
          </Grid>

          <Grid item xs={12}>
            <Card style={{ padding: '20px' }}>
              <Typography variant="h6"  align="left" style={{ color: 'black', fontWeight: 'bold', marginRight: '8px' , marginBottom: '1rem', fontSize: '1.5rem' }}>Nutrient Levels</Typography>
              <Grid container spacing={2}>
                {Object.entries(productData.nutrient_levels || {}).map(([key, value]) => (
                  <Grid item xs={6} md={3} key={key}>
                    <Typography  align="left"><strong>{key.replace(/_/g, ' ')}:</strong> {value || 'N/A'}</Typography>
                  </Grid>
                ))}
              </Grid>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card style={{ padding: '20px' }}>
              <Typography  align="left" variant="h6">Nutrient Analysis</Typography>
              {renderNutrientChart()}
            </Card>
          </Grid>
        </Grid>
      )}
    </Paper>
  );
};

export default ProductScan;
