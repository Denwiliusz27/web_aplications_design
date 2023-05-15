const offerDao = require('../dao/offerDao')
const tenderService = require("./tenderService");

const createOffer = async (id, bidder, value) => {
    const activeTender = await tenderService.getActiveTender(id);
    if (activeTender.id){
        if (value <= 0 ){
            return {
                tender: activeTender,
                error: 'Wartość oferty powinna być wartością dodatnią',
                success: null
            }
        }

        const offer = await offerDao.createOffer(id, bidder, value)
        if (offer) {
            return {
                tender: activeTender,
                error: null,
                success: true
            }
        } else {
            return {
                tender: activeTender,
                error: null,
                success: false
            }
        }
    } else {
        return {
            tender: {},
            error: null,
            success: false
        }
    }
}

const getTenderOffers = async (id) => {
    return await offerDao.getTenderOffers(id);
}

module.exports = {
    createOffer,
    getTenderOffers,
}
