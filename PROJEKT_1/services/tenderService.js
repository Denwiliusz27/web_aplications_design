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

const createNewTender = async(tender) => {
    const info = {
        timeError: '',
        valueError: '',
    }

    if (new Date(tender.start_date) >= new Date(tender.end_date)){
        info.timeError = 'Czas rozpoczęcia przetargu nie może być późniejszy niż czas jego zakończenia';
    }

    if (new Date() > new Date(tender.start_date)){
        info.timeError = 'Czas zakończenia przetargu nie może być datą przeszłą';
    }

    if (tender.max_value <= 0){
        info.valueError = 'Maksymalna wartość dla przetargu powinna być wartością dodatnią';
    }

    console.log(info.timeError + ", " + info.valueError)

    const newTender = await tenderDao.createNewTender(tender)
    if (newTender){
        return {
            timeError: info.timeError,
            valueError: info.valueError,
            success: true
        };
    } else {
        return {
            timeError: info.timeError,
            valueError: info.valueError,
            success: false
        };
    }
}

module.exports = {
    getAllActiveTenders,
    getActiveTender,
    getAllCompletedTenders,
    getCompletedTender,
    createNewTender
}