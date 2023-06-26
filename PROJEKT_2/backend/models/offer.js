module.exports = (sequelize, Sequelize) => {
    // model oferty przetargowej
    const Offer = sequelize.define("offer", {
            bidder: {
                type: Sequelize.STRING,
                allowNull: false
            },
            date: {
                type: Sequelize.DATE,
                allowNull: false
            },
            value: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            tender_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
        },
        {
            tableName: 'offer'
        });

    return Offer;
};