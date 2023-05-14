const tenderDao = require('../dao/tenderDao');

const getAllActiveTenders = async () => {
    return await tenderDao.tenderFindAllActive()
}

const getActiveTender = async (id) => {
    return await tenderDao.getActiveTender(id)
}

const getAllCompletedTenders = async() => {
    return await tenderDao.tenderFindAllCompleted()
}

const getCompletedTender = async(id) => {
    return await tenderDao.getCompletedTender(id)
}

module.exports = {
    getAllActiveTenders,
    getActiveTender,
    getAllCompletedTenders,
    getCompletedTender,
}