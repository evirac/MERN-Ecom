import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import styles from '../css/category.module.css';

export default function CategoryPage({ title, subcategories }) {
    return (
        <>
            <Header />
            <div className="container">
                <h1>{title}</h1>
                <div className="row">
                    {subcategories.map((subcategory, index) => (
                        <div className="col-lg-4 col-md-6 mb-4" key={index}>
                            <Link to={`/${title.toLowerCase()}/${subcategory.name}`}>
                                <div className={`card ${styles.category_card}`}>
                                    <div
                                        className={`card-body ${styles.card_body}`}
                                        style={{
                                            backgroundImage: `url(${subcategory.backgroundImage})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                        }}
                                    >
                                        <h5 className={`${styles.subcategory_label}`}>{subcategory.name}</h5>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
}
