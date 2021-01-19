import React from "react";
import ProductForm from "./product-form";
import ProductListTable from "./product-list-table";
import { useState } from "@wordpress/element";

const ProductEditView = ({ products = [], updateProducts = () => null }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState(undefined);
  const onEdit = productId => {
    setEditedProduct(products.find(product => product.id === productId));
    setIsEditing(true);
  };
  const onCreate = () => {
    setEditedProduct(undefined);
    setIsEditing(true);
  };
  const onProductUpdate = updatedProduct => {
    // filter existing product out of the products and then add incoming product to the array
    const updatedProducts = products.filter(
      product => product.id !== updatedProduct.id
    );
    updatedProducts.push(updatedProduct);
    updateProducts(updatedProducts);
    setEditedProduct(undefined);
    setIsEditing(false);
  };
  const onDelete = id => {
    const updatedProducts = products.filter(product => product.id !== id);
    updateProducts(updatedProducts);
  };
  return isEditing ? (
    <ProductForm product={editedProduct} onProductUpdate={onProductUpdate} />
  ) : (
    <ProductListTable
      products={products}
      onEdit={onEdit}
      onCreate={onCreate}
      onDelete={onDelete}
    />
  );
};

export default ProductEditView;
