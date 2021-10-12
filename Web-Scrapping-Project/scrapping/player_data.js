let request = require("request");
let cheerio = require("cheerio");
// let fs = require("fs");

let seriesid = process.argv[2];

let url = `https://www.espncricinfo.com/scores/series/${seriesid}/`

let players = [];

request(url, summarySeries)

let count = 0;
function summarySeries(error, reponse, html) {
    let co = cheerio.load(html);

    let rows = co('.cscore.cscore--final.cricket');
    // console.log(rows.length);

    for (let x = 0; x < rows.length; x++) {
        let match = co(rows[x]);
        let format = match.find('.cscore_info-overview').html();
        if (!format.includes('T20I') && !format.includes('ODI')) continue;
        let suburl = co(rows[x]).find('.cscore_list a').attr('href');
        let innerUrl = `https://www.espncricinfo.com` + suburl;
        // console.log(innerUrl);
        count++;
        request(innerUrl, summayPageURL);
    }

}

function summayPageURL(error, response, html) {
    if (!error && response.statusCode == 200) {
        let co = cheerio.load(html);
        let format = co('.cscore_info-overview').html().includes("T20I") ? 'T20I' : 'ODI';
        x
        let rows = co('.sub-module.scorecard');
        for (let x = 0; x < rows.length; x++) {
            let team = co(rows[x]).find('.accordion-header h2').html().includes('Ind') ? 'India' : 'New Zealand';

            let totalPlayers = co(rows[x]).find('.wrap.batsmen');

            for (let y = 0; y < totalPlayers.length; y++) {
                let player = co(totalPlayers[y]).find('.cell.batsmen a').attr("title").replace('View the player profile of ', '');
                let runs = parseInt(co(totalPlayers[y]).find('.cell.runs').html(), 10);
                // console.log(`${player}\t${format}\t${team}\t${runs}`)
                handelArray(player, runs, team, format);
            }
        }
        count--;
        if (count == 0)
            console.table(players);
    }
}

function handelArray(name, rs, team, format) {

    for (let x = 0; x < players.length; x++) {
        if (players[x].name == name && players[x].format == format && players[x].team == team) {
            players[x].rs += rs;
            return
        }
    }

    var po = {};
    po.team = team;
    po.rs = rs;
    po.format = format;
    po.name = name;
    players.push(po);

}
