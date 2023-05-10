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
    },
    define: {
        timestamps: false
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Modele danych
db.offer = require("./offer.js")(sequelize, Sequelize);
db.tender = require("./tender.js")(sequelize, Sequelize);

// - Powiazania bazodanowe pomiedzy modelami
// db.tender.hasMany(db.offer); // jeden - do wielu (1-N)
// db.offer.belongsTo(db.tender); // zwiazek encji

db.sequelize.sync({force: false}) // false - nienadpisuje struktury bazy
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    })

module.exports = db;