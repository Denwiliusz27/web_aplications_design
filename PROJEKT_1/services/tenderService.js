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

    console.log(info.timeError + ', ' + info.valueError);

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