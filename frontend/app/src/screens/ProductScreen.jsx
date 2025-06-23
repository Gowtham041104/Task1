import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import {
  listProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../redux/actions/productAction';
import ProductList from './ProductList';
import ManageProductModal from '../components/ManageProductModal';

const ProductScreen = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setShowModal(true);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

const handleDeleteProduct = (id) => {
  if (window.confirm('Are you sure you want to delete this product?')) {
    dispatch(deleteProduct(id)).then(() => {
      dispatch(listProducts());  // Refresh product list after delete
    });
  }
};
const handleSaveProduct = (formData) => {
  if (selectedProduct) {
    dispatch(updateProduct(selectedProduct._id, formData))
      .then(() => {
        dispatch(listProducts()); // Refresh the product list
      });
  } else {
    dispatch(createProduct(formData))
      .then(() => {
        dispatch(listProducts()); // Refresh after create
      });
  }
  setShowModal(false);
};
  return (
    <div className="container mt-4">
      <h2 className="mb-4">Manage Product Features</h2>
      <Button className="mb-3" onClick={handleAddProduct}>
        Add Product
      </Button>

      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <ProductList
          products={products}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
        />
      )}

      <ManageProductModal
        show={showModal}
        onClose={() => setShowModal(false)}
        product={selectedProduct}
        onSave={handleSaveProduct}
      />
    </div>
  );
};

export default ProductScreen;
