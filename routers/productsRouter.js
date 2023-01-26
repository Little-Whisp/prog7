//product router
const express = require("express");

const Product = require("../models/productsModel");

//create router
const router = express.Router();
const {application} = require("express");


//collection: GET /
router.get("/", async(req, res) => {
    if (req.header("Accept") === "application/json") {
        console.log("GET");
    try {
        let products = await Product.find();

        //create representation for collection as requested in assignment
        // items, _links, pagination

        let productsCollection = {
            items: products,
            _links: {
                self: {
                    href: `${process.env.BASE_URI}products/`
                },
                collection: {
                    href: `${process.env.BASE_URI}products/`
                }
            },
            pagination: {
                "currentPage": 1,
                "currentItems": 3,
                "totalPages": 1,
                "totalItems": 3,
                "_links": {
                    "first": {"page": 1, "href": "http://test.nl/?start=1&limit=10"}
                }
            }
        }
        res.json(productsCollection);
    } catch {
        // no response from db
        res.status(415).send()
    }

}else {
        res.status(415).send();
    }
})



//detail: GET/id
router.get("/:id", async (req, res) => {
        console.log(`GET request for item ${req.params.id}`);

    try {
        let product = await Product.findById(req.params.id);
        if (product === null) {
            res.status(404).send();
        }
            res.json(product)
    } catch {
        res.status(404).send()
    }
})


// //Details: Put
router.put('/:id', async (req, res) => {
    console.log(`PUT request for item ${req.params.id}`);

        let updatedProduct = {}
          updatedProduct.title =  req.body.title
          updatedProduct.description = req.body.description
          updatedProduct.prize = req.body.prize
        try {

            if (updatedProduct.title && updatedProduct.description && updatedProduct.prize !== ""){
                await Product.findByIdAndUpdate(req.params.id, updatedProduct)
                res.status(201).send()
            }else{
                res.status(400).send();
            }

        } catch {
            res.status(500).send()
        }
});


// (POST) middleware checks header content-type
router.post("/",(req, res, next) => {
    console.log("POST middleware to check Content-Type")
    if(req.header("Content-Type") === "application/json" || "application/x-www-form-urlencoded") {
        next();

    } else {
        res.status(400).send();
    }
});


// (PUT) middleware checks header content-type
router.put("/:id",(req, res, next) => {
    console.log("PUT middleware to check Content-Type")
    if(req.header("Content-Type") === "application/json" || "application/x-www-form-urlencoded") {
        next();
    } else {
        res.status(400).send();
    }
});


//add middleware to disallow empty values
router.post("/",(req, res, next) => {
    console.log("POST middleware to check empty values")

    if (req.body.title && req.body.description && req.body.prize){
        next();
    } else {
        res.status(400).send()
    }
})


//add resource to collection: POST /
router.post("/", async(req, res) => {
    console.log("POST request for collection /");

    let product = new Product({
        title: req.body.title,
        description: req.body.description,
        prize: req.body.prize
    })
    try {
        await product.save();
        res.status(201).send();
        res.json(product);
    } catch {
        res.status(500).send();
    }
})


// options for collection: OPTIONS /
router.options("/", async(req, res) => {
    console.log(`OPTIONS request for details collection /`);
    res.header('Allow','GET, POST, OPTIONS');
    res.send();
})



// options for detail: OPTIONS /id
router.options("/:id", async(req, res) => {
    console.log(`OPTIONS request for details ${req.params.id}`);
    res.header('Allow','GET, PUT, DELETE, OPTIONS');
    res.send();
})


// //detail: Delete/id
router.delete("/:id", async (req, res) => {
    console.log(`DELETE request for details ${req.params.id}`);

    try {
        let product = await Product.findByIdAndDelete(req.params.id);

        res.status(204).send();

    } catch {
        res.status(404).send()
    }

})

//export router
module.exports = router;
