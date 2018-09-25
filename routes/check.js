var cookieParser = require('cookie-parser');

var express = require('express');

var app = express();

app.use(cookieParser);

var sessionChecker = function (req, res, next) {
    if (req.session.user && req.cookies.user_sid) {
      res.redirect('/admin/home');
    } else {
      next();
    }    
  };
  
  var loggedin = function (req,res,next) {
  
    if (req.session.user && req.cookies.user_sid) {
  
       next();
    }
    else {
  
      res.redirect('/admin');
    }
  
  };

  module.exports ={
    sessioncheck : sessionChecker,
    logged: loggedin
  }