import React, { useState } from "react";

export default function Monthlydiet() {
  const [products, setProducts] = useState([{ name: "", weight: "" }]);

  const handleAddProduct = () => {
    setProducts([...products, { name: "", weight: "" }]);
  };

  const handleChange = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;
    setProducts(updatedProducts);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Monthly Diet Plan</h1>
      {products.map((product, index) => (
        <div key={index} className="flex items-center gap-4 mb-3">
          <input
            type="text"
            placeholder="Product Name"
            value={product.name}
            onChange={(e) => handleChange(index, "name", e.target.value)}
            className="p-2 border rounded-md"
          />
          <input
            type="text"
            placeholder="Weight"
            value={product.weight}
            onChange={(e) => handleChange(index, "weight", e.target.value)}
            className="p-2 border rounded-md"
          />
          <button
            type="button"
            onClick={handleAddProduct}
            className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            +
          </button>
        </div>
      ))}
    </div>
  );
}
