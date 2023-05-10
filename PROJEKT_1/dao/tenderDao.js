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

const tenderFindAllActive = () => {
    const now = new Date()
    return Tender.findAll({
        where: {
            end_date: {
                [Op.gte]: now
            }
        }
    })
        .then(data => {
            return data;
        })
        .catch(err => {
            return err.message
        })
}

module.exports = {
    tenderFindAll,
    tenderFindAllActive,
}
