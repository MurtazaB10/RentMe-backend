const router = require('express').Router();
const userRoutes = require("./userRoutes");
const retailerRoutes = require("./retailerRoutes");

const allRoutes = (app) => {
    userRoutes(router);
    retailerRoutes(router);
    app.use("/api", router);
}

module.exports = allRoutes;