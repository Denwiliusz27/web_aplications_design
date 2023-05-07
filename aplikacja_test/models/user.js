module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", { // sam tworzy klucz główny (id)
        name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        }
    });
    return User;
};