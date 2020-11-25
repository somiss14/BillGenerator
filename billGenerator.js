const fs = require('fs');

function readProductsFromJson(){
    const data = fs.readFileSync('products.json', 'utf8');
    return JSON.parse(data);
}

function readBasketFromJson(){
    const data2 = fs.readFileSync('basket.json', 'utf8');
    return JSON.parse(data2);
}

try {

    let basket = readBasketFromJson();

    let products = readProductsFromJson();

    let bill = 0;

    let dict = {};

    function countYourBill (){

        for (let i = 0; i < basket.length; i++) {
            if(basket[i] in dict){
                dict[basket[i]] ++;
            }
            else{
                dict[basket[i]] = 1;
            }
        }
        for(let key in dict) {
            let value = dict[key];
            products.find(x =>{ if(x.promo === 0 && key == x.barcode) { (bill += value*x.price)}});
            products.find(x =>{ if(x.promo !== 0 && key == x.barcode && (value % x.promoAmount === 0)) {(bill += value/x.promoAmount*x.promo)}});
            products.find(x =>{ if(x.promo !== 0 && key == x.barcode && (value % x.promoAmount !== 0)) {(bill += Math.floor(value/x.promoAmount)*x.promo + (value - Math.floor(value/x.promoAmount) * x.promoAmount)* x.price)}});
        }
        console.log("Your bill is: " + bill);
    }

} catch (err) {
    console.log(`Error reading file from disk: ${err}`);
}

countYourBill();