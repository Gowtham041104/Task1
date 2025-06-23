import React from 'react';
import { Card, Button } from 'react-bootstrap';

const ProductList = ({ products, onEdit, onDelete }) => {
  return (
    <div className="row">
      {products.map((product) => (
        <div className="col-md-4 mb-3" key={product._id}>
          <Card>
            <Card.Body>
              <Card.Title><strong>Product Name :</strong>{product.name}</Card.Title>
              <Card.Text>Description :{product.description}</Card.Text>
              <Card.Text>
                Status: {product.Status}
              </Card.Text>
              <Button
                variant="warning"
                size="sm"
                className="me-2"
                onClick={() => onEdit(product)}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => onDelete(product._id)}
              >
                Delete
              </Button>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
