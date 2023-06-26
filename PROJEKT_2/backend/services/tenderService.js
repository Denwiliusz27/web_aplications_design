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
    const info = {
        timeError: '',
        valueError: '',
        success: true
    };

    if (new Date(tender.start_date) >= new Date(tender.end_date)) {
        info.endTimeError = 'Czas rozpoczęcia przetargu nie może być późniejszy niż czas jego zakończenia';
        info.success = false;
    } else if (new Date() >= new Date(tender.end_date)) {
        info.endTimeError = 'Czas zakończenia przetargu nie może być datą przeszłą';
        info.success = false;
    } else if  (new Date() >= new Date(tender.start_date)) {
        info.startTimeError = 'Czas rozpoczęcia przetargu nie może być datą przeszłą';
        info.success = false;
    }

    if (tender.max_value <= 0) {
        info.valueError = 'Maksymalna wartość przetargu powinna być wartością dodatnią';
        info.success = false;
    }

    if (!info.success) {
        return info;
    } else {
        const newTender = await tenderDao.createNewTender(tender);
        if (newTender) {
            return {
                success: true
            };
        } else {
            return {
                success: false
            };
        }
    }
}

module.exports = {
    getAllActiveTenders,
    getActiveTender,
    getAllCompletedTenders,
    getCompletedTender,
    createNewTender
}