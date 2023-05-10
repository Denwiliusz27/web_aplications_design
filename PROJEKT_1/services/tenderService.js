const tenderDao = require('../dao/tenderDao');

const getAllTenders = async () => {
    return await tenderDao.tenderFindAll()
}

module.exports = {
    getAllTenders,
}