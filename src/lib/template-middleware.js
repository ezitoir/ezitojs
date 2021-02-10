
// -------------- 
const fs = require('fs');
const HTMLParser = require('node-html-parser');

let custom = {

    config : {},

    "<HeadSetting/>" : function ( document , HTMLParser ){
        var head = [].slice.call(document.querySelectorAll("head"))[0];
        var headSetting = [].slice.call(document.querySelectorAll("HeadSetting"));

        headSetting.forEach( element => {
            [].slice.call(element.querySelectorAll("*")).forEach(( __node )=>{
                head.appendChild(__node);
            });
            element.remove();
        });

        setTimeout(() => {
            delete head;
            delete headSetting; 
        }, 1500);
    },

    "<Links/>" : function( document , HTMLParser){
        var body = [].slice.call(document.querySelectorAll("body"));
        var  links = [].slice.call( document.querySelectorAll("linkroute"));
        
        body.forEach( ( __body ) => {  
            links.forEach( __link => {
                //__link.remove();
                var newRoute = HTMLParser.parse('<div></div>').firstChild;

                newRoute.setAttribute("type" , "ezito@singelpage-support");
                
                [].slice.call( __link.querySelectorAll("a")).forEach( __a => { 
                    newRoute.appendChild(__a);
                    __link.insertAdjacentHTML( 'afterend' , newRoute);
                    __link.remove();
                }) 
                
            }); 
        });

        setTimeout(() => {
            delete body;
            delete links;
        }, 1500);
    },
 
}

function parser  ( body ){

    let document = HTMLParser.parse(body);
    let html = '';
    return { 
 
        compile : function (){  

            //document.removeWhitespace();
            custom["<HeadSetting/>"].call( this , document , HTMLParser);
            custom["<Links/>"].call(this , document , HTMLParser);

            html = document.innerHTML ;
        },

        html : function (){
            return html;
        }
 
    };
}

module.exports = parser;