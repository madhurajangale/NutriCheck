// import React, { useState } from "react";
// import axios from "axios";
// import { useAuth } from "../context/AuthContext";
// export default function MonthlyDiet() {
//   const [products, setProducts] = useState([{ name: "", weight: "" }]);
//   const [productData, setProductData] = useState({});
//    const { user } = useAuth();
//   const [totals, setTotals] = useState({
//     protein: 0,
//     carbohydrates: 0,
//     sodium: 0,
//     sugars: 0,
//   });
//   const [optimalValues, setOptimalValues] = useState({
//     protein: 0,
//     carbohydrates: 0,
//     sodium: 0,
//     sugars: 0,
//   });
// /*************  ✨ Codeium Command ⭐  *************/


// /******  b08616ee-ba7c-45d6-a296-1d8656baa75d  *******/
//   const handleAddProduct = () => {
//     setProducts([...products, { name: "", weight: "" }]);
//   };

//   const handleChange = (index, field, value) => {
//     const updatedProducts = [...products];
//     updatedProducts[index][field] = value;
//     setProducts(updatedProducts);
//   };
//   const calculateOptimalNutrients = (bmi,weight) => {
//     let calories = 0;
//     if (bmi < 18.5) {
//       calories = 2500; 
//     } else if (bmi < 24.9) {
//       calories = 2000; 
//     } else if (bmi < 29.9) {
//       calories = 1800; 
//     } else {
//       calories = 1500; 
//     }
//      console.log(weight)
//     const carbs = (calories * 0.55) / 4; 
//     const protein = 0.8*weight; 
//     const fats = (calories * 0.25) / 9; 
//     const sodium = 2300; 
//     const sugars = 25; 
  
//     return {
//       carbohydrates: carbs,
//       protein: protein,
//       sodium: sodium / 1000, 
//       sugars: sugars,
//     };
//   };
//   const fetchProductData = async (productName) => {
//     try {
//         const url1 = `http://127.0.0.1:8000/api/user/profile/${user}`
//         const response1 = await axios.get(url1);
//         console.log(response1)
        
//         const weight=response1.data.data.weight
//           const height=response1.data.data.height
//           const bmi = weight / ((height / 100) ** 2);
//           setOptimalValues(calculateOptimalNutrients(bmi,weight));
          
//           console.log(weight)
//           console.log(height)
//           console.log(bmi)

          
//       const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${productName}&search_simple=1&action=process&json=1`;
//       const response = await axios.get(url);
//       console.log(response)
//       if (response.status === 200) {
//         const data = response.data;
//         return data.products || [];
//       } else {
//         console.error("Error fetching data for:", productName);
//         return [];
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       return [];
//     }
//   };

//   const handleFetchData = async () => {
//     const fetchedData = {};
//     let totalProtein = 0;
//     let totalCarbohydrates = 0;
//     let totalSodium = 0;
//     let totalSugars = 0;
  
//     for (const product of products) {
//       if (product.name) {
//         const data = await fetchProductData(product.name);
//         fetchedData[product.name] = data;
  
        
//         data.forEach((item) => {
//           if (item.nutriments) {
//             const productWeight = parseFloat(item.quantity) || 100;
//             const userWeight = parseFloat(product.weight) || 0;
  
            
//             totalProtein += calculateNutrientWeight(item.nutriments.proteins, userWeight, productWeight);
//             totalCarbohydrates += calculateNutrientWeight(item.nutriments.carbohydrates, userWeight, productWeight);
//             totalSodium += calculateNutrientWeight(item.nutriments.sodium, userWeight, productWeight);
//             totalSugars += calculateNutrientWeight(item.nutriments.sugars, userWeight, productWeight);
//           }
//         });
//       }
//     }
  
//     setProductData(fetchedData);
//     setTotals({
//       protein: totalProtein,
//       carbohydrates: totalCarbohydrates,
//       sodium: totalSodium,
//       sugars: totalSugars,
//     });
//   };
  
  

//   const calculateNutrientWeight = (nutrientValue = 0, userWeight = 0, productWeight = 100) => {
//     return productWeight > 0 ? (nutrientValue * userWeight) / productWeight : 0;
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold mb-4">Monthly Diet Plan</h1>

//       {/* Input Section */}
//       {products.map((product, index) => (
//         <div key={index} className="flex items-center gap-4 mb-3">
//           <input
//             type="text"
//             placeholder="Product Name"
//             value={product.name}
//             onChange={(e) => handleChange(index, "name", e.target.value)}
//             className="p-2 border rounded-md"
//           />
//           <input
//             type="number"
//             placeholder="Weight (g)"
//             value={product.weight}
//             onChange={(e) => handleChange(index, "weight", e.target.value)}
//             className="p-2 border rounded-md"
//           />
//           <button
//             type="button"
//             onClick={handleAddProduct}
//             className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//           >
//             +
//           </button>
//         </div>
//       ))}

//       <button
//         onClick={handleFetchData}
//         className="mt-4 p-2 bg-green-500 text-white rounded-md hover:bg-green-600"
//       >
//         Fetch Product Data
//       </button>

//       {/* Display Section */}
//       <h2 className="text-lg font-bold mt-6">Fetched Product Data:</h2>
//       <div className="mt-4">
//         {Object.keys(productData).length > 0 ? (
//           Object.entries(productData).map(([name, data]) => (
//             <div key={name} className="mb-4">
//               <h3 className="font-bold text-blue-500">{name}:</h3>
//               {data.length > 0 ? (
//                 data.slice(0, 1).map((item, index) => (
//                   <div key={index}>
//                     <h4 className="font-semibold mt-2">Product Details:</h4>
//                     <ul className="list-disc list-inside">
//                       <li>Quantity: {item.quantity || "No Quantity Available"}</li>
//                     </ul>

//                     <h4 className="font-semibold mt-2">Nutriments:</h4>
//                     <ul className="list-disc list-inside">
//                       {item.nutriments &&
//                         Object.entries(item.nutriments).map(([key, value], idx) => {
//                           const productWeight = parseFloat(item.quantity) || 100;
//                           const userWeight = parseFloat(
//                             products.find((p) => p.name === name)?.weight || 0
//                           );
//                           const calculatedValue = calculateNutrientWeight(value, userWeight, productWeight);

//                           return (
//                             <li key={idx}>
//                               {key}: {calculatedValue.toFixed(2)} (calculated from {value} per {productWeight}g)
//                             </li>
//                           );
//                         })}
//                     </ul>
//                     <ul className="list-disc list-inside">
//                       {["carbohydrates", "proteins", "sodium", "sugars"].map((key) => {
//                         const nutrientValue = item.nutriments[key] || 0;
//                         const productWeight = parseFloat(item.quantity) || 100;
//                         const userWeight = parseFloat(
//                           products.find((p) => p.name === name)?.weight || 0
//                         );
//                         const calculatedValue = calculateNutrientWeight(
//                           nutrientValue,
//                           userWeight,
//                           productWeight
//                         );

//                         return (
//                           <li key={key}>
//                             {key.charAt(0).toUpperCase() + key.slice(1)}:{" "}
//                             {calculatedValue.toFixed(2)}g (calculated from {nutrientValue}g per {productWeight}g)
//                           </li>
//                         );
//                       })}
//                     </ul>
//                   </div>
//                 ))
//               ) : (
//                 <p>No data available for this product.</p>
//               )}
//             </div>
//           ))
//         ) : (
//           <p>No product data fetched yet.</p>
//         )}
//       </div>
//       <div className="mt-6">
//           <h4 className="font-bold text-lg">Total Nutrients for All Products:</h4>
//           <ul className="list-disc list-inside">
//             <li>Protein: {totals.protein.toFixed(2)}g</li>
//             <li>Carbohydrates: {totals.carbohydrates.toFixed(2)}g</li>
//             <li>Sodium: {totals.sodium.toFixed(2)}g</li>
//             <li>Sugars: {totals.sugars.toFixed(2)}g</li>
//           </ul>
//         </div>
//         <div className="mt-6">
//         <h2 className="text-lg font-bold">Optimal Nutrient Intake:</h2>
//         <ul className="list-disc list-inside">
//           <li>Protein: {optimalValues.protein.toFixed(2)}g</li>
//           <li>Carbohydrates: {optimalValues.carbohydrates.toFixed(2)}g</li>
//           <li>Sodium: {optimalValues.sodium.toFixed(2)}g</li>
//           <li>Sugars: {optimalValues.sugars.toFixed(2)}g</li>
//         </ul>
//       </div>
//     </div>
//   );
// }







import React, { useState } from "react"
import axios from "axios"
import { useAuth } from "../context/AuthContext"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
import "../styles/MonthlyDiet.css"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const NutrientChart = ({ actualValues, optimalValues }) => {
  const data = {
    labels: ["Protein", "Carbohydrates", "Sodium", "Sugars"],
    datasets: [
      {
        label: "Actual Intake",
        data: [actualValues.protein, actualValues.carbohydrates, actualValues.sodium, actualValues.sugars],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Optimal Intake",
        data: [optimalValues.protein, optimalValues.carbohydrates, optimalValues.sodium, optimalValues.sugars],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  }

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  return <Bar data={data} options={options} />
}

function MonthlyDiet() {
  const [products, setProducts] = useState([{ name: "", weight: "" }])
  const [productData, setProductData] = useState({})
  const { user } = useAuth()
  const [totals, setTotals] = useState({
    protein: 0,
    carbohydrates: 0,
    sodium: 0,
    sugars: 0,
  })
  const [optimalValues, setOptimalValues] = useState({
    protein: 0,
    carbohydrates: 0,
    sodium: 0,
    sugars: 0,
  })

  const handleAddProduct = () => {
    setProducts([...products, { name: "", weight: "" }])
  }

  const handleChange = (index, field, value) => {
    const updatedProducts = [...products]
    updatedProducts[index][field] = value
    setProducts(updatedProducts)
  }

  const calculateOptimalNutrients = (bmi, weight) => {
    let calories = 0
    if (bmi < 18.5) {
      calories = 2500
    } else if (bmi < 24.9) {
      calories = 2000
    } else if (bmi < 29.9) {
      calories = 1800
    } else {
      calories = 1500
    }

    const carbs = (calories * 0.55) / 4
    const protein = 0.8 * weight
    const sodium = 2300 / 1000
    const sugars = 25

    return {
      carbohydrates: carbs,
      protein: protein,
      sodium: sodium,
      sugars: sugars,
    }
  }

  const fetchProductData = async (productName) => {
    try {
      const url1 = `http://127.0.0.1:8000/api/user/profile/${user}`
      const response1 = await axios.get(url1)

      const weight = response1.data.data.weight
      const height = response1.data.data.height
      const bmi = weight / (height / 100) ** 2
      setOptimalValues(calculateOptimalNutrients(bmi, weight))

      const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${productName}&search_simple=1&action=process&json=1`
      const response = await axios.get(url)
      if (response.status === 200) {
        const data = response.data
        return data.products || []
      } else {
        console.error("Error fetching data for:", productName)
        return []
      }
    } catch (error) {
      console.error("Error fetching data:", error)
      return []
    }
  }

  const handleFetchData = async () => {
    const fetchedData = {}
    let totalProtein = 0
    let totalCarbohydrates = 0
    let totalSodium = 0
    let totalSugars = 0

    for (const product of products) {
      if (product.name) {
        const data = await fetchProductData(product.name)
        fetchedData[product.name] = data

        data.forEach((item) => {
          if (item.nutriments) {
            const productWeight = Number.parseFloat(item.quantity) || 100
            const userWeight = Number.parseFloat(product.weight) || 0

            totalProtein += calculateNutrientWeight(item.nutriments.proteins, userWeight, productWeight)
            totalCarbohydrates += calculateNutrientWeight(item.nutriments.carbohydrates, userWeight, productWeight)
            totalSodium += calculateNutrientWeight(item.nutriments.sodium, userWeight, productWeight)
            totalSugars += calculateNutrientWeight(item.nutriments.sugars, userWeight, productWeight)
          }
        })
      }
    }

    setProductData(fetchedData)
    setTotals({
      protein: totalProtein,
      carbohydrates: totalCarbohydrates,
      sodium: totalSodium,
      sugars: totalSugars,
    })
  }

  const calculateNutrientWeight = (nutrientValue = 0, userWeight = 0, productWeight = 100) => {
    return productWeight > 0 ? (nutrientValue * userWeight) / productWeight : 0
  }

  return (
    <div className="monthly-diet">
      <h1>Monthly Diet Plan</h1>

      <div className="product-inputs">
        {products.map((product, index) => (
          <div key={index} className="product-input">
            <input
              type="text"
              placeholder="Product Name"
              value={product.name}
              onChange={(e) => handleChange(index, "name", e.target.value)}
            />
            <input
              type="number"
              placeholder="Weight (g)"
              value={product.weight}
              onChange={(e) => handleChange(index, "weight", e.target.value)}
            />
            <button type="button" onClick={handleAddProduct} className="add-product">
              +
            </button>
          </div>
        ))}
      </div>

      <button onClick={handleFetchData} className="fetch-data">
        Fetch Product Data
      </button>

      <div className="product-data">
        <h2>Fetched Product Data:</h2>
        {Object.keys(productData).length > 0 ? (
          Object.entries(productData).map(([name, data]) => (
            <div key={name} className="product-item">
              <h3>{name}:</h3>
              {data.length > 0 ? (
                data.slice(0, 1).map((item, index) => (
                  <div key={index}>
                    <h4>Product Details:</h4>
                    <ul>
                      <li>Quantity: {item.quantity || "No Quantity Available"}</li>
                    </ul>

                    <h4>Nutriments:</h4>
                    <ul>
                      {["carbohydrates", "proteins", "sodium", "sugars"].map((key) => {
                        const nutrientValue = item.nutriments[key] || 0
                        const productWeight = Number.parseFloat(item.quantity) || 100
                        const userWeight = Number.parseFloat(products.find((p) => p.name === name)?.weight || 0)
                        const calculatedValue = calculateNutrientWeight(nutrientValue, userWeight, productWeight)

                        return (
                          <li key={key}>
                            {key.charAt(0).toUpperCase() + key.slice(1)}: {calculatedValue.toFixed(2)}g (calculated from{" "}
                            {nutrientValue}g per {productWeight}g)
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                ))
              ) : (
                <p>No data available for this product.</p>
              )}
            </div>
          ))
        ) : (
          <p>No product data fetched yet.</p>
        )}
      </div>

      <div className="nutrient-summary">
        <h2>Nutrient Summary</h2>
        <div className="nutrient-chart">
          <NutrientChart actualValues={totals} optimalValues={optimalValues} />
        </div>
        <div className="total-nutrients">
          <h3>Total Nutrients for All Products:</h3>
          <ul>
            <li>Protein: {totals.protein.toFixed(2)}g</li>
            <li>Carbohydrates: {totals.carbohydrates.toFixed(2)}g</li>
            <li>Sodium: {totals.sodium.toFixed(2)}g</li>
            <li>Sugars: {totals.sugars.toFixed(2)}g</li>
          </ul>
        </div>
        <div className="optimal-nutrients">
          <h3>Optimal Nutrient Intake:</h3>
          <ul>
            <li>Protein: {optimalValues.protein.toFixed(2)}g</li>
            <li>Carbohydrates: {optimalValues.carbohydrates.toFixed(2)}g</li>
            <li>Sodium: {optimalValues.sodium.toFixed(2)}g</li>
            <li>Sugars: {optimalValues.sugars.toFixed(2)}g</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default MonthlyDiet

