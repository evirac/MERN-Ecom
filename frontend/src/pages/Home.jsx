import Header from "../components/Header"
import SliderComponent from "../components/SliderComponent"
import Footer from "../components/Footer"
import '../css/bootstrap.min.css'
import "../css/Home.css"
export default function Home() {
    return (
        <>
            <Header />
            <div className="cover">
                <h1 className="text-center">
                    <img src="assets/logo.svg" alt="logo" />
                        NovaNest
                </h1>
                <figcaption className="blockquote-footer text-center">
                    Unleash Your Style, Conquer the Cosmos!  </figcaption>
            </div>
            <h1 className="text-center">Featured Products</h1>
            <SliderComponent />
            <Footer />
        </>
    )
}