// var mongoose = require('mongoose');
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
const mongo = mongoose
  .connect(
    `mongodb+srv://tayotasks:${process.env.MONGO_PASSWORD}@cluster0.wuxfhgs.mongodb.net/?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((con) => console.log('DB connected Dont lose focus!'))
  .catch((e) => console.log(e));

module.exports = mongo;