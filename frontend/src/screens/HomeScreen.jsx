import React from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import axios from "axios";
import { useEffect, useState } from "react";

const HomeScreen = () => {
  const [products, setProduct] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get(`/api/products`);
      setProduct(data);
    };

    fetchProducts();
  }, []);

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((pro) => (
          <Col key={pro._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={pro} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
