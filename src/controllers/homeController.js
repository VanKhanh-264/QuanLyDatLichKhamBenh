let getHomePage = (req, res) => {
    return res.render('homePage.ejs')
}
let getTestPage = (req, res) => {
    return res.render('test/test.ejs')
}

module.exports = {
    getHomePage: getHomePage,
    getTestPage: getTestPage,

}