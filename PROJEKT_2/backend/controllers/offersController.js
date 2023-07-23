const offerService = require("../services/offerService")

// stworz nową ofertę dla danego przetargu
const addOffer = async (req, res) => {
    try {
        const addedInfo = await offerService.createOffer(req.params.id, req.body.bidder, req.body.value);
        res.status(200).json({ data: addedInfo})
    } catch (e) {
        res.status(e.code).json({status: e.code})
    }
}

// pobierz oferty dla danego przetargu
const getOffersForTender = async (req, res) => {
    try {
        const tenderOffers = await offerService.getTenderOffers(req.params.tender_id);
        res.status(200).json(tenderOffers)
    } catch (e) {
        res.status(e.code).json({status: e.code})
    }
}

module.exports = {
    addOffer,
    getOffersForTender
}
