let request = require("request");
let cheerio = require("cheerio");
let fs = require("fs");

let seriesid = process.argv[2];
let commentryid = process.argv[3];
let team = process.argv[4];
let url = `https://www.espncricinfo.com/series/${seriesid}/commentary/${commentryid}/`

request(url, handelSummaryCB);

function handelSummaryCB(error, response, html) {
    let co = cheerio.load(html);
    let nurl = co(co('.filters .dropdown-menu.med')[0]).find('li a');
    if(co(nurl[0]).html().includes(team)) {
        let iurl = 'https://www.espncricinfo.com' + co(nurl[0]).attr('href');
        request(iurl, handelInningsCB);
    }
    else {
        let iurl = 'https://www.espncricinfo.com' + co(nurl[1]).attr('href');
        request(iurl, handelInningsCB);
    }

}

function handelInningsCB(error, response, html) {
    if(error == null && response.statusCode == 200) {
        fs.writeFileSync('abc.html', html); 
    }
}