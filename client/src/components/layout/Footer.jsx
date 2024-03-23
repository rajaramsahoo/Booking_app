import { Link } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <h4 className="text-center">All Right Reserved &copy; Rajamart</h4>
      <p className="p-tag">
        <Link to="/about">About</Link> |<Link to="/contact">Contact</Link>|
        <Link to="/policy">Privacy police</Link>
      </p>
    </div>
  );
};

export default Footer;
