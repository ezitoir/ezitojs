
const less = require("less");
const path = require("path");
const fs = require("fs");

module.exports = function ( __path ){
    
   fs.readdirSync( __path.src ).forEach(function( __lessfile ){ 
    if(path.extname(__lessfile).toLocaleLowerCase()=='.less'){ 
      var name = path.basename(__lessfile).split('.'); 
      name = name.slice(0 , name.length-1).join('.') + ".css"
      less.render( fs.readFileSync( path.join( __path.src  , __lessfile )  ).toString() , 
                    { paths : [ __path.src  ] , compress:true } ).then(
                      function(data) {
                          fs.writeFileSync( __path.dest  + name , data.css ); 
                      console.log( "less render file " + __lessfile + " success ..." )
                });
    } 
  });
  
}
return;
