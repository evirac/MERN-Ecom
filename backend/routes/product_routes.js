const express = require('express');
const multer = require('multer');
const ProductModel = require('../models/product_model');
const authMiddleware = require('../middleware/authMiddleware')

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

// Add a new review
router.post('/:productId/reviews', authMiddleware, async (req, res) => {
    try {
        const { rating, review } = req.body;
        const product = await ProductModel.findById(req.params.productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const newReview = {
            user: req.userId,
            rating,
            review
        };

        product.reviews.push(newReview);

        // Calculate average rating
        product.averageRating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

        await product.save();
        res.status(201).json({ message: 'Review added' });
    } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({ error: 'Error adding review' });
    }
});

// Get product reviews
router.get('/:productId/reviews', async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.productId).populate('reviews.user', 'fullName');

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(product.reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ error: 'Error fetching reviews' });
    }
});

module.exports = router;
