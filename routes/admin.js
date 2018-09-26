var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var request = require('request');
var jade = require('jade');
var check = require('./check');
var app = express();
var token;
var userName;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

/* GET home page. */
router.get('/',check.sessioncheck,function(req, res, next) {
  res.render('index',{title:'Admin'});
  
});

router.get('/home', check.logged,function(req,res,next){
  res.render('dashboard',{title:'Dashboard'});
})

router.post('/dashboard',check.sessioncheck,function(req,res,next){

  var json = {
    "username": req.body.emailaddress,
    "password": req.body.passwordvalue
  };

  var options = {
    url: 'http://ec2-18-221-45-243.us-east-2.compute.amazonaws.com:9000/admin',
    //url: 'http://localhost:4000/adminlogin',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    json: json
  };
  request(options, function(err, resp, body) {
    if (resp && (resp.statusCode === 200)) {
      token = 'Bearer ' + body.token;
      req.session.user = {
        "tokenValue" : token,
      };
      res.redirect('/admin/home');
    }
    else {
      res.redirect('/admin');
    }
});
     
});


router.get('/register',check.logged,function(req,res,next){
  res.render('register',{title:'Register'});

});

router.post('/registerpatient',check.logged,function(req,res,next){

        var json ={
          username:req.body.email,
          name: req.body.fname + ' ' + req.body.lname,
          address: req.body.address,
          password: req.body.psw,
        };
        var options = {
          url: 'http://ec2-18-221-45-243.us-east-2.compute.amazonaws.com:9000/users',
          //url: 'http://localhost:4000/adminlogin',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          json: json
        };
        request(options, function(err, resp, body) {
          if (resp && (resp.statusCode === 201)) {
            res.redirect('/admin/home');
          }
          else {
            res.render('register',{title:'Register'});
          }
      }); 
});

router.get('/patientlist',check.logged,function(req,res,next){
      var data = {
        title:'Patient List',
        tokenValue: token
      };
      res.render('patientlist',data);
});

router.get('/patientresponse',check.logged,function(req,res,next){

  var user = req.query.user;
  if (user != undefined){
  userName = user;
  }
  var data = {
    title:'Patient Responses',
    tokenValue: token,
    username: userName
  };
  res.render('patientresponses',data);
});

router.get('/patientsresponses',check.logged,function(req,res,next){
  var data = {
    title:'Patients Responses',
    tokenValue: token,
  };
      res.render('patientsresponses',data);
});

router.get('/logout',check.logged,function(req,res,next){

  if(req.session){
    if(req.session.user != null || req.session.user != 'undefined'){
        req.session.user = null;
    }

    req.session.destroy(function () {
        res.clearCookie('user_sid', {
            httpOnly: true
        });
        res.redirect('/admin');
    });
} else{
    res.clearCookie('user_sid', {
        path: '/',
        httpOnly: true
    });
    res.redirect('/admin');
}
     
});

module.exports = router;
