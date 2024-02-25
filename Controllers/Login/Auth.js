const jwt = require('jsonwebtoken');

function auth(req,res,next){

    console.log('req.originalUrl:'+req.originalUrl
    +' method:'+req.originalUrl.includes('/api/'))

    
    //for login post forgive
    if(
      (req.originalUrl.includes('/api/product') && req.method=="GET")
   || (req.originalUrl=='/api/login/' && req.method=="POST")
   || (req.originalUrl=='/api/signup' && req.method=="POST")
   || (req.originalUrl.includes('/api/Device/') && req.method=="GET")    
    
 ){next();return;}

    //const token = req.headers.authorization.split(' ')[1];
  //  const authHeader = req.header('authorization');

  //Sabak
  //Very importatnt step split it 
  console.log("req.header 'authorization' is:->"+req.header('authorization'))
  console.log('after removed quotes'+req.header('authorization').replace(/"/g, ''))
  var reqHeadersWithoutQuotes=req.header('authorization').replace(/"/g, '')
  const authHeader = reqHeadersWithoutQuotes.split(' ')[1];

    console.log('my authHeader:-->'+authHeader+'<--')
    if(authHeader === null){
     return res.status(401).json({error:"Access-Denied"});
    }

    try{
        
       const verified = jwt.verify(authHeader,"secret");
       req.id={userid:verified.userid}; //was username
      // req.id={username:verified.username};
       next();
       
    }catch(error){
        console.log('Invalid Token'+error)
     res.status(401).json({error:"Invalid token"});
    }

}
module.exports={auth}