const product = require("../models/product");

const getAllProducts = async (req, res) => {

    // req.query = it get the user request from url
    const { company, name, featured, sort , select} = req.query

    //assign our main object as an empty object for further filling
    const queryObject = {};

    // access the data using their name and company , and it is totally case insensitive
    if (company) {
          //if user writes company name in the url then we will run this code
        queryObject.company = { $regex: company, options: "i" }
    }
    if (name) {
          //if user writes name in the url then we will run this code
        queryObject.name = { $regex: name, options: "i" }
    }

    // we store our data in a variable for further uses
    let apiData = product.find(queryObject)

    // select the data using thier specific key
    if (sort) {
          //if user writes sort in the url then we will run this code
        const sortFix = sort.split(",").join(" ")
        apiData = apiData.sort(sortFix)
    }

    // select the data using thier specific key
    if (select) {
        //if user writes select in the url then we will run this code
        const selectFix = select.split(",").join(" ")
        apiData = apiData.select(selectFix)
    } 


    // pagination 
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 3;

    // get the count of data which we will show to the user
    let skip = (page - 1) * limit

    // here we skip the previous data upon their limit and show next
    apiData = apiData.skip(skip).limit(limit)



    console.log(queryObject);

    //last we get data in json formate
    const myData = await apiData;
    res.status(200).json({ myData, nbHits:myData.length })

};
const getAllProductsTesting = async (req, res) => {

    try {
        // here find method is used to get all the data from our product.json
        myData = await product.find(req.query).select("name, company")
        res.status(200).json({ myData })
    } catch (error) {
        throw error
    }


};

module.exports = { getAllProducts, getAllProductsTesting }