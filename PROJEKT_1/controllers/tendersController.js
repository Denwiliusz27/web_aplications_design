const tenderService = require('../services/tenderService');

const getActiveTenders = async(req, res) => {
    const allActiveTenders = await tenderService.getAllActiveTenders();
    res.render('activeTenders', {title: 'Przetarg.pl', data: allActiveTenders})
}

module.exports = {
    getActiveTenders
}