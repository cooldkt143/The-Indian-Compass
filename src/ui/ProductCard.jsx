import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-4">
      {product.images && (
        <img
          src={product.images[0]}
          alt={product.name}
          className="rounded-lg mb-4 w-full h-48 object-cover"
        />
      )}
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-600 text-sm mb-2">{product.description}</p>
      <p className="text-green-600 font-bold mb-2">₹{product.price}</p>
      <p className="text-xs text-gray-500">{product.state}</p>
    </div>
  );
};

export default ProductCard;
