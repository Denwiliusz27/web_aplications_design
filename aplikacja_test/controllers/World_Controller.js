// tutaj umieszczamy funkcje callbackowe z routera


const getIndex = (req, res) => {
    res.render('index', { title: 'World' , lname: 'world'});
}

// udostępnienie na zewnątrz
module.exports = {
    getIndex,
    // .... kolejne funkcje
}
