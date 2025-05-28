import express from "express";
import homeController from "../controllers/homeController";

let router = express.Router();
let initWebRoutes = (app) => {
    app.get('/', homeController.getHomePage)
    app.get('/nvk', homeController.getTestPage)
    app.get('/crud', homeController.getCRUD)
    app.post('/post-crud', homeController.postCRUD)


    return app.use('/', router)
}

module.exports = initWebRoutes;