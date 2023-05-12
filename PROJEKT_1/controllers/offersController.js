const offerService = require("../services/offerService")
const tenderService = require("../services/tenderService");

const addOffer = async (req, res) => {
    const addedSuccess = await offerService.createOffer(req.params.id, req.body.bidder, req.body.value);
    const activeTender = await tenderService.getActiveTender(req.params.id);
    res.render('activeTender', {title: 'Przetargi.pl', data: activeTender , success: {created: addedSuccess ? true:  ''}})
}

module.exports = {
    addOffer,
}