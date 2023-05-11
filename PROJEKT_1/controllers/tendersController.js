const tenderService = require('../services/tenderService');

const getActiveTenders = async(req, res) => {
    const allActiveTenders = await tenderService.getAllActiveTenders();
    res.render('activeTenders', {title: 'Przetargi.pl', data: allActiveTenders})
}

const getActiveTender = async(req, res) => {
    const activeTender = await tenderService.getActiveTender(req.params.id);
    res.render('activeTender', {title: 'Przetargi.pl', data: activeTender})
}

module.exports = {
    getActiveTenders,
    getActiveTender
}