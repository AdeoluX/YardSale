const mongoose = require('mongoose');

const { Schema } = mongoose;

const TransactionSchema = new Schema({
    status: {
        type: String,
        enum: ['pending', 'failed', 'abadoned', 'successful'],
        default: 'pending',
    },
    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order'
    },
    amount: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reference: {
        type: String,
        unique: true,
        required: true,
    },
    currency: String,
    response: String,
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = Transaction;