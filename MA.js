    var scrapLBC = require('./lbc');
    var url_MA = "https://www.meilleursagents.com/prix-immobilier/" + scrapLBC.getLBCjson().town + "-" + scrapLBC.getLBCjson().zipcode;

function getMAjson(){

    var request = require('syncrequest');
    var cheerio = require('cheerio');
    var fs = require("fs");
   // var url_MA = "https://www.meilleursagents.com/prix-immobilier/massy-91300";
    var MAdata = JSON.parse(fs.readFileSync('MA.json', 'utf8'));;

    headers = {
        'User-Agent':       'Super Agent/0.0.1',
        'Content-Type':     'application/x-www-form-urlencoded'
      };

    options = {
        url: url_MA,
        method: 'GET',
        headers: headers
    };

    var res = request.sync(options);
    var $ = cheerio.load(res.response.body);
    MAdata.avgapartmentprice = parseFloat($("div.medium-uncollapse:nth-child(2) > div:nth-child(3)").text().replace(/ /g, "").replace(/\n/g, '').replace(/\s+/g,"").replace("€",""));
    MAdata.avghouseprice = parseFloat($("div.medium-uncollapse:nth-child(3) > div:nth-child(3)").text().replace(/ /gi, '').replace(/\n/g, '').replace(/\s+/g,"").replace("€",""));

    //console.log("Town: ", data.town);
    //console.log("Real estate type: ", data.real_estate_type);
    //console.log("Area in square meter: ", data.area);
    //console.log("Price: ", data.price);
    //console.log(LBCdata);
   // return LBCdata;

    //console.log(LBCdata);
    return MAdata;

}
exports.url_MA = url_MA;
exports.getMAjson = getMAjson;