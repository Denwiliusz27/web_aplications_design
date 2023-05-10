const tenderService = require('../services/tenderService');

const getTenders = async(req, res) => {
    const allTenders = await tenderService.getAllTenders();
    res.json(allTenders)
}

module.exports = {
    getTenders
}