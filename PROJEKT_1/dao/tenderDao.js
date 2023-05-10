const db = require("../models/sqConfig");
const Tender = db.tender;
const Op = db.Sequelize.Op;

const tenderFindAll = async () => {
    let data = [];
    try {
        data = await Tender.findAll();
    } catch(e) {
        console.log(e)
    }
    return data
};

module.exports = {
    tenderFindAll,
}
