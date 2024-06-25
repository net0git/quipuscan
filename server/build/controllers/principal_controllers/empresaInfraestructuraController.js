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
class EmpresaInfraestructuraController {
    //listar las empresas por infraestructura de forma que enlace informacion con la tabla t_empresa y devuelva toda la informacion necesaria
    listarEmpresasInfraestructura(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const consulta = `
                            SELECT
                            e.id_empresa,
                            e.razon_social,
                            e.ruc,
                            e.direccion,
                            e.correo,
                            e.telefono,
                            e.distrito,
                            e.provincia,
                            e.departamento,
                            i.fecha_act	
                        FROM
                            t_infraestructura i    
                        INNER JOIN
                            t_empresa e  ON i.id_empresa = e.id_empresa
            `;
                const emrpesaInfraestructura = yield database_1.default.query(consulta);
                res.json(emrpesaInfraestructura['rows']);
            }
            catch (error) {
                console.error('Error al obtener las empresas por infraestructura:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ObtenerEmpresaInfraestructura(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const consulta = 'select * from t_empresa_infraestructura where id_empre_infraestructura = $1';
                const empresaInfraestructura = yield database_1.default.query(consulta, [id]);
                if (empresaInfraestructura && empresaInfraestructura['rows'].length > 0) {
                    res.json(empresaInfraestructura['rows']);
                }
                else {
                    res.status(404).json({ text: 'La emrpesa por infraestructura no existe' });
                }
            }
            catch (error) {
                console.error('Error al obtener la empresa por infraestructura:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    CrearEmpresaInfraestructura(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_tipo_infraestructura, id_infraestructura, id_empresa, fecha_act, id_resolucion, id_certificado, expediente, mtc } = req.body;
                const create_at = new Date();
                const consulta = `
                INSERT INTO t_empresa_infraestructura(
                    id_tipo_infraestructura, id_infraestructura, id_empresa, fecha_act, id_resolucion, id_certificado, expediente, mtc)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
            `;
                const valores = [id_tipo_infraestructura, id_infraestructura, id_empresa, fecha_act, id_resolucion, id_certificado, expediente, mtc];
                database_1.default.query(consulta, valores, (error, resultado) => {
                    if (error) {
                        console.error('Error al insertar empresa por infraestructura:', error);
                    }
                    else {
                        console.log('la empresa por infraestructura se insertado correctamente');
                        res.json({ text: 'La empresa por infraestructura se creó correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error al crear emrpesa por infraestuctura:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ModificarEmpresaInfraestuctura(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { id_tipo_infraestructura, id_infraestructura, id_empresa, fecha_act, id_resolucion, id_certificado, expediente, mtc } = req.body;
                const consulta = `
                UPDATE t_empresa_infraestructura 
                SET id_tipo_infraestructura= $1, id_infraestructura= $2, id_empresa= $3, fecha_act= $4, id_resolucion= $5, id_certificado= $6 , expediente=$7, mtc=$8
                WHERE id_empre_infraestructura=$9
                `;
                const valores = [id_tipo_infraestructura, id_infraestructura, id_empresa, fecha_act, id_resolucion, id_certificado, expediente, mtc, id];
                database_1.default.query(consulta, valores, (error, resultado) => {
                    if (error) {
                        console.error('Error al modificar la empresa por infraestructura:', error);
                    }
                    else {
                        console.log('La empresa por infraestructura se modificado correctamente');
                        res.json({ text: 'La emrpesa por infraestructura se modifico correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error al modificar la emrpesa por infraestructura:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
}
const empresaInfraestructuraController = new EmpresaInfraestructuraController();
exports.default = empresaInfraestructuraController;
