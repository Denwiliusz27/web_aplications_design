// wyświetla stronę główną
const displayHomePage = (req, res) => {
    res.render('index', { title: 'Przetargi.pl' })
}

module.exports = {
    displayHomePage
}