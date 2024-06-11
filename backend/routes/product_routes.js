const express = require('express');
const multer = require('multer');
const ProductModel = require('../models/product_model');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/', (req, res) => {
    ProductModel.find()
        .then(products => {
            const updatedProducts = products.map(product => {
                if (product.Image) {
                    const imageBase64 = product.Image.toString('base64');
                    return { ...product.toObject(), Image: imageBase64 };
                }
                return product;
            });
            res.json(updatedProducts);
        })
        .catch(err => {
            console.error("Error fetching products:", err);
            res.status(500).json({ error: "Error fetching products" });
        });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    ProductModel.findById(id)
        .then(product => {
            if (product) {
                if (product.Image) {
                    const imageBase64 = product.Image.toString('base64');
                    const updatedProduct = { ...product.toObject(), Image: imageBase64 };
                    res.json(updatedProduct);
                } else {
                    res.json(product);
                }
            } else {
                res.status(404).json({ error: "Product not found" });
            }
        })
        .catch(err => {
            console.error("Error fetching product:", err);
            res.status(500).json({ error: "Error fetching product" });
        });
});

router.post('/', upload.single('Image'), (req, res) => {
    const { Name, Price, Category, SubCategory } = req.body;
    const Image = req.file ? req.file.buffer : null;

    const newProduct = new ProductModel({
        Name,
        Price,
        Category,
        SubCategory,
        Image
    });

    newProduct.save()
        .then(product => res.status(201).json(product))
        .catch(err => {
            console.error("Error saving product:", err);
            res.status(400).json(err);
        });
});

module.exports = router;
