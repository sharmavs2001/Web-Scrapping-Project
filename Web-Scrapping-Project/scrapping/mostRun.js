let request = require('request');
let cheerio = require('cheerio');
let fs = require('fs');

let seriesid = process.argv[2];
let matchid = process.argv[3];

let url = `https://www.espncricinfo.com/series/${seriesid}/scorecard/${matchid}/`

request(url, function(error, response, html) {
    if(error == null && response.statusCode == 200) {
        let co = cheerio.load(html);
        // fs.writeFileSync('./abc.html', co('.scorecard-section.bowling tbody tr'));

        let rows = co('.scorecard-section.bowling tbody tr');
        // console.log(rows.length);
        
        let mwb =' ', mw = 0;
        rows.each(function() {
            let wkts = parseInt(co(co(this).find('td')[5]).html(), 10);
            if(wkts > mw){
                mw = wkts;
                mwb = co(co(this).find('td')[0]).text();
            }
        })

        console.log(mwb);
    }
});


