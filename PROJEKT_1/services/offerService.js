const offerDao = require('../dao/offerDao')

const createOffer = async (id, bidder, value) => {
    const offer = await offerDao.createOffer(id, bidder, value)
    if (offer) {
        return true
    } else {
        return false
    }
}

module.exports = {
    createOffer,
}
