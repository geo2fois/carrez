//var url_lbc = "https://www.leboncoin.fr/ventes_immobilieres/1087365314.htm?ca=12_s";
var url_lbc = "https://www.leboncoin.fr/ventes_immobilieres/1091017843.htm?ca=12_s";

function getLBCjson(){

    var request = require('syncrequest');
    var cheerio = require('cheerio');
    var fs = require("fs");
    var LBCdata = JSON.parse(fs.readFileSync('LBC.json', 'utf8'));;

    headers = {
        'User-Agent':       'Super Agent/0.0.1',
        'Content-Type':     'application/x-www-form-urlencoded'
      };

    options = {
        url: url_lbc,
        method: 'GET',
        headers: headers
    };

    var res = request.sync(options);
    var $ = cheerio.load(res.response.body);
    LBCdata.address = $("div.line:nth-child(6) > h2:nth-child(1) > span:nth-child(2)").text();
    LBCdata.town = LBCdata.address.split(" ")[0].toLowerCase();
    LBCdata.zipcode = LBCdata.address.split(" ")[1].replace("\n","");
    LBCdata.real_estate_type = $("div.line:nth-child(7) > h2:nth-child(1) > span:nth-child(2)").text();
    LBCdata.area = parseFloat($("div.line:nth-child(9) > h2:nth-child(1) > span:nth-child(2)").text());
    LBCdata.price  = parseFloat($(".item_price")[0].attribs.content);
    //console.log("Town: ", LBCdata.town);
    //console.log("Real estate type: ", dLBCdata.real_estate_type);
    //console.log("Area in square meter: ", LBCdata.area);
    //console.log("Price: ", LBCdata.price);

    //console.log(LBCdata);
    return LBCdata;

}

exports.getLBCjson = getLBCjson;
exports.url_lbc = url_lbc;

