import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Contact() {
    return (
        <>
            <Header />
            <div className="card m-3 mb-3">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src="assets/contact.jpg" className="img-fluid rounded p-1" alt="..." />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h1 className="card-title text-center">Contact us</h1>
                            <form className="card-text">
                                <strong className="d-block mb-1">Name:</strong>
                                <input type="text" className="form-control" />
                                <strong className="d-block mb-1">E-mail:</strong>
                                <input type="text" className="form-control" />
                                <strong className="d-block mb-1">Message:</strong>
                                <textarea className="form-control" rows="5"></textarea>
                                <button className="btn contrast mt-3 p-2 form-control">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}