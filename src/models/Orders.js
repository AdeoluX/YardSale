const mongoose = require('mongoose');

const { Schema } = mongoose;

const OrderSchema = new Schema({
    status: {
        type: String,
        enum: ['ongoing', 'enroute', 'delivered'],
        default: 'ongoing',
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    amount: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    quantity: Number,
    address: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
},
{
// Define the toJSON option
toJSON: {
    transform: function (doc, ret) {
    // Exclude sensitive information like the password
    delete ret.password;
    },
    versionKey: false, // Exclude the version key, "__v"
},
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;