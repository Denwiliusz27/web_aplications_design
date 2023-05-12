const offerService = require("../services/offerService")

const addOffer = async (req, res) => {
    const data = await offerService.createOffer(req.params.id, req.body.bidder, req.body.value);
    console.log(data ? "dodano" : "cos nie");
}

module.exports = {
    addOffer,
}