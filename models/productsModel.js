// File: ./models/somemodel.js

// Require Mongoose
const mongoose = require("mongoose");

// Define a schema
//
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    title: String,
    description: String,
    prize: String,
}, {toJSON: {virtuals: true} })

//add virtual poperty to Product, to include (dynamic) links

ProductSchema.virtual('_links').get(

    function(){
        return {
            self: {
                href: `${process.env.BASE_URI}products/${this._id}`
            },
            collection: {
                href: `${process.env.BASE_URI}products/`
            }
        }
    }
)
// Export function to create "SomeModel" model class
module.exports = mongoose.model("Product", ProductSchema);