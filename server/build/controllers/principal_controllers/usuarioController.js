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
class UsuarioController {
    listarUsuarios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usuarios = yield database_1.default.query('select * from t_usuario');
                res.json(usuarios['rows']);
            }
            catch (error) {
                console.error('Error al obtener usuarios:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    listarUsuariosDetalle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const consulta = `
                    SELECT
                        t_usuario.id_usuario,
                        t_usuario.nombre_usuario,
                        t_usuario.perfil,
                        t_usuario.estado,
                        t_persona.nombre,
                        t_persona.ap_paterno,
                        t_persona.ap_materno,
                        t_persona.telefono,
                        t_persona.correo,
                        t_persona.direccion
                    FROM
                        t_usuario
                    INNER JOIN
                        t_persona ON t_usuario.id_persona = t_persona.id_persona;
            `;
                const usuarios = yield database_1.default.query(consulta);
                res.json(usuarios['rows']);
            }
            catch (error) {
                console.error('Error al obtener usuarios:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ObtenerUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const consulta = 'select * from t_usuario where id_usuario = $1';
                const usuario = yield database_1.default.query(consulta, [id]);
                if (usuario && usuario['rows'].length > 0) {
                    res.json(usuario['rows']);
                }
                else {
                    res.status(404).json({ text: 'El usuario no existe' });
                }
            }
            catch (error) {
                console.error('Error al obtener usuario:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ObtenerUsuarioPorNombre(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nombre_usuario } = req.params;
                const consulta = 'select * from t_usuario where nombre_usuario = $1';
                const usuario = yield database_1.default.query(consulta, [nombre_usuario]);
                if (usuario && usuario['rows'].length > 0) {
                    res.json(usuario['rows']);
                }
                else {
                    res.status(404).json({ text: 'El usuario no existe' });
                }
            }
            catch (error) {
                console.error('Error al obtener usuario:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    CrearUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //el campo del password siempre tiene que estar lleno, la validacion se debe hacer desde el fronend
                const { nombre_usuario, perfil, password, id_persona, estado } = req.body;
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
                    nombre_usuario,perfil,password,id_persona, estado)
                    VALUES ($1, $2, $3, $4, $5);
            `;
                    const valores = [nombre_usuario, perfil, passwordcifrado, id_persona, estado];
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
            }
            catch (error) {
                console.error('Error al crear usuario:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ValidarLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nombre_usuario, password } = req.body; //optenemos el usuario del cuerpo de envio
                //BUSCAMOS EL USUARIO-------------
                const consulta_nombreUsuario = ` SELECT nombre_usuario from t_usuario WHERE nombre_usuario=$1`;
                const valores = [nombre_usuario];
                const sqlusuario = yield database_1.default.query(consulta_nombreUsuario, valores);
                if (sqlusuario['rows'].length == 1) {
                    const ConsultaDatosUsuario = ` SELECT id_usuario,password,perfil,estado from t_usuario WHERE nombre_usuario=$1`;
                    const DatosUsuario = yield database_1.default.query(ConsultaDatosUsuario, [nombre_usuario]); //optenemos el usuario de la base de datos 
                    if (DatosUsuario['rows'].length == 1) { //el valor 1 indica que encontro la contraseña
                        //COMPARAMOS CONTRASEÑAS
                        // console.log(sqlpassword['rows'][0]['password'])
                        const booleanvalue = yield (0, loginEncriptador_1.comparar)(password, DatosUsuario['rows'][0]['password']);
                        if (booleanvalue && DatosUsuario['rows'][0]['estado'] == true) {
                            console.log('el usuario y la contraseña son correctas');
                            res.json({ text: 'true', id_usuario: DatosUsuario['rows'][0]['id_usuario'], perfil: DatosUsuario['rows'][0]['perfil'] });
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
            }
            catch (error) {
                console.error('Error al loguear usuario:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ModificarUsuarioDatos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { nombre_usuario, perfil, estado } = req.body;
                const consulta = `
                UPDATE t_usuario 
                SET nombre_usuario= $1, perfil= $2, estado= $3
                WHERE id_usuario=$4
                `;
                const valores = [nombre_usuario, perfil, estado, id];
                database_1.default.query(consulta, valores, (error, resultado) => {
                    if (error) {
                        console.error('Error al modificar usuario:', error);
                    }
                    else {
                        console.log('usuario modificado correctamente');
                        res.json({ text: 'El usurio se modifico correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error al modificar usuario:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ModificarUsuarioPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { password } = req.body;
                const passwordcifrado = yield (0, loginEncriptador_1.encriptar)(password);
                const consulta = `
                UPDATE t_usuario 
                SET password= $1 
                WHERE id_usuario=$2
                `;
                const valores = [passwordcifrado, id];
                database_1.default.query(consulta, valores, (error, resultado) => {
                    if (error) {
                        console.error('Error al modificar password usuario:', error);
                    }
                    else {
                        console.log('password modificado correctamente');
                        res.json({ text: 'El password del usuario modifico correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error al modificar password de usuario:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
}
const usuarioController = new UsuarioController();
exports.default = usuarioController;
