import React from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";
const Product = () => {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
      //   console.log(data);
    } catch (error) {
      console.error();
      toast.error("Something Wrong In Geeting All Products");
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout title={"All-products"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h3 className="text-center">ALL Product List</h3>
            <div className="d-flex flex-wrap">
              {products?.map((ele) => (
                <Link
                  to={`/dashboard/admin/product/${ele.slug}`}
                  key={ele._id}
                  className="product-link"
                >
                  <div className="card m-2" style={{ width: "18rem" }}>
                    <img
                      src={`/api/v1/product/product-photo/${ele._id}`}
                      className="card-img-top"
                      // className="product-img"
                      alt={ele.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{ele.name}</h5>
                      <p className="card-text">{ele.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Product;
