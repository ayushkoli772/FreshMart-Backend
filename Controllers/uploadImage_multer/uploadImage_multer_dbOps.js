var sql = require('mssql');
var sqlConfigFile=require('../../Connections/sqlConfig');

var Utilities=require('../../Utilities/Utilities');



var multer  = require('multer');
const path = require('path');
//const client = require('../db/db.js');
const multerStorage = multer.diskStorage({
  
  destination: (req, file, cb) => {
    
    //--create Images folder if not exists-------------------------------------
    var fs = require('fs');
    var dir = './images';
    if (!fs.existsSync(dir))
    {
    fs.mkdirSync(dir);
    }
    //end of create Images folder if not exists -------------------------------


    //cb(null, './images');/*E:/myApt/myShop/src/assets */
    cb(null, './images');
  },
  filename: (req, file, cb) => {console.log('file.originalname:'+file.originalname)
   
   //cb(null, `image-${Date.now()}` + path.extname(file.originalname));
   cb(null, file.originalname )
      //path.extname get the uploaded file extension
  }
});
const multerFilter = (req, file, cb) => {
   
        if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) { 
             // upload only png and jpg format
           return cb(new Error('Please upload a Image'))
         }
       cb(null, true)
    
};

//upwork

exports.upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});
exports.uploadSingleImage=async(req,res)=>{
  
console.log('req.body.OP:'+JSON.stringify(req.body.OP));
console.log('req.file.filename:'+req.file.filename)
 


var fs = require('fs');

//var imageAsBase64 = fs.readFileSync('./images/image-1676636806628.jpg', 'base64');
var imageAsBase64 = fs.readFileSync('./images/'+req.file.filename, 'base64');


//After 5 seconds delete file ----------------------
setTimeout(() => {
  //delete file ./images/'+req.file.filename
  var filePath='./images/'+req.file.filename;
  fs.unlinkSync(filePath);
}, 30000);
//End After 10 seconds delete file ------------------DPuploading

if(req.query.Operation=='DPuploading'){//---Start DPuploading-------------------------------------------------------------------------
    uploadADP(req,res,imageAsBase64,req.file.filename);
        }//End DP uploading sp ------------------------------------------------------------------------------
else if((req.body.OP)=='attchmentuploading'){//---Start DPuploading-------------------------------------------------------------------------

  console.log('m attching image now...')
 // console.log("JSON.stringify(req.query.params):"+JSON.stringify(req.query.params))
  
  //console.log('req.body:'+req.body)

  /* console.log('req.query.params:'+req.query.params)
  console.log('req.query.params.imagename:'+req.query.params['foo'])
  querystring = require('querystring'); 
  const qs1=querystring.stringify({ foo: 'bar', baz: ['qux', 'quux'], corge: '' });
 //const qs1=querystring.stringify(req.query.params);
  console.log('qs1:'+qs1)
console.log('querystring.stringify(qs1):'+querystring.encode(qs1)) */

   uploadAAttachment(req,res,imageAsBase64);
      }//Endattchmentuploading sp ------------------------------------------------------------------------------
else if(req.query.OP=='attchmentdeleting'){//---Start DPuploading-------------------------------------------------------------------------
        deleteAAttachment(req,res,imageAsBase64);
            }//Endattchmentuploading
}

//Operation 1
var uploadADP=async(req,res,param_imageAsBase64,param_filename)=>{
  
var sp_name='sp_upload_DP_Owner';

let pool =await  new sql.ConnectionPool(sqlConfigFile).connect();

const request =  await pool.request();

          try{
           
            request.input('OwnersID',sql.Int, parseInt(req.params.id));
            request.input('DP_base64',sql.VarChar, 'data:image/jpeg;base64,'+param_imageAsBase64);
            request.input('CREATEDBY_username',sql.VarChar, 'CREATEDBY_username');
            var result = await request.execute(sp_name);

            res.status(200).json({'statusCode':200, 'status':true, message: 'Image added','data':[]});
          }
          catch(error){
          Utilities.logError('sqlserver',sp_name,error)
          
          res.status(200).json({"sp_data":null})
                  
          }
          finally{
          
          }    
}//End Operation 1

//Operation 2

var uploadAAttachment=async(req,res,param_imageAsBase64)=>{
  
  console.log('uploadAAttachment is on....')

  

  var sp_name='sp_uploadImage';
  
  let pool =await  new sql.ConnectionPool(sqlConfigFile).connect();
  
  const request =  await pool.request();
  
            try{
             
              request.input('ID',sql.Int,req.params.id);//JSON.stringify(req.body.OP)
              request.input('Imagebase64',sql.VarChar, param_imageAsBase64);//'data:image/jpeg;base64,'+
              request.input('Imagename',sql.VarChar,(req.body.imagename));//name
              request.input('isDeleted',sql.Int,(req.body.isDeleted));
              request.input('CREATEDBY_username',sql.VarChar,JSON.stringify(req.body.username));
              var result = await request.execute(sp_name);
  console.log(req.query.imagename+' with ID:'+req.params.id 
  + ' and with imagename:'+ req.body.imagename
 
  +'req.body.isDeleted:'+req.body.isDeleted +' is created in DB................................................................')
              res.status(200).json({'statusCode':200, 'status':true, message: 'Image added','data':[]});
            }
            catch(error){
            Utilities.logError('sqlserver',sp_name,error)
            
            res.status(200).json({"sp_data":null})
                    
            }
            finally{
            
            }     
  }
//End Operation 2

//Operation 3
var deleteAAttachment=async(req,res,param_imageAsBase64)=>{
  
  console.log('deleteAAttachment is on....')

  
  
  

  var sp_name='sp_uploadImage_delete';
  
  let pool =await  new sql.ConnectionPool(sqlConfigFile).connect();
  
  const request =  await pool.request();
  
            try{
             
              request.input('ID',sql.Int,req.params.id);
              request.input('Imagename',sql.VarChar,req.query.imagename);//name
              request.input('isDeleted',sql.Int,req.query.isDeleted);
              request.input('CREATEDBY_username',sql.VarChar,req.query.username);
              var result = await request.execute(sp_name);
  console.log(req.query.imagename+' with ID:'+req.params.id  +'req.query.isDeleted:'+req.query.isDeleted +' is created in DB................................................................')
              res.status(200).json({'statusCode':200, 'status':true, message: 'Image added','data':[]});
            }
            catch(error){
            Utilities.logError('sqlserver',sp_name,error)
            
            res.status(200).json({"sp_data":null})
                    
            }
            finally{
            
            }     
  }
//end Operation 3
exports.uploadMultipleImage=async(req,res)=>{
      
   for(var i=0;i<req.files.length;i++){
     const allquery =await client.query(`INSERT INTO users(name, icon) VALUES ('${req.body.name}','${req.files[i].filename}')`);
      }
  res.status(200).json({'statusCode':200, 'status':true,
 message: 'All Image added','data':[]});
}