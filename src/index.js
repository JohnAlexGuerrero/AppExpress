const express = require('express');
const path = require('path');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const morgan = require('morgan');
//const router = require('routers');

const app = express();


app.set('port', 4000);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))

//middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql,{
    host: 'localhost',
    user: 'root',
    password: 'contrasena',
    port: 3306,
    database: 'store'
},'single'));

//routes
app.use(require('./routes/index'));


//app.get(router);

// static files
app.use(express.static(path.join(__dirname, 'public')));

//listening the server
app.listen(app.get('port'), ()=>{
    console.log('Server working on port ',app.get('port'));
})
