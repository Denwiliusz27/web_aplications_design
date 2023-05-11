const tenderDao = require('../dao/tenderDao');

const getAllActiveTenders = async () => {
    return await tenderDao.tenderFindAllActive()
}

const getActiveTender = async (id) => {
    return await tenderDao.getActiveTender(id)
}

module.exports = {
    getAllActiveTenders,
    getActiveTender,
}