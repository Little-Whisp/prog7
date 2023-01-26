const express = require ("express");
const bodyParser = require('body-parser')

//Load enviroment variables
require('dotenv').config()

//test
console.log(process.env.BASE_URI);

// Import the mongoose module
const mongoose = require("mongoose");

// Set up default mongoose connection
const mongoDB = "mongodb://127.0.0.1/my_database";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

//create webserver
const app = express();

//use bodyparser middleware to parse x-form-www-urlencoded
app.use(bodyParser.urlencoded ({extended: true}));
//use bodyparser middleware to parse json data
app.use(bodyParser.json ({type:'application/json'}))

//create endpoint and connect to products router
app.use("/products/", require('./routers/productsRouter'))
//req.body. {object met params}
const productsRouter = require("./routers/productsRouter");

//create route
app.use("/", productsRouter);


//Start webserver on port 8000
app.listen(8000, () => {
    console.log("Express started")
})
