"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const loginEncriptador_1 = require("../../encriptador/loginEncriptador");
const database_1 = __importDefault(require("../../database/database")); // Ruta al archivo db.ts
class LoginController {
    RegistrarLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //el campo del password siempre tiene que estar lleno, la validacion se debe hacer desde el fronend
            const { nombre_usuario, rol, password, id_perdona, estado } = req.body;
            //COMPROBAMOS SI EL USUARIO EXISTE
            const consulta = 'select nombre_usuario from t_usuario where nombre_usuario = $1';
            const sqlusuario = yield database_1.default.query(consulta, [nombre_usuario]);
            if (nombre_usuario == sqlusuario) {
                res.json({ text: 'ya exite este usuario en el registro' });
            }
            else {
                const passwordcifrado = yield (0, loginEncriptador_1.encriptar)(password);
                const consulta = `
                INSERT INTO t_usuario(
                    nombre_usuario,rol,password,id_persona, estado)
                    VALUES ($1, $2, $3, $4, $5);
            `;
                const valores = [nombre_usuario, rol, passwordcifrado, id_perdona, estado];
                database_1.default.query(consulta, valores, (error, resultado) => {
                    if (error) {
                        console.error('Error al crear usuario:', error);
                    }
                    else {
                        console.log('usuario creado correctamente');
                        res.json({ text: 'El usuario se creó correctamente' });
                    }
                });
            }
        });
    }
    ValidarLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre_usuario, password } = req.body; //optenemos el usuario del cuerpo de envio
            //BUSCAMOS EL USUARIO-------------
            const consulta_nombreUsuario = ` SELECT nombre_usuario from t_usuario WHERE nombre_usuario=$1`;
            const valores = [nombre_usuario];
            const sqlusuario = yield database_1.default.query(consulta_nombreUsuario, valores);
            // console.log(sqlusuario['rows'].length)
            if (sqlusuario['rows'].length == 1) {
                //res.json({text:'true'});//si encuentra cohincidencias devuelve verdarero
                const consulta_passwordUsuario = ` SELECT password from t_usuario WHERE nombre_usuario=$1`;
                const sqlpassword = yield database_1.default.query(consulta_passwordUsuario, [nombre_usuario]); //optenemos el usuario de la base de datos
                if (sqlpassword['rows'].length == 1) { //el valor 1 indica que encontro la contraseña
                    //COMPARAMOS CONTRASEÑAS
                    // console.log(sqlpassword['rows'][0]['password'])
                    const booleanvalue = yield (0, loginEncriptador_1.comparar)(password, sqlpassword['rows'][0]['password']);
                    if (booleanvalue) {
                        console.log('el usuario y la contraseña son correctas');
                        res.json({ text: 'true' });
                    }
                    else {
                        console.log('la contraseña no es correcta');
                        res.json({ text: 'false' });
                    }
                }
            }
            else {
                res.json({ text: 'false' });
            }
        });
    }
}
const loginController = new LoginController();
exports.default = loginController;
