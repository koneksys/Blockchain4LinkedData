
// require our dependencies
var express        = require('express');
var expressLayouts = require('express-ejs-layouts');
var bodyParser     = require('body-parser');
var app            = express();
var port           = process.env.PORT || 3003;

// use ejs and express layouts
app.set('view engine', 'pug');
// app.use(expressLayouts);

// use body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.locals.basedir = app.get('views');

// route our app
var router = require('./app/routes');
app.use('/', router);


// set static files (css and images, etc) location
app.use(express.static(__dirname + '/public'));

// start the server
app.listen(port, function() {
  console.log('app started');
});
