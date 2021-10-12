let request = require('request');
let cheerio = require('cheerio');
// let fs = require('fs');

let seriesid = process.argv[2];
let commentryid = process.argv[3];

let url = `https://www.espncricinfo.com/series/${seriesid}/commentary/${commentryid}/`

request(url, function(error, response, html) {
    if(error == null && response.statusCode == 200) {
        let co = cheerio.load(html);
        

        let rows = co('.item-wrapper .description');
        // fs.writeFileSync('./abc.html', co('.item-wrapper .description'));
        // console.log(rows.length);
        console.log(co(rows[0]).text());
    }
});


