const express = require('express');
const router = express.Router();
const dashboard = require('../models/dashboard');

/* GET home page. */


router.get('/',function (req,res,next){
  dashboard.obtener().then(data =>{
      res.render('index',{
          data : data,
      });
  })
  .catch(err =>{
      console.log(err);
      return res.status(500).send('Error obteniendo productos (here)');
  });
});

module.exports = router;