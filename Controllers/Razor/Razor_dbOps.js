var sql = require('mssql');
var sqlConfigFile=require('../../Connections/sqlConfig');
var Utilities=require('../../Utilities/Utilities');


const Razorpay = require('razorpay');



// This razorpayInstance will be used to
// access any resource from razorpay
const razorpayInstance = new Razorpay({
  
    // Replace with your key_id
    key_id: 'rzp_test_vmjtxiBj8VbrZj',
  
    // Replace with your key_secret
    key_secret: 'lHAe6Qcnlcuriser6JICLjKt'
});

var CreateRPOrder=async (req,res)=>{ 
   console.log('CreateRPOrder of RP running...');
   console.log('amount,currency,receipt,notes:'+req.body.amount+'-'+req.body.currency+'-'+req.body.receipt+'-'+req.body.notes)
 // STEP 1:
 const {amount,currency,receipt, notes}  = req.body;      
          
 // STEP 2:        
    razorpayInstance.orders.create({amount,currency,receipt,notes}, 
      (err, order)=>{
        
        //STEP 3 & 4: 
        if(!err)
        { console.log('no error rs:'+amount);
          res.json(order)
        }
        else
      //  { console.log('error occured...'+JSON.stringify(err))
     { console.log('error occured...'+(err))
          res.send(err);
        }
      })

}


var PayOrder=async (req,res)=>{ 

   console.log('paying order now');

   var options = {
    "key_id": "rzp_test_vmjtxiBj8VbrZj", 
    "amount": req.body.amount, 
    "currency": "INR",
    "name": "Dummy Academy",
    "description": "Pay & Checkout this Course, Upgrade your DSA Skill",
     "image": "https://media.geeksforgeeks.org/wp-content/uploads/20210806114908/dummy-200x200.png",
    "order_id": req.params.id,  
    "handler": function (response){
        console.log(response)
        console.log("This step of Payment Succeeded");
    },
    "prefill": {
       //Here we are prefilling random contact
      "contact":"9780485123", 
        //name and email id, so while checkout
      "name": "LoiusDesoza",  
      "email": "louisdesoza@gmail.com"   
    },
   "notes" : {
      "description":req.body.notes
    }, 
    "theme": {
        "color": "#2300a3"
    }
};

   var razorpayObject = new Razorpay(options);
   console.log(razorpayObject);
   razorpayObject.on('payment.failed', function (response){
         console.log(response);
         alert("This step of Payment Failed");
   });

}
 module.exports={CreateRPOrder,PayOrder}