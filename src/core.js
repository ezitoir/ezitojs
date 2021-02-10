const httpError= require("http-errors");
const fs = require("fs");

module.exports =  {
    template : require("./lib/template-middleware"),
    createLessMiddleware : require("./lib/less-middleware"),
}; 


