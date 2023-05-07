const db = require("../models/sqConfig");
const User = db.user;
const Op = db.Sequelize.Op;

const userFindAll = () => {
    const name = 'An';                              An + % - reszta dowolna
    let condition = name ? { name: { [Op.like]: `${name}%` } } : null;
    //let condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

    return User.findAll({ where: condition })
        //return User.findAll()
        .then(data => {
            //console.log(data);
            return data ;
        })
        .catch(err => {
            return err.message
        });
};

const userFindAll1 = async () => {
    let data = [];
    try {
        data = await User.findAll();
    }
    catch(e) {
        console.log(e)
    }
    return data
};

module.exports = {
    userFindAll,
    userFindAll1
}