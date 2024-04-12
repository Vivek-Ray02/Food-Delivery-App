const mongoose = require('mongoose');
const mongoURI = [Your MongoDB URl];

const Schema = mongoose.Schema;
const mySchema = new Schema({
  
  CategoryName: String,  
  name: String,
  img:{
    data: Buffer,
    contentType: String
    },
  options:Array,
  description:String,
  
});

const catschema= new Schema({
  CategoryName:String
});

const FoodItem = mongoose.model('Food_item',mySchema,'Food_items');
const Foodcategory = mongoose.model('Food_Category',catschema,'Food_category');

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const data = await FoodItem.find({});
    const Catdata= await Foodcategory.find({});

    console.log('Fetched Data:');

    global.Food_items = data;
    global.Food_category=Catdata;

    console.log("connected to mongo")
    const foodCollection = await mongoose.connection.db.collection("Food_items");
    foodCollection.find({}).toArray(async function (err, data) {
        const categoryCollection = await mongoose.connection.db.collection("Food_category");
        categoryCollection.find({}).toArray(async function (err, Catdata) {
            callback(err, data, Catdata);
        })});


  } catch (error) {
    console.error('Error:', error);
  } 
};

module.exports = mongoDB;





