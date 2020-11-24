let bill = 0;
let beerAmount = 0;
let eggsAmount = 0;
let chocolateAmount = 0;

const fs = require('fs');

try {

    const data = fs.readFileSync('products.json', 'utf8');

    const productss = JSON.parse(data);

    const data2 = fs.readFileSync('basket.json', 'utf8');

    const baskett = JSON.parse(data2);

    let basket = baskett;

    function countYourBill (){

        for (let i = 0; i <= basket.length; i++) {
            if (basket[i] === 1001) {
                beerAmount++;
            }
            if (basket[i] === 3401) {
                chocolateAmount++;
            }
            if (basket[i] === 1243) {
                eggsAmount++;
            }
        }

        let result = (beerAmount % 2 === 0) ? "even" : "odd";
        let result2 = (eggsAmount % 10 === 0) ? "divisible" : "non";

        if (result === "even") {
            bill += beerAmount/2*productss[1].price;
        }
        if (result === "odd") {
            bill += (beerAmount - 1)/2*productss[1].price + productss[0].price;
        }
        if (result2 === "divisible") {
            bill += eggsAmount/10*productss[3].price;
        }
        if (result2 === "non") {
            let temp = parseInt((eggsAmount / 10).toString());
            bill += temp * productss[3].price + (eggsAmount - temp * 10) * productss[2].price;
        }
        bill += chocolateAmount * productss[4].price;

        console.log("Total bill: " + bill);
    }


} catch (err) {
    console.log(`Error reading file from disk: ${err}`);
}

countYourBill();