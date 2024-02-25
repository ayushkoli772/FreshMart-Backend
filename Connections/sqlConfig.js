

 

   
  /*module.exports={
   user: 'shop9', //process.env.DB_USER
   password: 'Ue89LSAHe!8?',  //process.env.DB_PWD
   database: 'shop9',
   server: 'den1.mssql8.gear.host',
   pool: {
     max: 10,
     min: 0,
     idleTimeoutMillis: 30000
   },
   options: {
     encrypt: false, // for azure
     trustServerCertificate: true // change to true for local dev / self-signed certs
   }
 }*/
 
  

  

 

module.exports={
  user: 'sa', //process.env.DB_USER
  password: 'saadmin',  //process.env.DB_PWD
  database: 'EShop',    //EShop is new DB for supplier-consumer model
  server: 'WINDOWS-I5QDPI6\\SQLEXPRESS',
  dialect: 'mssql',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: false, // for azure
    trustServerCertificate: true // change to true for local dev / self-signed certs
  }
}

 
 

 
 
