"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg"); //importamos la libreria de postgres 
const pool = new pg_1.Pool({
    user: 'neto',
    password: '12345',
    host: 'localhost', //172.16.226.4
    port: 5432,
    database: 'pj_archivo_db'
});
pool.connect((error) => {
    if (error) {
        console.log('el error de conexion a la base de datos es: ' + error);
        return;
    }
    console.log('¡conexion con exito a la base de datos!');
});
exports.default = pool;
