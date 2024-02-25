var sql = require('mssql');
var sqlConfigFile=require('../../Connections/sqlConfig');
var Utilities=require('../../Utilities/Utilities');



var Get_Parametric_Result=async(req,res)=>{

       // if(req.params.id=='will_area_conflict')
       // {
            checkareaconflict(req,res);
        //}
   }//end of Get_Parametric_Result
              
   
   var checkareaconflict = async (req, res) => {
    console.log('yes runned');
    console.log(' req.query.mobileNumber:' + req.query.mobileNumber);

    let pool = await new sql.ConnectionPool(sqlConfigFile).connect();
    const request = pool.request();

    var sp_name = 'sp_checkareaconflict';
    try {
        request.input('mobileNumber', sql.VarChar, req.query.mobileNumber);
        request.input('newsellerid', sql.Int, req.query.newsellerid);

        var result = await request.execute(sp_name);
        
        if (result.recordset[0] && result.recordset[0][''] === 1) {
            res.status(200).json({ conflict: true }); // Conflict occurred
        } else {
            res.status(200).json({ conflict: false }); // No conflict
        }
    } catch (error) {
        Utilities.logError('sqlserver', sp_name, error);
        res.status(500).json({ conflict: false }); // Error occurred
    } finally {
        // ...
    }
};


 module.exports={Get_Parametric_Result}