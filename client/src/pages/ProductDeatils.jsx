import React from "react";
import Layout from "../components/layout/Layout";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
// import { Prices } from "../components/Prices";
const ProductDeatils = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProduct(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"Deatils"}>
      {/* {JSON.stringify(product.category.name, null, 4)} */}
      <div className="row container mt-3">
        <div
          className="col-md-3"
          style={{
            width: "18rem",
            border: "1px solid lightgrey",
            borderRadius: "5px",
            marginLeft: "15px",
          }}
        >
          <img
            src={`/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            // className="product-img"
            alt={product.name}
          />
        </div>
        <div className="col-md-9 text-center">
          <h1>Product Deatails</h1>
          <h5>Name:{product.name}</h5>
          <h5>Description:{product.description}</h5>
          <h5>Price:{product.price}</h5>
          <h5>In Stock:{product.quantity}pc.</h5>
          <h5>Category:{product?.category?.name}</h5>
          <button className="btn btn-secondary ms-1">Add to Cart</button>
        </div>
      </div>

     
        <div className="row container m-2 ">
          <h6 className="text-center">Similar Product</h6>
          {relatedProduct.length < 1 && (<p className="text-center">No Similar Product</p>)}
          <div className="d-flex flex-wrap">
            {relatedProduct?.map((ele) => (
              <div
                className="card m-2"
                style={{ width: "18rem" }}
                key={ele._id}
              >
                <img
                  src={`/api/v1/product/product-photo/${ele._id}`}
                  className="card-img-top"
                  // className="product-img"
                  alt={ele.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{ele.name}</h5>
                  <p className="card-text">
                    {ele.description.substring(0, 30)}
                  </p>
                  <p className="card-text">${ele.price}</p>

                  <button className="btn btn-secondary ms-1">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
  
    </Layout>
  );
};

export default ProductDeatils;
