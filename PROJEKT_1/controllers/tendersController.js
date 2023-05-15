const tenderService = require('../services/tenderService');
const offerService = require('../services/offerService');

const getActiveTenders = async(req, res) => {
    const allActiveTenders = await tenderService.getAllActiveTenders();
    res.render('activeTenders', {title: 'Przetargi.pl', data: allActiveTenders})
}

const getActiveTender = async(req, res) => {
    const activeTender = await tenderService.getActiveTender(req.params.id);
    res.render('activeTender', {title: 'Przetargi.pl', info: {tender: activeTender, error: null, success:null}})
}

const getCompletedTenders = async (req, res) => {
    const allCompletedTenders = await tenderService.getAllCompletedTenders();
    res.render('completedTenders', {title: 'Przetargi.pl', data: allCompletedTenders})
}

const getCompletedTender = async (req, res) => {
    const completedTender = await tenderService.getCompletedTender(req.params.id);
    const tenderOffers = await offerService.getTenderOffers(req.params.id);
    res.render('completedTender', {title: 'Przetargi.pl', tenderInfo: completedTender, offers: tenderOffers})
}

const getNewTenderForm = async (req, res) => {
    res.render('addTender', {title: 'Przetargi.pl', info: {}});
}

const createNewTender = async (req, res) => {
    const info = await tenderService.createNewTender(req.body)
    res.render('addTender', {title: 'Przetargi.pl', info: info});
}

module.exports = {
    getActiveTenders,
    getActiveTender,
    getCompletedTenders,
    getCompletedTender,
    getNewTenderForm,
    createNewTender
}