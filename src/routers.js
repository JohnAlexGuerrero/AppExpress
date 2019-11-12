const express = require('express');
const route = Router();

route.get('/',(req,res)=>{
    res.send('root working.');
})

module.exports = route;