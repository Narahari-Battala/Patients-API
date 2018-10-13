const mysql=require('mysql');
const express=require('express');
var app=express();
const bodyparser=require('body-parser');
const jwt=require('jsonwebtoken');

app.use(bodyparser.json());

var mysqlConnection=mysql.createConnection(
{
    host:'localhost',
    user:'root',
    password:'Hydrogen@01',
    database:'HospitalDB',
    multipleStatements:true
}
);

mysqlConnection.connect((err) =>{
    if(!err)
       console.log('DB connection succeded.');
    else
       console.log('DB connection failed \n Error : '+JSON.stringify(err, undefined, 2));
}
);

app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), function () {
    console.log('Server has started! http://localhost:' + app.get('port') + '/');
});
//app.listen(7000,()=>console.log('Express server is running at port: 7000'));

//Get user details
app.get('/users',verifyToken,(req,res)=>{
    jwt.verify(req.token,'secretkey',(err,authData) =>{

        if (err){
            res.sendStatus(403);
        }
        else{

            mysqlConnection.query('SELECT * FROM user where username=?',authData.username,(err,rows,fields)=>{
                if(!err)
                 {
                 res.send(rows[0]);
              }
                else
                 console.log(err); 
          })
        }
    });

});



    //INSERT employees
    app.post('/users',(req,res)=>{
        var appData = {
            'error': 1,
            'data': ''
            };
    let user=req.body;        
    var sql="Insert into user (username,name,age,weight,address,passw) values(?,?,?,?,?,?);";
        mysqlConnection.query(sql, [user.username,user.name,user.age,user.weight,user.address,user.password],(err,rows,fields)=>{
            if (!err) {
                appData.error = 0;
                appData['data'] = 'User registered successfully!';
                res.status(201).json(appData);
                } else {
                appData['data'] = err;
                res.status(400).json(appData);
                }
                });
                });


    //UPDATE employees
    app.put('/users',verifyToken,(req,res)=>{
        var appData = {
            'error': 1,
            'data': ''
            };
        jwt.verify(req.token,'secretkey',(err,authData) =>{

            if (err){
                res.sendStatus(403);
            }
            else{
            let emp=req.body;        
            var sql="Update user set name=?, age=?,weight=?,address=?,passw=? where username=?;";
                mysqlConnection.query(sql, [emp.name,emp.age,emp.weight,emp.address,emp.password,authData.username],(err,rows,fields)=>{
                      if(!err)
                       {
                        appData.error = 0;
                        appData['data'] = 'User Updated successfully!';
                        res.status(201).json(appData);
                        } else {
                        appData['data'] = err;
                        res.status(400).json(appData);
                        }
                })
            }
                });
            });

//FORMAT OF TOKEN
//AUTHORIZATION:Bearer <access_token>

//Verify Token
function verifyToken(req,res,next){
//Get auth header value
const bearerHeader=req.headers['authorization'];
//CHECK IF Bearer is undefined
if(typeof bearerHeader!=='undefined')
{
    const bearer = bearerHeader.split(' ');
    const bearertoken = bearer[1];
    req.token=bearertoken;
    next();
}else{
 //FORBIDDEN
    res.sendStatus(403);
}};

app.post('/login',(req,res)=>{
    
    var appData = {
        'error': 1,
        'token': '',
        'username':''
        };
        var username = req.body.username;
        var password = req.body.password; 
        var sql="select * from user where username=?;";
                mysqlConnection.query(sql, [username],(err,rows,fields)=>{
                      if(!err)
                       {
                        if (rows.length > 0) {
                            if (rows[0].passw == password) {
                            token = jwt.sign(JSON.parse(JSON.stringify(rows[0])), 'secretkey', {
                            expiresIn: 5000
                            });
                            appData.error = 0;
                            appData['token'] = token;
                            appData['username'] = rows[0].username;
                            res.status(200).json(appData);
                            } else {
                            appData.error = 1;
                            appData['token'] = 'Email and Password does not match';
                            res.status(204).json(appData);
                            }
                            }
                    }
                      else
                       console.log(err); 
                });
        
        });


         //PATIENT'S ANSWERS TO QUESTIONS
//CHANGES ARE MADE HERE IN QUERY!!
    app.post('/userresponse',verifyToken,(req,res)=>{
        var appData = {
            'error': 1,
            'data': ''
            };
            jwt.verify(req.token,'secretkey',(err,authData) =>{

                if (err){
                    res.sendStatus(403);
                }
                else{
    let user=req.body;        
    var sql="Insert into answers (username,Q1,Q1Value,Q2,Q2Value,Q3,Q3Value,Q4,Q4Value,Q5,Q5Value,Q6,Q6Value,Q7,Q7Value,Q8,Q8Value,Q9,Q9Value,Q10,Q10Value,TOTAL) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";
        mysqlConnection.query(sql, [authData.username,user.q1,user.q1value,user.q2,user.q2value,user.q3,user.q3value,user.q4,user.q4value,user.q5,user.q5value,user.q6,user.q6value,user.q7,user.q7value,user.q8,user.q8value,user.q9,user.q9value,user.q10,user.q10value,user.total],
            (err,rows,fields)=>{
            if (!err) {
                appData.error = 0;
                appData['data'] = 'User Data Saved Successfully!';
                res.status(201).json(appData);
                } else {
                appData['data'] = err;
                res.status(400).json(appData);
                }
        });
    }
});
    });



                         //ADMIN TABLE OPERATIONS BEGINS HERE

//ADMIN LOGIN TABLE
app.post('/admin',(req,res)=>{
    
    var appData = {
        'error': 1,
        'token': '',
        'username':''
        };
        var username = req.body.username;
        var password = req.body.password; 
        var sql="select * from admin where username=?;";
                mysqlConnection.query(sql, [username],(err,rows,fields)=>{
                      if(!err)
                       {
                        if (rows.length > 0) {
                            if (rows[0].passw == password) {
                            token = jwt.sign(JSON.parse(JSON.stringify(rows[0])), 'secretkey', {
                            expiresIn: 5000
                            });
                            appData.error = 0;
                            appData['token'] = token;
                            appData['username'] = rows[0].username;
                            res.status(200).json(appData);
                            } else {
                            appData.error = 1;
                            appData['token'] = 'Unsuccessful Login as Admin';
                            res.status(204).json(appData);
                            }
                            }
                    }
                      else
                       console.log(err); 
                });
        
        });



        //ADD PATIENTS TO SURVEY BY ADMIN

    app.post('/adminadd',verifyToken,(req,res)=>{
        var appData = {
            'error': 1,
            'data': ''
            };
            jwt.verify(req.token,'secretkey',(err,authData) =>{
            if (err){
                res.sendStatus(403);
            }
else{
            let user=req.body;        
    var sql="Insert into user (username,name,age,weight,address,passw) values(?,?,?,?,?,?);";
        mysqlConnection.query(sql, [user.username,user.name,user.age,user.weight,user.address,user.password],(err,rows,fields)=>{
            if (!err) {
                appData.error = 0;
                appData['data'] = 'User registered successfully!';
                res.status(201).json(appData);
                } else {
                appData['data'] = err;
                res.status(400).json(appData);
                }
                });
     }
    });
     });


                //GET USER'S AMSWERS

                app.post('/userresponses',verifyToken,(req,res)=>{

                    const name = req.body;
                    jwt.verify(req.token,'secretkey',(err,authData) =>{

                        if (err){
                            res.sendStatus(403);
                        }
                        else{
                            let auth=req.body;        
                            mysqlConnection.query('SELECT * FROM answers where username=?',name.username,(err,rows,fields)=>{
                                if(!err)
                                 {
                                 res.status(200).json({

                                    "data":rows
                                 });
                              }
                                else
                                 console.log(err); 
                          });
                        }
                    });
                        
                    });

                    app.get('/userslist',verifyToken,(req,res) => {

                        jwt.verify(req.token,'secretkey',(err,authData) =>{

                            if (err){
                                res.sendStatus(403);
                            }
                            else{
                                let auth=req.body;        
                                mysqlConnection.query('SELECT * FROM user',(err,rows,fields)=>{
                                    if(!err)
                                     {
                                     res.status(200).json({
    
                                        "data":rows
                                     });
                                  }
                                    else
                                     console.log(err); 
                              });
                            }
                        });

                    });

                    app.get('/responses',verifyToken,(req,res) => {

                        jwt.verify(req.token,'secretkey',(err,authData) =>{

                            if (err){
                                res.sendStatus(403);
                            }
                            else{
                                let auth=req.body;        
                                mysqlConnection.query('SELECT * FROM answers',(err,rows,fields)=>{
                                    if(!err)
                                     {
                                     res.status(200).json({
    
                                        "data":rows
                                     });
                                  }
                                    else
                                     console.log(err); 
                              });
                            }
                        });

                    });

                


                
                
                
