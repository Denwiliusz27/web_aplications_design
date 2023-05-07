// ustawiam relacje między danymi

const dbConfig = require("./config/db.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Modele danych
db.user = require("./user.js")(sequelize, Sequelize);
db.blog = require("./blog.js")(sequelize, Sequelize);

// - Powiazania bazodanowe pomiedzy modelami
db.user.hasMany(db.blog); // jeden - do wielu (1-N)
db.blog.belongsTo(db.user); // zwiazek encji

db.sequelize.sync({force: false}) // false - nienadpisuje struktury bazy
    .then(() => {                 // true - za każdym razem tabelka jest usuwana
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    })

module.exports = db;