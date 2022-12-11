const router = require("express").Router();
const retailerCtrl = require("../controllers/retailerController");

const retailerRoutes = (router) => {
    router.post("/retailer/signup", retailerCtrl.register);
}

module.exports = retailerRoutes;
