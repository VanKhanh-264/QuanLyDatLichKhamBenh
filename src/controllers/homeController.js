import db from '../models/index'
import CRUDService from '../services/CRUDService';

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homePage.ejs', {
            data: JSON.stringify(data)
        })
    } catch (e) {
        console.log(e)
    }
}
let getTestPage = (req, res) => {
    return res.render('test/test.ejs')
}

let getCRUD = (req, res) => {
    return res.render('crud.ejs')
}
let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    console.log(message)
    return res.send('POST CRUD');
}

let displayGetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser();
    console.log('-----------------------')
    console.log(data)
    console.log('-----------------------')

    return res.render('displayCRUD', {
        dataTable: data
    })
}
let getEditCRUD = async (req, res) => {

    let userId = req.query.id

    if(userId){
        let userData = await CRUDService.getUserInfoById(userId)
        return res.render('editCRUD.ejs', {
            user: userData,
        })
    }else{
        return res.send('User not found!')
    }
}
let putCRUD =async (req, res) => {
    let data = req.body
    let allUsers = await CRUDService.updateUserData(data)
    return res.render('displayCRUD', {
        dataTable: allUsers
    })
    
}
module.exports = {
    getHomePage: getHomePage,
    getTestPage: getTestPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
}