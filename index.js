const express = require('express');
const session = require('express-session');
const path = require('path');
var jsonParser = require('body-parser').json();
var multer  = require('multer');
var upload = multer();
const routes = require('./routes/index.js');
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://admin:admin123456@ds251988.mlab.com:51988/products');
const Schema = mongoose.Schema;


const productDataSchema = new Schema({
    name: {type: String, required: true},
    price: String,
    description: String,
    typeProduct: String,
    imgUrl: String
  }, {collection: 'list_products'});

const userDataSchema = new Schema({
    name: {type: String, required: true},
    password: String,
    lastName: String,
    firstName: String
}, {collection: 'list_user'});

const ProductData = mongoose.model('ProductData', productDataSchema);
const UserData = mongoose.model('UserData', userDataSchema);

app.use(express.static(path.resolve(__dirname, './client/build')));

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './client/build/uploads')
    },
    filename: function (req, file, cb) {
        if(file.mimetype === 'image/png') {
            cb(null, file.fieldname + '-' + Date.now() + '.png')
        } else if (file.mimetype === 'image/jpeg') {
            cb(null, file.fieldname + '-' + Date.now() + '.jpg')
        }
    }
  })
  
  var upload = multer({ storage: storage });

// app.use('/', routes);
app.listen(process.env.PORT || 5000);

app.post('/admin', jsonParser, (req,res) => {
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

app.post('/delete', function(req, res, next) {
    var email = req.body.email;
    ProductData.findByIdAndRemove(email).exec();
    res.redirect('/');
  });

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

app.post('/search', jsonParser, (req,res) => {
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

app.get('/mobile', function(req, res, next) {

    ProductData.find({typeProduct: 'Mobile'}).sort({ name: -1 })
        .then(function(doc) {
          res.send({
              items: doc,
              statusCode: 200
        });
    });
});

app.get('/laptop', function(req, res, next) {
    ProductData.find({typeProduct: 'Laptop'})
        .then(function(doc) {
          res.send({
              items: doc,
              statusCode: 200
        });
    });
});

app.post('/detail', jsonParser, function(req, res) {
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



app.post('/account', jsonParser, (req,res) => {    
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

app.post('/register', jsonParser, (req,res) => {
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

app.post('/upload', upload.single('image'), function (req, res, next) {
    res.send({ message: 'Login success', statusCode: 200, item: req.file.filename });
});

app.get('*', (request, response) => {
	response.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

// app.use(session({
//     secret: 'jsdf7389isacuy28',
//     resave: false,
//     saveUninitialized: true,
//     cookie:{
//       maxAge:60*60*100*24
//       }
// }));








