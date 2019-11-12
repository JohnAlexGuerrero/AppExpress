const express = require('express');
const router = express.Router();

//routers
router.get('/',(req,res)=>{
    //res.sendFile(__dirname+"");
    res.render('index', {title:'first website'});
});

router.get('/product',(req,res)=>{
    //res.sendFile(__dirname+"");
    res.render('index', {title:'first website'});
});

router.get('/proveedor',(req,res)=>{
    //res.sendFile(__dirname+"");
    res.render('product', {title:'first website'});
});

module.exports = router;