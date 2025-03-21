const dotenv = require('dotenv');
const mongoose = require('mongoose')
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);
const app = require('./app');

mongoose.connect(DB,{
  useNewUrlParser:true,
  useCreateIndex:true,
  useFindAndModify:false,
  useUnifiedTopology:true
}).then(() =>{
  console.log('DB connection successful!')
})

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});
const Tour = mongoose.model('Tour', tourSchema);
const testTour = new Tour({
  name: 'The Park Camper',
  price: 997,
  rating: 4.6
});

testTour.save().then(doc => {
  console.log(doc)
}).catch(err => {
  console.log('Error:', err)
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
