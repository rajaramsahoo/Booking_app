import React from "react";
import Layout from "../components/layout/Layout";
import { useAuth } from "../context/authContext.js";

const Homepage = () => {
  const [auth, setAuth] = useAuth();
  return (
    <Layout title={"Best Offers"}>
      <h1>Homepage</h1>
      <pre>{JSON.stringify(auth,null,4)}</pre>
    </Layout>
  );
};

export default Homepage;
