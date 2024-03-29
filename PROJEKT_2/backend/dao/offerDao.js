const db = require("../models/sqConfig");
const {Sequelize} = require("sequelize");
const ServerError = require("../errors/ServerError");
const Offer = db.offer;
const Tender = db.tender;
const Op = db.Sequelize.Op;

// tworzy nową ofertę dla danego przetargu
const createOffer = (id, bidder, value) => {
    const offer = {
        bidder: bidder,
        value: value,
        date: new Date(),
        tender_id: id
    }

    return Offer
        .create(offer)
        .then(data => {
            return data.dataValues;
        })
        .catch(() => {
            return new ServerError("createOffer() error", 500);
        })
}

// zwraca oferty dla danego przetargu
const getTenderOffers = (id) => {
    return Offer
        .findAll({
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
        .catch(() => {
            return new ServerError("getTenderOffers() error", 500);
        })
}

module.exports = {
    createOffer,
    getTenderOffers,
}
