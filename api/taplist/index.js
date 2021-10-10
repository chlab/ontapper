const fetch = require('node-fetch');

module.exports = async function (context) {
    const response = await fetch('https://www.solvaris.ch/ontap/taplist.asp');
    const taplist = await response.json();
    const beers = [];
    for (let i = 1; i < 13; i++) {
        beers.push({
            name: taplist[`biername${i}`],
            abv: taplist[`abv${i}`],
            style: taplist[`bierstil${i}`],
            brewery: taplist[`brauerei${i}`],
            country: taplist[`herkunft${i}`]
        });
    }
    context.res = {
        body: {
            taplist: beers
        }
    };
}