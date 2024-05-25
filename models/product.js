const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    price: {
        type: Number,
        required: [true, 'Price must be provided'],
    },
    featured: {
        type: Boolean,
        default: false,
    },
    rating: {
        type: Number,
        default: 4.9,
    },
    company: {
        type: String,
        enum: {
            values: ['apple', 'realme', 'dell', 'JBL', 'one plus'],
            message: '{VALUE} is not supported',
        },
    },
}, {timestamps: true});

module.exports = mongoose.model('Product', productSchema);
