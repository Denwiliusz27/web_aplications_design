const offerDao = require('../dao/offerDao')
const tenderService = require("./tenderService");

// tworzy nową ofertę dla przetargu o podanym id
const createOffer = async (id, bidder, value) => {
    const activeTender = await tenderService.getActiveTender(id);
    if (activeTender.id){
        const offer = await offerDao.createOffer(id, bidder, value)
        if (offer) {
            return {
                offer: offer,
                error: null,
                success: true
            }
        } else {
            return {
                offer: null,
                error: null,
                success: false
            }
        }
    } else {
        return {
            offer: null,
            error: null,
            success: false
        }
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
