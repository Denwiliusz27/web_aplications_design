// tutaj umieszczamy funkcje callbackowe z routera

// funkcja realizujaca jedną funkcjonalność

const indexService = require('../services/indexService')

const getIndex = (req, res) => {
    // service layer - w nim: api.nbp.pl , pobrać dane
    res.render('index', { title: 'siemanko' , lname: 'Mareczek'});
}

const getForm = (req, res) => {
    res.render('currencyForm', {currency: '', value: ''}); //, {value: req.body.currency});
}


// wywołanie asynchroniczne
const getCurrency = async (req, res) => {
    // wskazuje co ma się wywołać asynchronicznie
    // wprogram zatrzymuje się na zmiennej, dopiero gdy zostanie wypełniona pójdzie dalej
    const value = await indexService.getCurrencyData(req.body.currency)
    console.log("otrzymałem: " + value)
    res.render('currencyForm', {currency: req.body.currency, value: value.rates[0].mid});
}


// udostępnienie na zewnątrz
module.exports = {
    getIndex,
    getForm,
    getCurrency
    // .... kolejne funkcje
}
