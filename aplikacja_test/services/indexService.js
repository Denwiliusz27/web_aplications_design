
// fetch("adres", obiekt z ustawieniami...)


const getCurrencyData = (currency) => {
    const url = "http://api.nbp.pl/api/exchangerates/rates/a/" + currency + "/?format=json";
    console.log("URL: " + url);

    return fetch(url)
        .then((response) => response.json())
        .then((data) => {
            return data;
        })
        .catch((error) => {
            return error;
        });
}

module.exports = {
    getCurrencyData
}