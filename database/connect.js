const mongo = require("mongodb");

const MongoClient = mongo.MongoClient;

const uri = 'mongodb+srv://fssaruhan:ICULgqZ0995mEtTt@cluster0.ewzf5.mongodb.net/?retryWrites=true&w=majority'
const mongo_client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



mongo_client.connect( function(err, db) {

    if (err) throw err;

    db =  mongo_client.db('Products');

    exports.Create = async function (object,collection) {
        return new Promise(function(resolve, reject) {
            db.collection(collection).insertMany(object, function(err, res) {
                if (err) throw err;
                resolve(res)
            });
        })

    };
    exports.Update = async function (query,object,options,collection) {
        return new Promise(function(resolve, reject) {
            db.collection(collection).updateMany(query,object,options, function(err, res) {
                if (err) throw err;
                resolve(res)
            });
        })

    };
    exports.Read = async function (filter,option,sort,limit,collection) {

            return new Promise(function(resolve, reject) {

                try {
                    db.collection(collection).find(filter,option ).sort(sort).limit(limit).toArray(function(err, res) {
                        if (err){
                            resolve(err)
                        }
                        else{
                            resolve(res)
                        }

                    });
                }catch (e) {
                    console.error(e)
                    resolve(e)
                }

            })


    };
    exports.Delete = async function (object,collection) {
        return new Promise(function(resolve, reject) {
            db.collection(collection).deleteMany(object, function(err, res) {
                if (err) throw err;
                resolve(res)
            });
        })

    };


});

