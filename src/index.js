const express = require('express');
const app = express();
const path = require('path');
//const router = require('routers');

app.set('port', 4000);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))

//middlewares

//routes
app.use(require('./routes/index'));


//app.get(router);

// static files
app.use(express.static(path.join(__dirname, 'public')));

//listening the server
app.listen(app.get('port'), ()=>{
    console.log('Server working on port ',app.get('port'));
})
