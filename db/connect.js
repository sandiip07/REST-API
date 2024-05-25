const mongoose = require('mongoose')

// connnect the database to the mongodb
const connectDB = (uri) => {
    console.log("coonect database");
    return mongoose.connect(uri,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
}

module.exports = connectDB;