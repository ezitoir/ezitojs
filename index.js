

const express = require("express");
const exhnbs  = require("express-handlebars");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressMiddleware = require("express-middleware");
const expressSession = require("express-session");
const expressSslify = require("express-sslify");
const http = require("http");
const https = require("https");
const httpErrors = require("http-errors");
const less = require("less");
const multer = require("multer");
const mysql = require("mysql");
const nodeHtmlParser = require("node-html-parser");
const socketio = require("socket.io");
const fs = require("fs");
const path = require("path");
const morgan = require("morgan");
const redis = require("redis");
const connectRedis = require("connect-redis");
const ioredis = require("ioredis");
const shelljs =  require("shelljs");

module.exports = function ( config ){
    return require("./server/config/server-config")(
        {        
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
            morgan,
            redis ,
            connectRedis,
            ioredis ,
            shelljs,
            fs ,
            path ,
            __dirname
        },

        config 
    );
}
