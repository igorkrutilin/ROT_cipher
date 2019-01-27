const lineReader = require('line-reader');
const encrypt    = require("./encrypt");

let data = new Array();
lineReader.eachLine('./data.txt', function(line) {
    data.push(line);
});

setTimeout(function() {
    let language = data[0];
    let text     = data[1];
    let cipher   = data[2];

    console.log("Result:");
    console.log(encrypt(language, text, cipher));
}, 1000);
