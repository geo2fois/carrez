var scrapLBC = require('./lbc');
var scrapMA = require('./MA');
var express = require('express');
var app = express();
var fs = require("fs");
//var bodyParser = require('body-parser');

/*
//Define the port to run on
app.set('port', 3000);
//Get static directory
app.use(express.static(path.join(__dirname, 'carrez')));

var server = app.listen(app.get('port'), function() {
	var port = server.address().port;
	console.log('Something happened on the port: ' + port);
	Action();
});
*/
//console.log(getLBCjson());
//console.log(scrapLBC.getLBCjson().price);
console.log("");
console.log("----------------------");
console.log("");
console.log("Url leboncoin of the announcement:");
console.log(scrapLBC.url_lbc);
console.log("");
console.log("Url meilleurs agents taking the announcement's town & zipcode:")
console.log(scrapMA.url_MA);
console.log("");
console.log("----------------------");
console.log("");


var deal;
var pricem2 = scrapLBC.getLBCjson().price / scrapLBC.getLBCjson().area;
console.log("Square meter price of the announcement: " + pricem2 + " euro");
console.log("Average house's square meter price of " + scrapLBC.getLBCjson().town + " is: " + scrapMA.getMAjson().avghouseprice + " euro");

if (pricem2 <= (scrapMA.getMAjson().avghouseprice * 80/100)){
    deal = "    ===> It's a very good deal ! \n The Square meter price is at least 20% cheaper comparing to the average square meter price of the town";
}
else if (pricem2 <= (scrapMA.getMAjson().avghouseprice * 90/100)){
    deal = "    ===> It's a good deal ! \n The Square meter price is at least 10% cheaper comparing to the average square meter price of the town";
}
else if (pricem2 > (scrapMA.getMAjson().avghouseprice * 90/100) && pricem2 <= (scrapMA.getMAjson().avghouseprice * 110/100)){
    deal = "    ===> It's a normal deal";
}
else{
    deal = "    ===> WARNING: It's a bad deal ! ABORT MISSION... ABORT \n The Square meter price is at least 20% higher comparing to the average square meter price of the town";
}
console.log("");
console.log(deal);
console.log("");

//console.log(getLBCjson().LBCdata);
//console.log(MAdata);
//console.log(LBCdata);
/*
app.get("/", function(req, res) {
    res.send("<form method=\"POST\" action=\"\"><input type=\"submit\"></form>");
})*/
app.get('/', function (req, res) {
    console.log('Target aquired !');
    var contents = fs.readFileSync('./index.html').toString();
    res.writeHead(200, {
        'Content-Type': 'text/html',
        'Content-Length': contents.length
    });
    res.write(contents);
    res.end();
});

app.post("/", function(req, res) {
    res.send("Form has been sent");
})

app.get("/page2", function(req, res) {
    res.send("Hello from page 2");
})

var server = app.listen(3000, function() {
//    console.log("Server is listening on localhost/3000");
})

