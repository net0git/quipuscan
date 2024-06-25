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
class EmpresaController {
    listarEmpresas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const empresas = yield database_1.default.query('select * from t_empresa');
                res.json(empresas['rows']);
            }
            catch (error) {
                console.error('Error al obtener las emrpesas:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ObtenerEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const consulta = `
                    SELECT e.* ,CONCAT(pe.nombres,' ',pe.ap_paterno,' ',pe.ap_materno) AS representante_legal
                            FROM t_empresa AS e
                            JOIN t_persona AS pe ON e.id_representante_legal = pe.id_persona
                        WHERE e.id_empresa = $1; 

               `;
                const empresa = yield database_1.default.query(consulta, [id]);
                if (empresa && empresa['rows'].length > 0) {
                    res.json(empresa['rows']);
                }
                else {
                    res.status(404).json({ text: 'La empresa no existe' });
                }
            }
            catch (error) {
                console.error('Error al obtener emrpesa:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ObtenerEmpresaPorRuc(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { ruc } = req.params;
                const consulta = 'select * from t_empresa where ruc = $1';
                const empresa = yield database_1.default.query(consulta, [ruc]);
                if (empresa && empresa['rows'].length > 0) {
                    res.json(empresa['rows']);
                }
                else {
                    res.status(404).json({ text: 'La emrpesa no existe' });
                }
            }
            catch (error) {
                console.error('Error al obtener empresa:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    CrearEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { razon_social, ruc, direccion, correo, telefono, distrito, provincia, departamento, id_representante_legal, nota } = req.body;
                const consulta = `
                INSERT INTO t_empresa(
                        razon_social, ruc, direccion, correo, telefono, distrito, provincia, departamento, id_representante_legal, nota)
                        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
                    RETURNING id_empresa; -- Devuelve el ID de la empresa  

            `;
                const valores = [razon_social, ruc, direccion, correo, telefono, distrito, provincia, departamento, id_representante_legal, nota];
                database_1.default.query(consulta, valores, (error, resultado) => {
                    if (error) {
                        console.error('Error al insertar empresa:', error);
                        res.status(500).json({ error: 'Error interno del servidor' });
                    }
                    else {
                        const idEmpresa = resultado.rows[0]['id_empresa']; // ID se encuentra en la primera fila
                        console.log('datos de personada en BD:', idEmpresa);
                        res.json({ id_empresa: idEmpresa, text: 'La emrpesa se creó correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error al crear empresa:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ModificarEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { razon_social, ruc, direccion, correo, telefono, distrito, provincia, departamento, id_representante_legal, nota } = req.body;
                const consulta = `
                UPDATE t_empresa
                SET razon_social= $1, ruc= $2, direccion= $3, correo= $4, telefono= $5, distrito= $6 ,provincia=$7 , departamento=$8 ,id_representante_legal=$9, nota=$10
                WHERE id_empresa=$11
                `;
                const valores = [razon_social, ruc, direccion, correo, telefono, distrito, provincia, departamento, id_representante_legal, nota, id];
                database_1.default.query(consulta, valores, (error, resultado) => {
                    if (error) {
                        console.error('Error al modificar empresa:', error);
                    }
                    else {
                        console.log('empresa modificado correctamente');
                        res.json({ text: 'La empresa se modifico correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error al modificar empresa:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
}
const empresaController = new EmpresaController();
exports.default = empresaController;
