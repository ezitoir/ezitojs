 
 const { template , createLessMiddleware } = require("./src/core");
 

module.exports = function ( config ){
    let { static , __dirname , lessMiddleware } = config;
    

    return function ( req, res ,next) {
        let response = res.send ;
        
        //
        try {
            createLessMiddleware(lessMiddleware);
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
