var express = require('express');
var router = express.Router();
var jsonParser = require('body-parser').json();
// const mongoose = require('mongoose');
// mongoose.connect('mongodb://admin:admin123456@ds251988.mlab.com:51988/products');
// const Schema = mongoose.Schema;

// const productDataSchema = new Schema({
//     name: {type: String, required: true},
//     price: String,
//     description: String,
//     typeProduct: String,
//     imgUrl: String
//   }, {collection: 'list_products'});

// const userDataSchema = new Schema({
//     name: {type: String, required: true},
//     password: String,
//     lastName: String,
//     firstName: String
// }, {collection: 'list_user'});

// const ProductData = mongoose.model('ProductData', productDataSchema);
// const UserData = mongoose.model('UserData', userDataSchema);

router.post('/admin', jsonParser, (req,res) => {
    var {name, price, description, typeProduct, imgUrl} = req.body.params.data;   
      var item = {
        name,
        price,
        description,
        typeProduct,
        imgUrl
      };
      var data = new ProductData(item);
      data.save();
      
      res.send({
        statusCode: 200,
    });
});

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

router.post('/search', jsonParser, (req,res) => {
    var keyword = req.body.params.param.keyword;
    var regex = new RegExp(escapeRegex(keyword));
    ProductData.find({name: regex}).collation( { locale: 'en', strength: 2 } )
      .then(function(doc) {
        res.send({
            items: doc,
            statusCode: 200,
            keyword
      });
  });
});

router.get('/mobile', function(req, res, next) {

    ProductData.find({typeProduct: 'Mobile'}).limit(8).sort({ name: -1 })
        .then(function(doc) {
          res.send({
              items: doc,
              statusCode: 200
        });
    });
});

router.get('/laptop', function(req, res, next) {
    ProductData.find({typeProduct: 'Laptop'})
        .then(function(doc) {
          res.send({
              items: doc,
              statusCode: 200
        });
    });
});

router.post('/detail', jsonParser, function(req, res) {
    var idParam = req.body.params.id;
    ProductData.findById(idParam, function(err, doc) {
        if (err) {
          console.error('error, no entry found');
        }
        res.send({
            items: doc,
            statusCode: 200
        });
      });
  });

//User



router.post('/account', jsonParser, (req,res) => {    
    var name = req.body.params.data.name;
    var password = req.body.params.data.password;
  UserData.findOne({name, password}, (err, user) => {
    if (err) return res.send({statusCode: 500});
    if(!user) {
        return res.send({
            statusCode: 404
        });
    }
    return res.send({ message: 'Login success', statusCode: 200, item: user });
  });
});

router.post('/register', jsonParser, (req,res) => {
    var name = req.body.params.data.name;
    var password = req.body.params.data.password;
    var firstName = req.body.params.data.firstName;
    var lastName = req.body.params.data.lastName;
    var {name, password, firstName, lastName} = req.body.params.data;   
      var item = {
        name,
        password,
        firstName,
        lastName
      };
    
      var data = new UserData(item);
      data.save(function(err, saveUser){
            if(err) return res.send({statusCode: 404});
            return res.send({statusCode: 200});
      });
});



module.exports = router;