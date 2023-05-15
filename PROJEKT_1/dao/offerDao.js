const db = require("../models/sqConfig");
const {Sequelize} = require("sequelize");
const Offer = db.offer;
const Tender = db.tender;
const Op = db.Sequelize.Op;

const createOffer = (id, bidder, value) => {
    const offer = {
        bidder: bidder,
        value: value,
        date: new Date(),
        tender_id: id
    }

    return Offer.create(offer)
        .then(data => {
            return data.dataValues;
        })
        .catch(() => {
            return null;
        })
}

const getTenderOffers = (id) => {
    return Offer.findAll({
        where: {
            tender_id: id,
            value: {
                [Op.lte]: Sequelize.col('tender.max_value')
            }
        },
        order: [
            ['value', 'ASC']
        ],
        include:[{
            model: Tender,
            where: {
                id: id
            },
            required: false
        }]
    })
}

module.exports = {
    createOffer,
    getTenderOffers,
}