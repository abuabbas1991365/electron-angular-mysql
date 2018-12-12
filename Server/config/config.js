var path = require('path')
var rootPath = path.resolve(__dirname + '../../..')

module.exports = {
  development: {

    port: 3000,
    root: rootPath,
    db:{
       multipleStatements: true,
       host     : 'localhost',
       port:3306,
       user     : 'root',
       password : 'password',
       database : 'sys',
       requestTimeout: 30000
     }
    
   }
 }
