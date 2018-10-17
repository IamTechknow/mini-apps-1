var mongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017/';
const DB = 'checkout';

module.exports = function (data) {
  return mongoClient.connect(url)
  .then(client => {
    let db = client.db(DB);
    let collection = db.collection('checkout');
    
    return collection.insertOne(data);
  })
  .catch(err => console.log(err));  
};
