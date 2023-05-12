const db = require("../models/sqConfig");
const Offer = db.offer;
const Op = db.Sequelize.Op;

const createOffer = (id, bidder, value) => {
    const offer = {
        bidder: bidder,
        value: value,
        date: new Date(),
        tender_id: id
    }

    console.log("[ " + bidder + ", " + value + ", " +id+"]")

    return Offer.create(offer)
        .then(data => {
            return data.dataValues;
        })
        .catch(() => {
            return null;
        })
}

module.exports = {
    createOffer,
}