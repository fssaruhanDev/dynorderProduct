let express = require('express');
let axios = require('axios')
let router = express.Router();


//----------------------------------------------
const product = require("../middleware/collections/Products")
const send = require("../middleware/functions/sender")

//----------------------------------------------


/* GET home page. */

router.post('/create/', async function(req, res, next) {

    const   {
        companyID,
        name,
        userID,
        categoryID,
        price,
        description,
        images,
        coverPhoto

    } = req.body
    const object = {
        companyID:companyID,
        name:name,
        userID:userID,
        categoryID:categoryID,
        price:price,
        description:description,
        images:images,
        coverPhoto:coverPhoto
    }
    const result = await product.insertProduct(object);
    send.Success(res,req,result)

});

router.post('/update/', async function(req, res, next) {
    
    const   {
        companyID,
        productID,
        name,
        userID,
        categoryID,
        price,
        description,
        images,
        coverPhoto
        
    } = req.body
    const object = {
        companyID:companyID,
        productID:productID,
        data:{
            name:name,
            userID:userID,
            categoryID:categoryID,
            price:price,
            description:description,
            images:images,
            coverPhoto:coverPhoto}
      
    }
    const result = await product.updateProduct(object);
    send.Success(res,req,result)
  
    
});

router.get('/find', async function(req, res, next) {
    const {
        companyid,
        name,
        categoryid,
        productid,
        type
    } = req.query;
    
    let result
    if (type == "categoryid"){
        let response = await axios(' https://apicat.dynorder.com/api/category/search/subcategories/id='+categoryid)
  
        const object ={
            companyID:companyid,
            categories:response.data.data
        }
        try {
            result = await product.findProductWithCategory(object)
        } catch (e) {
            console.log(e)
            result = e
        }
    
    }
    else if (type == "name")
    {
        const object ={
            companyID:companyid,
            name:name
        }
        try {
            result = await product.findProduct(object)
        } catch (e) {
            console.log(e)
            result = e
        }
    
    }else if (type == "all")
    {
        const object ={
            companyID:companyid,
            name:name
        }
        try {
            result = await product.findProductAllCategories(object)
        } catch (e) {
            console.log(e)
            result = e
        }
    
    }else if(type=="productid"){
        const object ={
            companyID:companyid,
            productID:productid
        }
        try {
            result = await product.findProductWithProductID(object)
        } catch (e) {
            console.log(e)
            result = e
        }
    }
    
    
    send.Success(res,req,result)

});

router.get('/find/carouselproduct', async function(req, res, next) {

    const   {
        productids,
        companyid
        
    } = req.query
    const temp = productids.split("%")
    const data = {
        productIDs : temp,
        companyID : companyid
    }
    
    
    const result = await product.findProductWithProductIDs(data)
    send.Success(res,req,result)
});

module.exports = router;