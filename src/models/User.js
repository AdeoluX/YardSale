const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'customer'],
    default: 'customer',
  },
  order: [
    {
        type: Schema.Types.ObjectId,
        ref: 'Order'
    }
  ],
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

const User = mongoose.model('User', UserSchema);

module.exports = User;