var express = require('express');
var router = express.Router();
    var config = require('../config/config')[process.env.NODE_ENV || 'development'],
    mysql = require('mysql'),
    async = require('async'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    crypto = require('crypto'),
    fs = require("fs");
   router.post('/register', function (req, res, next) {
		
 var connection;
	async.waterfall([
			function(next){
				connection=mysql.createConnection(config.db,next);
			    connection.connect();
                var response={
		    		email:req.body.email,
		    	    username:req.body.username,
		    	    password:crypto.createHash('md5').update(req.body.password).digest("hex"),
		    	   }
		    	 connection.query("INSERT INTO user_info set ?",[response]);
			 },
			
			],function(err,result){
			if(connection){
				connection.end();
				connection=null;
			}
			if(err)
		    	return res.status(201).json(err);
		    else
          	return res.status(201).json("inseted Success");
     });
 });

  router.post('/addviruthu', function (req, res, next) {
  var connection;
	async.waterfall([
			function(next){
				connection=mysql.createConnection(config.db,next);
			    connection.connect();
	   connection.query("select * from user_info where  email='"+req.body.email+"' and password='"+crypto.createHash('md5').update(req.body.Password).digest("hex")+"'and status='Active'",next);
			 },
       function(user,next){
                 var response={
                	   title:req.body.title,
                       ViruthuName:req.body.ViruthuName,
                       date:req.body.date,
                       Address:req.body.Address,
                       Password:req.body.Password,
                       Mobileno:req.body.Mobileno,
                       email:req.body.email,
                       status:'Active',
                     } 
               var response1={
                  	email:req.body.email,
		    	    username:req.body.title,
		    	    password:crypto.createHash('md5').update(req.body.Password).digest("hex"),
		    	    flag:'2',
		    	    status:'Active',
		    	    date:req.body.date,
                     }
                     console.log(user.length);
                     if(user.length==0){ 
                     	 connection.query("INSERT INTO admin_viruthu_info set ?;INSERT INTO user_info set ?",[response,response1]);
                     return res.status(201).json("inseted Success");

                    } 
                    else if(user.length>0){
                     	console.log(user.date);
                     	   console.log(user[0].date+'=='+req.body.date);
                    if(user[0].date==req.body.date){
                        	return res.status(201).json("Pls Check the mail Id And Password");
                       	}	
                    else
                    {
                      connection.query("update person_viruthu_details set flag='0' where email='"+req.body.email+"' and flag='1';update admin_viruthu_info set status='InActive' where email='"+req.body.email+"' and status='Active'; update user_info set status='InActive',flag='0'  where email='"+req.body.email+"' and status='Active';INSERT INTO admin_viruthu_info set ?;INSERT INTO user_info set ?",[response,response1]);
                     	return res.status(201).json("This Account Is Actived");	
                     }
                   
                }
				}

			 ],function(err,result){
			if(connection){
				connection.end();
				connection=null;
			}
			if(err)
		    	return res.status(201).json(err);
			else
		    return res.status(201).json("inseted Success");	
        });
      });  

router.post('/addpersonviruthu', function (req, res, next) {
  var connection;
	async.waterfall([
			  function(next){
		    		connection=mysql.createConnection(config.db,next);
			        connection.connect();
			    var response={
                      viruthu_admin_name:req.body.globaltitle,
                       viruthu_name:req.body.globalviruthu,
                       date:req.body.globaldate,
                       address:req.body.Address,
                       amount:req.body.persontotalamount,
                       email:req.body.globalemail,
                       name:req.body.personname,
                       flag:'1',
                     }
               
                    connection.query("INSERT INTO person_viruthu_details set ?",[response],next);
                    
                }
              ],function(err,result){
			if(connection){
				connection.end();
				connection=null;
			}
			if(err)
		    	return res.status(201).json(err);
			else
		    return res.status(201).json("inseted Success");	
        });
      });  

 router.get('/getviruthu', function (req, res, next) {
  var connection;
	async.waterfall([
			function(next){
				connection=mysql.createConnection(config.db,next);
			    connection.connect();
               connection.query("select *,email as eid,date as edate,(select sum(amount) FROM person_viruthu_details where email=eid and date=edate) as total_amount from admin_viruthu_info",next);
			 }
			 ],function(err,result){
			if(connection){
				connection.end();
				connection=null;
			}
			if(err)
             	return res.status(201).json(err);
			else
			 return res.status(201).json(result);
		});
      }); 
  router.get('/totalcountinformation', function (req, res, next) {
  var connection;
	async.waterfall([
			function(next){
				connection=mysql.createConnection(config.db,next);
			    connection.connect();
                connection.query("select count(title) as usercount ,(select sum(amount) from person_viruthu_details ) as total_amount from admin_viruthu_info;",next);
			 }
			 ],function(err,result){ 
			if(connection){
				connection.end();
				connection=null;
			}
			if(err)
             	return res.status(201).json(err);
			else{
		 return res.status(201).json({UserCount:result[0].usercount,TotalAmount:result[0].total_amount});
			}
		});
      }); 
router.post('/meanactive', function (req, res, next) {
		 var connection;
	    		connection=mysql.createConnection(config.db,next);
			    connection.connect();
		async.waterfall([
		
			function(next){
				connection.query("select * FROM admin_viruthu_info where email='"+req.body.email+"'and title='"+req.body.username+"' and status='Active';select * FROM person_viruthu_details where viruthu_admin_name='"+req.body.username+"' and  email='"+req.body.email+"' and flag='1';select sum(amount) as amount ,count(name) as totalausers from person_viruthu_details  where flag='1' and viruthu_admin_name='"+req.body.username+"' and  email='"+req.body.email+"' ;",next);
		 	},
           ],function(err,result){
           	
           	if(connection){
				connection.end();
				connection=null;
			}
			if(err)
             	return res.status(201).json(err);
			else{

			 return res.status(201).json({adminprocess:result[0],viruthuprocess:result[1],totalporcess:result[2]});
			}
		});
      }); 

router.post('/editpersoninfo', function (req, res, next) {
		 var connection;
	    		connection=mysql.createConnection(config.db,next);
			    connection.connect();
		async.waterfall([
			 function(next){
              console.log("update user_info set username='"+req.body.title+"',password='"+crypto.createHash('md5').update(req.body.Password).digest("hex")+"' where email='"+req.body.email+"'; update person_viruthu_details set date='"+req.body.date+"',viruthu_admin_name='"+req.body.title+"' where email='"+req.body.email+"';update admin_viruthu_info set date='"+req.body.date+"',title='"+req.body.title+"',ViruthuName='"+req.body.ViruthuName+"',Address='"+req.body.Address+"',Password='"+req.body.Password+"',Mobileno='"+req.body.Mobileno+"' where email='"+req.body.email+"'");
              connection.query("update user_info set username='"+req.body.title+"',password='"+crypto.createHash('md5').update(req.body.Password).digest("hex")+"' where email='"+req.body.email+"' and flag='2' and status='Active'; update person_viruthu_details set date='"+req.body.date+"',viruthu_admin_name='"+req.body.title+"',viruthu_name='"+req.body.ViruthuName+"' where email='"+req.body.email+"' and flag='1';update admin_viruthu_info set date='"+req.body.date+"',title='"+req.body.title+"',ViruthuName='"+req.body.ViruthuName+"',Address='"+req.body.Address+"',Password='"+req.body.Password+"',Mobileno='"+req.body.Mobileno+"' where email='"+req.body.email+"' and status='Active'",next);
		 	},
           ],function(err,result){
         	if(connection){
				connection.end();
				connection=null;
			}
			if(err)
             	return res.status(201).json(err);
			else{
			 return res.status(201).json("UPDATED SUCESSFULLY....!");
			}
		});
      }); 







  router.post('/personview', function (req, res, next) {
  var connection;
	async.waterfall([
			function(next){
				connection=mysql.createConnection(config.db,next);
			    connection.connect();  
               
                connection.query("select * from person_viruthu_details where viruthu_admin_name='"+req.body.useradmin+"' and date='"+req.body.date+"'and  email='"+req.body.email+"'",next);
			 }
			 ],function(err,result){
			if(connection){
				connection.end();
				connection=null;
			}
			if(err)
             	return res.status(201).json(err);
			else
	         return res.status(201).json(result);
		});
      });    

  
  router.post('/deleteinfo', function (req, res, next) {
  var connection;
	async.waterfall([
			function(next){
				connection=mysql.createConnection(config.db,next);
			    connection.connect();
             connection.query("update user_info set flag='0',status='InActive' where email='"+req.body.email+"' and status='Active';update admin_viruthu_info set status='InActive' where email='"+req.body.email+"' and status='Active';update person_viruthu_details set flag='0' where email='"+req.body.email+"' and flag='1';",next);
			 }
			 ],function(err,result){
			if(connection){
				connection.end();
				connection=null;
			}
			if(err)
             	return res.status(201).json(err);
			else
		     return res.status(201).json("THAT LOGIN DEACTIVATED SUCESSFULLY...!");
		});
      });    
      
 passport.use('local',new LocalStrategy({
    usernameField:'email',
    passwordField:'password'
},
    function (username, password, done) {
    var connection;
		password=crypto.createHash('md5').update(password).digest("hex");
		async.waterfall([
			function(next){
		    connection=mysql.createConnection(config.db,next);
	        connection.connect();
	        console.log('select * from user_info where email="'+username+'" and password="'+password+'" and flag!=0');
			connection.query('select * from user_info where email="'+username+'" and password="'+password+'" and flag!=0',next);
	  		},	 
			function(users,next){
               			if(users && users.length>0){
					var user=createUserObject(users);
					return done(null, user);
				 } else
					  return done(null, false, { message: 'Incorrect username.' });
			},
			
		],function(err,result){
			if(connection){
				connection.end();
				connection=null;
			}
			if(err)
				done(null,false,err);
			else
				done(err,result);
		});
	
    }
));


passport.serializeUser(function(user, done) {
	
	done(null, {userid:user._id.toString()});
});

passport.deserializeUser(function(id, done){
	var connection;
	async.waterfall([
		function(next){
			connection=mysql.createConnection(config.db,next);
	        connection.connect();
			connection.query('select * from user_info where userid='+id.userid,next);
			},
			function(users,next){
               			if(users && users.length>0){
					var user=createUserObject(users);
					 done(null, user);
				 } else
					 done(null, false, { message:'Incorrect username And Password'});
			},
			
		],function(err,result){
			if(connection){
				connection.end();
				connection=null;
			}
			if(err)
				done(null,false,err);
			else
				done(err,result);
		});
	
    });

function createUserObject(users){
 var user={
	  	 _id:users[0].userid,
	     username:users[0].username,
	   	 email:users[0].email,
		 password:users[0].password,
		 flag:users[0].flag,
	   }
	return user;
}

router.post('/login',function(req,res,next){
  passport.authenticate('local', function(err, user, info) {
    if (err) {
     return res.status(501).json(err); }
    if (!user) { return res.status(501).json(info); }
    req.logIn(user, function(err) {
      if (err) { return res.status(501).json(err); }
      return res.status(200).json({message:'Login Success'});
    });
  })(req, res, next);
});

router.get('/user',isValidUser,function(req,res,next){
	
  return res.status(200).json(req.user);
});


router.get('/logout',isValidUser, function(req,res,next){
  req.logout();
  return res.status(200).json({message:'Logout Success'});
})

function isValidUser(req,res,next){
  if(req.isAuthenticated()) next();
  else return res.status(401).json({message:'Unauthorized Request'});
}
module.exports = router;

