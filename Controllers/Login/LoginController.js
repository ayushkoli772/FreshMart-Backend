//var myLog=require('../../Controllers/Log/myLog')
var store=require('store2');
var my_user_dbUtil=require('../Users/user_dbUtil');
var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken');

var routes = function(){

  router.route('')
  .get(function(req,res){
       
       res.status(200).send({"login":"is page"})
  });

  /*--Login--post-------------------------------------------------------*/

  router.route('')
  .post(async(req,res)=>{
   
    
      
    let user = req.body;
    if(!user){res.status(501).send({ error:"no credential passed" });}
      
//---------------------------------------------------------------------
    //Authenticate and get role string returned
    var retUser=await my_user_dbUtil.AuthenticateDeviceAndReturnRole(req,res,user.deviceid);
  /* my_user_dbUtil.AuthenticateAndReturnRole(req,res,user.username,user.password).then(function(res){
      console.log('response received:'+res);
  })
 */
    if(retUser!=null){
      
    var accessToken = jwt.sign({username:user.password},"secret");
    user.ID=retUser.ID;
    
    //added on 9Sep22
    user.username=retUser.username;
   store('userid',user.userid);
    // myLog.LoginLogoutLog('Login')
    //end
    user.userrole=retUser.userrole; 
    //user.nickname=retUser.nickname;
    //user.currenttheme=retUser.currenttheme
 


    res.status(201).json({user:user,accessToken:accessToken});  
   
    }

    //end of Authenticate and get role string returned

   
        else
        {console.log('wrong user passC')
          res.status(501).send({ error:"Wrong username or password" });
        }

/*  */

   });//end of login post


   
   /*--Login--put--managed for logout-----------------------------------------------------*/
 
   router.route('/:id?')
   .put(async(req,res)=>{
     if(req.params.id){ 
           //myLog.LoginLogoutLog('Logout') ;
            console.log('direct window closed so logout') }
   });//end of login put

   

  return router;


}
module.exports = routes;