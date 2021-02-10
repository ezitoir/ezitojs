


module.exports = function ( req ,res , next ){
      
    let {
        __dirname
    } = config ;
    var __basedir = path.join( __dirname , "public" , "custom" , "less" , ); 
    const __file = fs.readdirSync( path.join( __dirname , "public" , "custom" , "less" ));
    __file.forEach(function( __lessfile ){ 
      if(path.extname(__lessfile).toLocaleLowerCase()=='.less'){ 
        var name = path.basename(__lessfile); 
        less.render( fs.readFileSync( path.join( __basedir , __lessfile )  ).toString() , { paths: [ __basedir ] ,compress:true}).then(function(data) {
          fs.writeFileSync(__dirname + '/public/files/links/style/base/main/' + name + ".css" , data.css ); 
          console.log( "less render file " + __lessfile + " success ..." )
        });
      } 
    });
    next();
}