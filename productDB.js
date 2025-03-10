require("dotenv").config()
const connectDB = require("./db/connect")
const Product = require("./models/product")

const ProductJson = require("./products.json")

const start = async () => {
    try {
        // data are stored in our mongo db in the formate which we have specifies in the models
        await connectDB(process.env.MONGODB_URI)
        await Product.deleteMany()
        await Product.create(ProductJson)
        console.log("success");
    } catch (error) {
        console.log(error)
    }
}

start();