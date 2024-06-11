import Header from '../components/Header'
import Footer from '../components/Footer'
import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
    const categories = {
        Men: ['Pant', 'Shirt', 'Hoodie'],
        Women: ['Pant', 'Skirt', 'Dress'],
        Kids: ['Boys', 'Girls']
    };

    const mainCategories = Object.keys(categories);

    const [form, setForm] = useState({
        name: '',
        price: '',
        category: mainCategories[0],
        subCategory: '',
        image: null
    });

    const [error, setError] = useState('');

    const handleCategoryChange = (event) => {
        const selected = event.target.value;
        setForm({
            ...form,
            category: selected,
            subCategory: ''
        });
    };

    const handleSubCategoryChange = (event) => {
        setForm({
            ...form,
            subCategory: event.target.value
        });
    };

    const handleImageChange = (event) => {
        setForm({
            ...form,
            image: event.target.files[0]
        });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validation
        if (!form.name || !form.price || !form.category || !form.subCategory || !form.image) {
            setError('All fields are required.');
            return;
        }

        const formData = new FormData();
        formData.append('Name', form.name);
        formData.append('Price', form.price);
        formData.append('Category', form.category);
        formData.append('SubCategory', form.subCategory);
        formData.append('Image', form.image);

        try {
            const response = await axios.post('http://localhost:5500/addProduct', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            console.log('Product added:', response.data);
            
            // Reset the form after successful submission
            setForm({
                name: '',
                price: '',
                category: mainCategories[0],
                subCategory: '',
                image: null
            });
            setError(''); // Clear any existing error
        } catch (error) {
            console.error('There was an error adding the product:', error);
            setError('There was an error adding the product. Please try again.');
        }
    };

    return (
        <>
        <Header />
        <div className="container my-3" style={{ maxWidth: '700px' }}>
            <div className="card-body">
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                
                <strong className="d-block mb-2">Product Name:</strong>
                <input name="name" type="text" placeholder="Enter product name" className="form-control" value={form.name} onChange={handleInputChange} />

                <strong className="d-block mb-2">Price:</strong>
                <input name="price" type="number" placeholder="Enter product price" className="form-control" value={form.price} onChange={handleInputChange} />

                <strong className="d-block mb-2">Select Category</strong>
                <select className="form-select" name="category" value={form.category} onChange={handleCategoryChange}>
                    {mainCategories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))}
                </select>

                <strong className="d-block mb-2">Select Sub-Category</strong>
                <select className="form-select" name="subCategory" value={form.subCategory} onChange={handleSubCategoryChange}>
                    <option value="" disabled>Select sub-category</option>
                    {categories[form.category].map((subCategory, index) => (
                        <option key={index} value={subCategory}>{subCategory}</option>
                    ))}
                </select>

                <strong className="d-block mb-2">Upload Image</strong>
                <input type="file" className="form-control" onChange={handleImageChange} />

                <button className="btn contrast mt-3 p-2 form-control" onClick={handleSubmit}>Add Product</button>
            </div>
        </div>
        <Footer />
        </>
    );
};

export default AddProduct;
