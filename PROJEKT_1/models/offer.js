module.exports = (sequelize, Sequelize) => {
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
            tender_i: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
        },
        {
            tableName: 'offer'
        });

    return Offer;
};