const Product = require('../models/product');

const dbConnect = require('../config/database');


// json data to populate the database
const data = require('../data/products.json');

// settting up the dotenv
require('dotenv').config({ path: './config/config.env'});

// connet to db
dbConnect();

const seedProductsToDb = async()=> {
    try{
        await Product.deleteMany();
        console.log(`Response -----> Products deleted`);

        await Product.insertMany(data);
        console.log(`Success ------> Products added to database`)

        process.exit();
    } catch(err){
        console.log(err.message);
        process.exit();
    }
}

seedProductsToDb()