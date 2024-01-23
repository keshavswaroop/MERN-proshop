import React from "react";
import { useParams } from "react-router-dom";

import { Link } from "react-router-dom";
import Ratings from "../components/Ratings";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
} from "react-bootstrap";

import { useEffect, useState } from "react";
import axios from "axios";

const ProductScreen = () => {
  const [product, setProducts] = useState([]);

  const { id: productId1 } = useParams();
  const productId = parseInt(productId1, 10);

  useEffect(() => {
    const fetchProductDetails = async () => {
      const { data } = await axios.get(`/api/products/${productId}`);
      setProducts(data);
    };

    fetchProductDetails();
  }, [productId]);

  // const product = products.find((p) => p._id === productId);
  // console.log(product);

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      <Row>
        <Col md={5}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h3>{product.name}</h3>
            </ListGroupItem>
            <ListGroupItem>
              <Ratings
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroupItem>
            <ListGroupItem>Description: {product.description}</ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup varient="flush">
              <ListGroupItem>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Status</Col>
                  <Col>
                    <strong>
                      {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                    </strong>
                  </Col>
                </Row>
              </ListGroupItem>
              <Button
                className="my-3 mx-5"
                disabled={product.countInStock === 0 ? true : false}
                type="button"
              >
                Add to Cart
              </Button>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
