import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Contact() {
    return (
        <>
            <Header />
            <div class="card m-3 mb-3">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="assets/contact.jpg" class="img-fluid rounded p-1" alt="..." />
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h1 class="card-title text-center">Contact us</h1>
                            <form class="card-text">
                                <strong class="d-block mb-1">Name:</strong>
                                <input type="text" class="form-control" />
                                <strong class="d-block mb-1">E-mail:</strong>
                                <input type="text" class="form-control" />
                                <strong class="d-block mb-1">Message:</strong>
                                <textarea class="form-control" rows="5"></textarea>
                                <button class="btn contrast mt-3 p-2 form-control">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}