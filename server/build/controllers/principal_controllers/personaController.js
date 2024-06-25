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
const database_1 = __importDefault(require("../../database/database")); // Ruta al archivo db.ts
class PersonaController {
    listarPersonas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const personas = yield database_1.default.query('select * from t_persona');
                res.json(personas['rows']);
            }
            catch (error) {
                console.error('Error al obtener personas:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ObtenerPersona(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const consulta = 'select * from t_persona where id_persona = $1';
                const persona = yield database_1.default.query(consulta, [id]);
                if (persona && persona['rows'].length > 0) {
                    res.json(persona['rows']);
                }
                else {
                    res.status(404).json({ text: 'La persona no existe' });
                }
            }
            catch (error) {
                console.error('Error al obtener persona:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    CrearPersona(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nombre, ap_paterno, ap_materno, dni, telefono, correo, direccion } = req.body;
                const consulta = `
                    INSERT INTO t_persona(
                        nombre, ap_paterno, ap_materno, dni, telefono, correo, direccion)
                       VALUES ( $1, $2, $3, $4, $5, $6, $7)
                RETURNING id_persona; -- Devolver el ID de la persona insertada
            `;
                const valores = [nombre, ap_paterno, ap_materno, dni, telefono, correo, direccion];
                database_1.default.query(consulta, valores, (error, resultado) => {
                    if (error) {
                        console.error('Error al insertar persona:', error);
                        res.status(500).json({ error: 'Error interno del servidor' });
                    }
                    else {
                        const idPersona = resultado.rows[0]['id_persona']; // ID se encuentra en la primera fila
                        console.log('datos de usuario en BD:', idPersona);
                        res.json({ id_persona: idPersona, text: 'La persona se creó correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error al crear persona:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ModificarPersona(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { nombre, ap_paterno, ap_materno, dni, telefono, correo, direccion } = req.body;
                const consulta = `
                  UPDATE public.t_persona
                    SET  nombre=$1, ap_paterno=$2, ap_materno=$3, dni=$4, telefono=$5, correo=$6, direccion=$7
                  WHERE id_persona=$8
                
                `;
                const valores = [nombre, ap_paterno, ap_materno, dni, telefono, correo, direccion, id];
                database_1.default.query(consulta, valores, (error, resultado) => {
                    if (error) {
                        console.error('Error al modificar persona:', error);
                    }
                    else {
                        console.log('persona modificada correctamente');
                        res.json({ text: 'La persona se modifico correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error al modificar persona:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    EliminarPersona(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const consulta = `
                        DELETE FROM t_persona where id_persona=$1;
                `;
                const valores = [id];
                database_1.default.query(consulta, valores, (error, resultado) => {
                    if (error) {
                        console.error('Error al eliminar persona:', error);
                    }
                    else {
                        console.log('persona elimada correctamente');
                        res.json({ text: 'La persona se elimino correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error al eliminar persona:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
}
const personaController = new PersonaController();
exports.default = personaController;
