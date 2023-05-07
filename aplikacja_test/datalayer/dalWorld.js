

var mysql=require('mysql2/promise'); // lepiej /promise

// połączenie z bazą danych, pool wywoływany za pierwszym wywołaniem metody stąd i trwa aż do ubicia
var pool = mysql.createPool({
    host: process.env.DB_HOST, //zmienne środowiskowe
    user: process.env.DB_USER, // można na sztywno -> "root"
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

const getAllCountries = async () => {
    const sql = 'SELECT Name, Region, Population from country'
    const rows = {}

    try {
        [rows] = await pool.query(sql);
        console.log(rows)
    } catch (err){
        console.log(err)
    }

    return rows;
}

module.exports = {
    getAllCountries
}