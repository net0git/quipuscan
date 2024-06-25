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
class MarcaController {
    listarMarcas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const marca = yield database_1.default.query('select * from d_marca order by nombre_marca');
                res.json(marca['rows']);
            }
            catch (error) {
                console.error('Error al obtener marca:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ObtenerMarca(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const consulta = 'select * from d_marca where id_marca =$1 ';
                const marca = yield database_1.default.query(consulta, [id]);
                if (marca && marca['rows'].length > 0) {
                    res.json(marca['rows']);
                }
                else {
                    res.status(404).json({ text: 'La marca no existe' });
                }
            }
            catch (error) {
                console.error('Error al obtener marca:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ObtenerMarcaPorNombre(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nombre_marca } = req.body;
                const consulta = 'select * from d_marca where nombre_marca =$1';
                const marca = yield database_1.default.query(consulta, [nombre_marca]);
                if (marca && marca['rows'].length > 0) {
                    res.json(marca['rows']);
                }
                else {
                    res.status(404).json({ text: 'La marca no existe' });
                }
            }
            catch (error) {
                console.error('Error al obtener marca:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    CrearMarca(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nombre_marca } = req.body;
                const consulta = `
                INSERT INTO d_marca( nombre_marca ) VALUES ($1);      
            `;
                const valores = [nombre_marca];
                database_1.default.query(consulta, valores, (error, resultado) => {
                    if (error) {
                        console.error('Error al insertar marca:', error);
                    }
                    else {
                        console.log('marca insertado correctamente');
                        res.json({ text: 'La marca se creó correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error al crear marca:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ModificarMarca(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { nombre_marca } = req.body;
                const consulta = `
                UPDATE d_marca 
                SET nombre_marca= $1
                WHERE id_marca=$2
                `;
                const valores = [nombre_marca, id];
                database_1.default.query(consulta, valores, (error, resultado) => {
                    if (error) {
                        console.error('Error al modificar marca:', error);
                    }
                    else {
                        console.log('marca modificada correctamente');
                        res.json({ text: 'La marca se modifico correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error al modificar marca:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
}
const marcaController = new MarcaController();
exports.default = marcaController;
