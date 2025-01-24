import React, { useState } from 'react';
import axios from 'axios';
import DisplayRecommendations from './alternates';

const ProductInfo = () => {
  const [productName, setProductName] = useState('');
  const [productData, setProductData] = useState(null);
  const [error, setError] = useState('');

  const fetchProductData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/product', {
        params: { name: productName },
      });
      console.log(response);
      setProductData(response.data.products[0]); 
      setError('');
    } catch (err) {
      setProductData(null);
      setError(err.response?.data?.error || 'Something went wrong!');
    }
  };

  return (
    <div>
      <h1>Search Product</h1>
      <input
        type="text"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        placeholder="Enter product name"
      />
      <button onClick={fetchProductData}>Search</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {productData && (
        <div>
          <h2>Product Information</h2>
          <p><strong>Name:</strong> {productData.product_name || 'N/A'}</p>
          <p><strong>Brand:</strong> {productData.brands || 'N/A'}</p>
          <p><strong>Categories:</strong> {productData.categories || 'N/A'}</p>
          <p><strong>Eco-Score:</strong> {productData.ecoscore_grade?.toUpperCase() || 'N/A'}</p>
          <p><strong>Nutri-Score:</strong> {productData.nutriscore_grade?.toUpperCase() || 'N/A'}</p>
          <p><strong>Allergens:</strong> {productData.allergens || 'N/A'}</p>
          <p><strong>Food Groups:</strong> {productData.food_groups || 'N/A'}</p>
          <p><strong>Barcode:</strong> {productData.code || 'N/A'}</p>
          <p><strong>Countries Available:</strong> {productData.countries || 'N/A'}</p>
           <p><strong>Carbon Footprint</strong>{productData.ecoscore_data.agribalyse.co2_total}</p>
          <h3>Ingredients</h3>
          <p>{productData.ingredients_text_en || 'No ingredients information available.'}</p>

          <h3>Nutrient Levels</h3>
          <ul>
            {Object.keys(productData.nutrient_levels || {}).map((nutrient, index) => (
              <li key={index}>
                <strong>{nutrient.charAt(0).toUpperCase() + nutrient.slice(1)}:</strong> {productData.nutrient_levels[nutrient] || 'N/A'}
              </li>
            ))}
          </ul>

          <h3>Nutrient Levels Tags</h3>
          <ul>
            {productData.nutrient_levels_tags?.map((tag, index) => (
              <li key={index}>{tag}</li>
            ))}
          </ul>

          <h3>Nutrients</h3>
<ul>
  {Object.entries(productData.nutriments || {}).map(([key, value], index) => (
    <li key={index}>
      <strong>{key.replace(/_/g, ' ').toUpperCase()}:</strong> {value} {key.includes('energy') || key.includes('carbohydrates') || key.includes('fat') ? 'g' : ''}
    </li>
  ))}
</ul>


          <h3>Nutrients</h3>
          <ul>
            <li>Energy: {productData.nutriments?.['energy-kcal_100g']} kcal per 100g</li>
            <li>Carbohydrates: {productData.nutriments?.['carbohydrates_100g']} g per 100g</li>
            <li>Fat: {productData.nutriments?.['fat_100g']} g per 100g</li>
            <li>Saturated Fat: {productData.nutriments?.['saturated-fat_100g']} g per 100g</li>
            <li>Protein: {productData.nutriments?.['proteins_100g']} g per 100g</li>
            <li>Sugars: {productData.nutriments?.['sugars_100g']} g per 100g</li>
            <li>Fiber: {productData.nutriments?.['fiber_100g']} g per 100g</li>
            <li>Salt: {productData.nutriments?.['salt_100g']} g per 100g</li>
          </ul>

          {productData.image_url && (
            <div>
              <h3>Image</h3>
              <img src={productData.image_url} alt={productData.product_name} style={{ width: '200px' }} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};


export default ProductInfo;
