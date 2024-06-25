"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class LoginRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/loging', (req, res) => { res.send('hola desde el router'); });
    }
}
const loginRoutes = new LoginRoutes;
exports.default = loginRoutes.router;
