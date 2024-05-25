require("dotenv").config()
const express = require("express");
const app = express();
const connectDB = require("./db/connect")// it returns a promise so will call it as a await method

const PORT = process.env.PORT || 5000;

const products_routes = require("./routes/products")

app.get("/", (req, res) => {
    res.send("yes i am get")
}) 

// middleware for our router
app.use("/api/products", products_routes)


const start = async () => {
    try {

        await connectDB(process.env.MONGODB_URI);

        app.listen(PORT, () => {
            console.log(`${PORT} yes i am live on this port`);
        })
    } catch (error) {
        throw error;
    }
}

start();
