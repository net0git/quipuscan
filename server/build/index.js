"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
//importamos las rutas
const personaRoutes_1 = __importDefault(require("./routes/principal_routes/personaRoutes"));
const usuariosRoutes_1 = __importDefault(require("./routes/principal_routes/usuariosRoutes"));
const resolucionRoutes_1 = __importDefault(require("./routes/principal_routes/resolucionRoutes"));
const inventarioRoutes_1 = __importDefault(require("./routes/principal_routes/inventarioRoutes"));
const expedienteRoutes_1 = __importDefault(require("./routes/principal_routes/expedienteRoutes"));
const parteRoutes_1 = __importDefault(require("./routes/principal_routes/parteRoutes"));
const digitalizadorRoutes_1 = __importDefault(require("./routes/principal_routes/digitalizadorRoutes"));
const indizacionRouter_1 = __importDefault(require("./routes/principal_routes/indizacionRouter"));
const controlCaliadRoutes_1 = __importDefault(require("./routes/principal_routes/controlCaliadRoutes"));
const fedatarioRoutes_1 = __importDefault(require("./routes/principal_routes/fedatarioRoutes"));
const reportesRoutes_1 = __importDefault(require("./routes/principal_routes/reportesRoutes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.ruotes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json({ limit: '100mb' }));
        this.app.use(express_1.default.urlencoded({ limit: '100mb', extended: true }));
        //Configura el límite de carga en 50MB (ajusta según tus necesidades)
        // this.app.use(bodyParser.json({ limit: '100mb' }));
        //this.app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
    }
    ruotes() {
        this.app.use('/', personaRoutes_1.default);
        this.app.use('/', usuariosRoutes_1.default);
        this.app.use('/', resolucionRoutes_1.default);
        this.app.use('/', inventarioRoutes_1.default);
        this.app.use('/', expedienteRoutes_1.default);
        this.app.use('/', parteRoutes_1.default);
        this.app.use('/', digitalizadorRoutes_1.default);
        this.app.use('/', indizacionRouter_1.default);
        this.app.use('/', controlCaliadRoutes_1.default);
        this.app.use('/', fedatarioRoutes_1.default);
        this.app.use('/', reportesRoutes_1.default);
    }
    star() {
        this.app.listen(this.app.get('port'), () => {
            console.log('server listening in port ', this.app.get('port'));
        });
    }
}
const server = new Server();
server.star();
