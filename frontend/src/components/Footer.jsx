import { Link } from "react-router-dom"
export default function Footer() {
  return (
    <footer className="bg-dark text-white pt-5 pb-4">
      <div className="container text-center text-md-left">
        <div className="row text-center text-md-left">

          <div className="col-md-3 mx-auto mt-3">
            <Link to="/products?category=Men"><h5>Men</h5></Link>
            <Link to="/products?category=Men&subCategory=Shirt"><p>Shirts</p></Link>
            <Link to="/products?category=Men&subCategory=Pant"><p>Pants</p></Link>
            <Link to="/products?category=Men&subCategory=Hoodie"><p>Hoodies</p></Link>
          </div>

          <div className="col-md-3 mx-auto mt-3">
            <Link to="/products?category=Women"><h5>Women</h5></Link>
            <Link to="/products?category=Women&subCategory=Dress"><p>Dresses</p></Link>
            <Link to="/products?category=Women&subCategory=Skirt"><p>Skirts</p></Link>
            <Link to="/products?category=Women&subCategory=Pant"><p>Pants</p></Link>
          </div>

          <div className="col-md-3 mx-auto mt-3">
            <Link to="/products?category=Kids"><h5>Kids</h5></Link>
            <Link to="/products?category=Kids&subCategory=Boys"><p>Boys</p></Link>
            <Link to="/products?category=Kids&subCategory=Girls"><p>Girls</p></Link>
          </div>
          <div className="col-md-3 mx-auto mt-3">
            <h5>Links</h5>
            <Link to="/"><p>Home</p></Link>
            <Link to="/login"><p>Login</p></Link>
            <Link to="/contact"><p>Contact</p></Link>
          </div>
        </div>
      </div>
      <hr />
      <p className="text-center h6">© Copyright ~ Ayush Gupta</p>
    </footer>
  )
}