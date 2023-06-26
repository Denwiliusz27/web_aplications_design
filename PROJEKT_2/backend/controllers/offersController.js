const offerService = require("../services/offerService")

// tworz nową ofertę dla danego przetargu
const addOffer = async (req, res) => {
    const addedInfo = await offerService.createOffer(req.params.id, req.body.bidder, req.body.value);
    res.render('activeTender', {title: 'Przetargi.pl', info: addedInfo })
}

module.exports = {
    addOffer,
}