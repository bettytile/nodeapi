require('./models/db');

const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const exphbs = require('express-handlebars')

const userController = require('./controllers/userController');

const app = express();
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());

app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/', runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
  }}));
app.set('view engine', 'hbs');

app.listen(5000,()=> {
    console.log('Server running at port 5000');
});

app.use('/user', userController);