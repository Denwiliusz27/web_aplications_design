const offerDao = require('../dao/offerDao')
const tenderService = require("./tenderService");
const ServerError = require("../errors/ServerError");

// tworzy nową ofertę dla przetargu o podanym id
const createOffer = async (id, bidder, value) => {
    const activeTender = await tenderService.getActiveTender(id);
    if (activeTender.id){
        return  await offerDao.createOffer(id, bidder, value)
    } else {
        throw new ServerError("getActiveTender() error", 500)
    }
}

// pobiera oferty dla danego przetargu
const getTenderOffers = async (id) => {
    return await offerDao.getTenderOffers(id);
}

module.exports = {
    createOffer,
    getTenderOffers,
}
