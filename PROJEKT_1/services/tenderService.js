const tenderDao = require('../dao/tenderDao');

const getAllActiveTenders = async () => {
    return await tenderDao.tenderFindAllActive()
}

module.exports = {
    getAllActiveTenders,
}