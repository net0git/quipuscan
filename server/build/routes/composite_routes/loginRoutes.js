"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginController_1 = __importDefault(require("../../controllers/compositive_controllers/loginController"));
class LoginRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/api/register', loginController_1.default.RegistrarLogin);
        this.router.post('/api/login', loginController_1.default.ValidarLogin);
    }
}
const loginRouter = new LoginRouter();
exports.default = loginRouter.router;
