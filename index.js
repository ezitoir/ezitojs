 
const { template , createLessMiddleware } = require("./src/core");
 
const mysql = require("mysql");

module.exports = function ( config ){
    const { static , __dirname , lessMiddleware , mysqlSetting } = config;
    const { 
        NODE_ENV  = "development" , 
    } = process.env;
    const IN_PROC = NODE_ENV === 'production';


    return function ( req , res ,next) {
        let response = res.send ;
          
        //
        try {
            if( !IN_PROC ){
                createLessMiddleware(lessMiddleware);
            }
        } catch (error) {
             
        }


        res.send = function( body ){ 
            let parse = template(body);
            parse.compile();
            response.call(this , parse.html() )
        };
 
        next();
    }
}
