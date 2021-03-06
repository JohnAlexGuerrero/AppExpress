var createError = require('http-errors');
const express = require('express');
const path = require('path');
//const mysql = require('mysql');
const myConnection = require('./connection');
const morgan = require('morgan');

const indexRouter = require('./routes/index');
const productosRouter = require('./routes/productoController');
const ventasRouter = require('./routes/ventasRouter');
const clienteRouter = require('./routes/clienteRouter');
const reporteRouter = require('./routes/reporteRouter');
const proveedorRouter = require('./routes/proveedorRouter');

const app = express();


app.set('port', 4000);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,'public')));

app.use('/',indexRouter);
app.use('/productos',productosRouter);
app.use('/ventas',ventasRouter);
app.use('/clientes',clienteRouter);
app.use('/reportes',reporteRouter);
app.use('/proveedor',proveedorRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });
  
//catch 404 and forward ro error handler


app.use(function(err,req,res,next){
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err:{};

    res.status(err.status || 500);
    res.render('error');

})

module.exports = app;