import express from "express";
import homeController from "../controllers/homeController";

let router = express.Router();
let initWebRoutes = (app) => {
    app.get('/', homeController.getHomePage)
    app.get('/nvk', homeController.getTestPage)
    app.get('/crud', homeController.getCRUD)
    app.post('/post-crud', homeController.postCRUD)
    app.get('/get-crud', homeController.displayGetCRUD)
    app.get('/edit-crud', homeController.getEditCRUD)
    app.post('/put-crud', homeController.putCRUD)




    return app.use('/', router)
}

module.exports = initWebRoutes;