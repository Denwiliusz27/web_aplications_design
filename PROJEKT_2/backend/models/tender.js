module.exports = (sequelize, Sequelize) => {
    // model przetargu
    const Tender =  sequelize.define("tender", {
            title: {
                type: Sequelize.STRING,
                allowNull: false
            },
            contracting_authority: {
                type: Sequelize.STRING,
                allowNull: false
            },
            start_date: {
                type: Sequelize.DATE,
                allowNull: false
            },
            end_date: {
                type: Sequelize.DATE,
                allowNull: false
            },
            max_value: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            description: {
                type: Sequelize.STRING,
                allowNull: true
            },
        },
        {
            tableName: 'tender'
        });

    return Tender;
};