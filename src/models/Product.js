const mongoose = require('mongoose');
const { Schema } = mongoose;


const ProductSchema = new Schema({
    image: [String],
    quantity: Number,
    name: String,
    amount: Number,
    description: String,
    tags: [
        {
            type: String
        }
    ],
    colors: [{
        type: String
    }],
    sizes: [{
        type: String
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;