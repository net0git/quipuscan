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
class ReportesController {
    listarExpedientesDetalle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const consulta = `
                           SELECT 
                            e.id_expediente,
                            e.nombre_expediente,
                            CONCAT(p1.nombre, ' ', p1.ap_paterno, ' ', p1.ap_materno) AS responsable_expediente,
                            u1.nombre_usuario AS usuario_responsable_expediente,
                            CONCAT(p2.nombre, ' ', p2.ap_paterno, ' ', p2.ap_materno) AS responsable_digitalizacion,
                            u2.nombre_usuario AS usuario_responsable_digitalizacion,
                            CONCAT(p3.nombre, ' ', p3.ap_paterno, ' ', p3.ap_materno) AS responsable_control_calidad,
                            u3.nombre_usuario AS usuario_responsable_control_calidad,
                            CONCAT(p4.nombre, ' ', p4.ap_paterno, ' ', p4.ap_materno) AS responsable_indizacion,
                            u4.nombre_usuario AS usuario_responsable_indizacion,
                            CONCAT(p5.nombre, ' ', p5.ap_paterno, ' ', p5.ap_materno) AS responsable_fedatar,
                            u5.nombre_usuario AS usuario_responsable_fedatar
                        FROM 
                            t_expediente e
                        LEFT JOIN 
                            t_usuario u1 ON e.id_responsable = u1.id_usuario
                        LEFT JOIN 
                            t_persona p1 ON u1.id_persona = p1.id_persona
                        LEFT JOIN 
                            t_digitalizacion d ON e.id_expediente = d.id_expediente
                        LEFT JOIN 
                            t_usuario u2 ON d.id_responsable = u2.id_usuario
                        LEFT JOIN 
                            t_persona p2 ON u2.id_persona = p2.id_persona
                        LEFT JOIN 
                            t_control_calidad c ON e.id_expediente = c.id_expediente
                        LEFT JOIN 
                            t_usuario u3 ON c.id_responsable = u3.id_usuario
                        LEFT JOIN 
                            t_persona p3 ON u3.id_persona = p3.id_persona
                        LEFT JOIN 
                            t_indizacion i ON e.id_expediente = i.id_expediente
                        LEFT JOIN 
                            t_usuario u4 ON i.id_responsable = u4.id_usuario
                        LEFT JOIN 
                            t_persona p4 ON u4.id_persona = p4.id_persona
                        LEFT JOIN 
                            t_fedatar f ON e.id_expediente = f.id_expediente
                        LEFT JOIN 
                            t_usuario u5 ON f.id_responsable = u5.id_usuario
                        LEFT JOIN 
                            t_persona p5 ON u5.id_persona = p5.id_persona
                        WHERE 
                            e.id_inventario = $1 
                        ORDER BY 
                             e.id_expediente;
            `;
                const expediente = yield database_1.default.query(consulta, [id]);
                if (expediente && expediente['rows'].length > 0) {
                    res.json(expediente['rows']);
                }
                else {
                    res.status(404).json({ text: 'no existe expedientes' });
                }
            }
            catch (error) {
                console.error('Error al obtener expedientes', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
}
const reportesController = new ReportesController();
exports.default = reportesController;
