const tenderDao = require('../dao/tenderDao');

// pobiera wszystkie aktywne przetargi
const getAllActiveTenders = async () => {
    return await tenderDao.tenderFindAllActive()
}

// pobiera aktywny przetarg o podanym id
const getActiveTender = async (id) => {
    return await tenderDao.getActiveTender(id)
}

// pobiera wszystkie zakończone przetargi
const getAllCompletedTenders = async() => {
    return await tenderDao.tenderFindAllCompleted()
}

// pobiera zakończony przetarg o konkretym id
const getCompletedTender = async(id) => {
    return await tenderDao.getCompletedTender(id)
}

// tworzy nowy przetarg
const createNewTender = async (tender) => {
    return await tenderDao.createNewTender(tender);
}

module.exports = {
    getAllActiveTenders,
    getActiveTender,
    getAllCompletedTenders,
    getCompletedTender,
    createNewTender
}
