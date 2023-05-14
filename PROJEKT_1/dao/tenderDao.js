const db = require("../models/sqConfig");
const Tender = db.tender;
const Op = db.Sequelize.Op;

const tenderFindAllActive = () => {
    const now = new Date()
    return Tender.findAll({
        where: {
            end_date: {
                [Op.gte]: now
            }
        },
        order: [
            ['end_date', 'ASC']
        ]
    })
        .then(data => {
            return data.map(function (record) {
                return {
                    id: record.id,
                    title: record.title,
                    contracting_authority: record.contracting_authority,
                    start_date: record.start_date,
                    end_date: record.end_date,
                    max_value: record.max_value,
                    description: record.description,
                    active: new Date(record.start_date) < now,
                }});
        })
        .catch(err => {
            return err.message
        })
}

const getActiveTender = (id) => {
    const now = new Date()

    return Tender.findByPk(id, {
        where: {
            end_date: {
                [Op.lt]: now
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

const tenderFindAllCompleted = () => {
    const now = new Date()
    return Tender.findAll({
        where: {
            end_date: {
                [Op.lt]: now
            }
        },
        order: [
            ['end_date', 'ASC']
        ]
    })
        .then(data => {
            return data;
        })
        .catch(err => {
            return err.message
        })
}

const getCompletedTender = (id) => {
    const now = new Date()

    return Tender.findByPk(id, {
        where: {
            end_date: {
                [Op.lt]: now
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
    tenderFindAllActive,
    getActiveTender,
    tenderFindAllCompleted,
    getCompletedTender,
}
