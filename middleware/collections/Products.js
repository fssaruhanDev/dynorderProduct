
const db = require("../../database/connect")
const collection = "cls_Products";
const generate=require("../functions/generate")
const dates = require("date-and-time");

async function  insertProduct(object) {
    let images = []
    if (object.images.length!= null){
        let image={}
        image.path=object.coverPhoto
        image.sector="coverPhoto"
        images.push(image)
    }
    for (let i = 0; i <object.images.length ; i++) {
        let image={}
        image.path=object.images[i]
        image.sector="mini"+i
        images.push(image)
    }
   let productID =  generate.AutoID("product")
    let date_ob = new Date()
    let dateTime =  dates.format(date_ob, 'MM/DD/YYYY HH:mm:ss [GMT]Z')
    let data=[{
        "productID":productID,
        "companyID":object.companyID,
        "name":object.name,
        "userID":object.userID,
        "categoryID":object.categoryID,
        "price":object.price,
        "description":object.description,
        "images":images,
        "createDate" : dateTime,
        "updateTime" :"00.00.0000-00:00:00",
        "isActive":true,
        "isDelete":false
    }]
    let value
    console.log(data)
    await db.Create(data, collection)
        .then( function(response) {
            value = response
        }, function(error) {
            value =  error
        })
    let findValue
    
    const filter = {
        _id: value.insertedIds[0]
    }
    const options = {
    }
    const sort={}
    const limit = 1
    await db.Read(filter,options,sort,limit,collection)
        .then( function(response) {
            findValue = response
        }, function(error) {
            findValue =  error
        }).catch(function (e) {
            findValue = e
        })
    return findValue[0].productID
  
}

async function updateProduct(object){
    let date_ob = new Date()
    let dateTime =  dates.format(date_ob, 'MM/DD/YYYY HH:mm:ss [GMT]Z')
    const filter = {
        productID: object.productID
    }
    const options ={
    
    }
    const sort={}
    const limit = 100
    let value
    await db.Read(filter,options,sort,limit,collection)
        .then( function(response) {
            value = response
        }, function(error) {
            value =  error
        }).catch(function (e) {
            value = e
        })
    const lastObject = value[0]
    let data ={
        "updateTime":dateTime
    }
    for (const [key, value] of Object.entries(lastObject)) {
        data[key] = value;
    }
    for (const [key, value] of Object.entries(object.data)) {
        data[key] = (value != null ) ? value:data[key]
    }

    let objectData={
        $set:data
    }
    await db.Update(filter,objectData,options, collection)
        .then( function(response) {
            value = response
        }, function(error) {
            value =  error
        })
    console.log(value)
    return value
}

async function findProduct(object) {
    const filter = {
        companyID: object.companyID,
        name: {"$regex": ".*" + object.name + ".*", $options: 'i'},
    }
    ///.*/+filters.name+/.*/
    const options = {
        projection: {
            _id:0
        }
    }
    const sort={}
    const limit = 100
    let value
    await db.Read(filter,options,sort,limit,collection)
        .then( function(response) {
            value = response
        }, function(error) {
            value =  error
        }).catch(function (e) {
            value = e
        })
    return value
}

async function findProductWithCategory(object) {
    let categories = []

    for (let i = 0; i < object.categories.length; i++) {
     categories.push(object.categories[i].id)
    }
    const filter = {
        companyID: object.companyID,
        categoryID: {$in:categories}
    }
    ///.*/+filters.name+/.*/
    const options = {
        projection: {
            _id:0
        }
    }
    const sort={}
    const limit = 100
    let value
    await db.Read(filter,options,sort,limit,collection)
        .then( function(response) {
            value = response
        }, function(error) {
            value =  error
        }).catch(function (e) {
            value = e
        })
    return value
}

async function findProductAllCategories(object) {
    const filter = {
        companyID: object.companyID
    }
    ///.*/+filters.name+/.*/
    const options ={
        
        projection: {
            _id:0
        }
    }
    const sort={}
    const limit = 100
    let value
    await db.Read(filter,options,sort,limit,collection)
        .then( function(response) {
            value = response
        }, function(error) {
            value =  error
        }).catch(function (e) {
            value = e
        })
    return value
    
    
}

async function findProductWithProductID(object) {
    const filter = {
        companyID: object.companyID,
        productID: object.productID,
        
    }
    ///.*/+filters.name+/.*/
    const options ={
        
        projection: {
            _id:0
        }
    }
    const sort={}
    const limit = 100
    let value
    await db.Read(filter,options,sort,limit,collection)
        .then( function(response) {
            value = response
        }, function(error) {
            value =  error
        }).catch(function (e) {
            value = e
        })
    return value
    
    
}

async function getCarouselProducts(object){
    let product=[]
    for (let i = 0; i < object.length; i++) {
        product.push(object[i])
    }
    const filter = {
        "productID": {$in:product}
    }
    ///.*/+filters.name+/.*/
    const options = {
        projection: {
            _id:0
        }
    }
    const sort={}
    const limit = 100
    let value
    await db.Read(filter,options,sort,limit,collection)
        .then( function(response) {
            value = response
        }, function(error) {
            value =  error
        }).catch(function (e) {
            value = e
        })
    return value
}

async function findProductWithProductIDs(object){
    console.log(object.companyID)
    const filter = {
        companyID: object.companyID,
        productID: {$in:object.productIDs},
        
    }
    
    ///.*/+filters.name+/.*/
    const options ={
        
        projection: {
            _id:0
        }
    }
    const sort={}
    const limit = 100
    let value
    await db.Read(filter,options,sort,limit,collection)
        .then( function(response) {
            value = response
        }, function(error) {
            value =  error
        }).catch(function (e) {
            value = e
        })
    return value
}

module.exports =
    {
        insertProduct,
        findProduct,
        findProductAllCategories,
        findProductWithCategory,
        findProductWithProductID,
        updateProduct,
        getCarouselProducts,
        findProductWithProductIDs
    }

