import { Link } from "react-router-dom"
export default function Footer(){
    return(
        <footer className="bg-dark text-white pt-5 pb-4">
      <div className="container text-center text-md-left">
        <div className="row text-center text-md-left">
          <div className="col-md-3 mx-auto mt-3">
            <Link to="/products?category=Women"><h5>Women</h5></Link>
            <a href="Product.html"><p>Skirts</p></a>
            <a href="Product.html"><p>Dresses</p></a>
            <a href="Product.html"><p>Pants</p></a>
          </div>
          <div className="col-md-3 mx-auto mt-3">
            <Link to="/products?category=Men"><h5>Men</h5></Link>
            <Link to="/products?category=Men&subCategory=Shirt"><p>Shirts</p></Link>
            <Link to="/products?category=Men&subCategory=Pant"><p>Pants</p></Link>
            <Link to="/products?category=Men&subCategory=Hoodie"><p>Hoodies</p></Link>
          </div>
          <div className="col-md-3 mx-auto mt-3">
            <Link to="/products?category=Kids"><h5>Kids</h5></Link>
            <a href="Product.html"><p>Girls</p></a>
            <a href="Product.html"><p>Boys</p></a>
          </div>
          <div className="col-md-3 mx-auto mt-3">
            <h5>Links</h5>
            <a href="index.html"><p>Home</p></a>
            <a href="Login.html"><p>Login</p></a>
            <a href="Contact.html"><p>Contact</p></a>
          </div>
        </div>
      </div>
      <hr />
      <p className="text-center h6">© Copyright ~ Ayush Gupta</p>
    </footer>
    )
}