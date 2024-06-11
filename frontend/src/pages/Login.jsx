import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Login() {
    return (
        <>
            <Header />
            <div className="container  my-3" style={{maxWidth: '700px'}}>
                <div className="card-body">
                    <strong className="d-block mb-2">Email:</strong>
                    <input id="email" type="email" placeholder="Enter your E-mail" className="form-control" />
                    <strong className="d-block mb-2" >Password:</strong>
                    <input type="password" id="password" placeholder="Enter your Password" className="form-control" />
                    <button className="btn contrast mt-3 p-2 form-control" id="submit-btn">Submit</button>
                </div>
                    <Link className="btn active mt-3" to='/register'>Not a member yet? Sign up.</Link>
            </div>
            <Footer />
        </>
    )
}