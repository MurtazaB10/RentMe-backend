const router = require("express").Router();
const userCtrl = require("../controllers/userController");

const userRoutes = (router) => {
    router.post("/user/signup", userCtrl.register);
    router.post("/user/login", userCtrl.login);
    router.post("/user/activate", userCtrl.activateAccount);
}

module.exports = userRoutes;
