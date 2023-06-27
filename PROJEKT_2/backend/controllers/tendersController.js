const tenderService = require('../services/tenderService');
const offerService = require('../services/offerService');
const {all} = require("express/lib/application");

// pobiera aktywne przetargi
const getActiveTenders = async(req, res) => {
    try {
        const allActiveTenders = await tenderService.getAllActiveTenders();
        res.status(200).json({status:200, data: allActiveTenders})
    } catch(e) {
        res.status(e.code).json({status:e.code})
    }
}

// pobiera informacje o danym przetargu
const getActiveTender = async(req, res) => {
    try {
        const activeTender = await tenderService.getActiveTender(req.params.id);
        res.status(200).json({status:200, data: activeTender})
    } catch(e) {
        res.status(e.code).json({status:e.code})
    }

}

// pobiera zakończone przetargi
const getCompletedTenders = async (req, res) => {
    try {
        const allCompletedTenders = await tenderService.getAllCompletedTenders();
        res.status(200).json({status:200, data: allCompletedTenders})
    } catch(d) {
        res.status(e.code).json({status:e.code})
    }

}

// pobiera informacje o danym zakończonym przetargu //  oraz oferty dla niego przypisane
const getCompletedTender = async (req, res) => {
    try {
        const completedTender = await tenderService.getCompletedTender(req.params.id);
        res.status(200).json({status:200, data: completedTender})
    } catch(e) {
        res.status(e.code).json({status:e.code})
    }
}


// tworzy nowy przetarg
const createNewTender = async (req, res) => {
    try {
        const info = await tenderService.createNewTender(req.body)
        res.status(200).json({status:200, message: info})
    } catch(e) {
        res.status(e.code).json({status:e.code})
    }
}

module.exports = {
    getActiveTenders,
    getActiveTender,
    getCompletedTenders,
    getCompletedTender,
    createNewTender
}
