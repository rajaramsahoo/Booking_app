import React from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { Helmet } from "react-helmet";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = (props) => {
  return (
    <div>
      <Helmet>
      <meta charSet="utf-8" />
        <meta name="description" content={props.description} />
        <meta name="keywords" content={props.keywords} />
        <meta name="author" content={props.author} />
        <title>{props.title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "80vh" }}>{props.children}     <ToastContainer /></main>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "Ecommerce app - shop now",
  description: "mern stack project",
  keywords: "mern,react,node,mongodb,express",
  author: "Rajaram Sahoo",
};

export default Layout;
