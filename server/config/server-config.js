const { requestId } = require("express-middleware");

module.exports = function ( config ){
    let { 
        express  , 
        exhnbs  , 
        bodyParser , 
        cookieParser , 
        expressMiddleware,
        expressSession ,
        expressSslify ,
        http ,
        https ,
        httpErrors ,
        less ,
        multer ,
        mysql ,
        nodeHtmlParser ,
        socketio ,
        morgan ,
        redis ,
        connectRedis,
        ioredis,
        shelljs,
        fs ,
        path ,
        __dirname
    } = config;
    

  
    // create ssl cerfiticate
    shelljs.exec("chmod 755 ./server/ssl/gc.sh"); 
    shelljs.exec("./server/ssl/gc.sh");

    const SESS_TOW_HOURS = 1000 * 60 * 60 * 2;

    const {
        httpPort = 3000,
        httpsPort = 3001,
        NODE_ENV  = "development" ,

        /* session  */
        SESS_LIFETIME = SESS_TOW_HOURS ,
        SESS_NAME = "sid",
        SESS_SECRET = "ssh!quiet,it\'asecret",
    } = process.env;
    
    const IN_PROC = NODE_ENV === 'production';
     

    const app = express();
    const env = app.get('env'); 
    const httpServer = http.createServer( app) ;
    const httpsServer = https.createServer({
        key : fs.readFileSync( __dirname + '/server/ssl/out/server.key' ) ,
        cert :fs.readFileSync(__dirname + '/server/ssl/out/server.crt' ) 
    } ,app);
    const io = socketio(httpServer); 
    




    
    // express app setting
    app.set('root' , __dirname );
    app.use(expressSslify.HTTPS({ trustProtoHeader: true }));

    
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended : false , limit: '5MB', parameterLimit:1000 }));

    // trust proxy for session setting
    if( env == "production"){
        app.enable('trust proxy');
        app.set('trust proxy', 1);
    }
    // using session 
    app.use(expressSession({
        secret: "telifo app for singed cookie ...",
        httpOnly: true,  // Don't let browser javascript access cookies.
        path : "/tmp", 
        resave: false ,
        saveUninitialized: false,
        store: null , 
        cookie: {
           secure: true , 
           isAuth : true , 
           maxAge : SESS_TOW_HOURS
        }
    }));
 


   

    Object.defineProperty( app , "run" , {
        value : function ( config ) {
            let { http  , https  } = config ; 
            !http ? http = {} : '';
            !https ? https = {} : '';

            if(!http.off)
            httpServer.listen( http.port || httpPort ,  http.callback  || function(){
                console.log("http server runing on port " + (http.port || httpPort) + " ...")
            });

            if(!https.off)
            httpsServer.listen( https.port || httpsPort , https.callback || function(){
                console.log("http server runing on port " + (https.port || httpsPort ) + " ...")
            });

        }
    });

    return app;
};