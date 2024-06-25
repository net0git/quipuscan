import { Pool, PoolConfig } from 'pg'; //importamos la libreria de postgres 

const pool = new Pool({
            user: 'neto',
            password: '12345',
            host:  'localhost',//172.16.226.4
            port:  5432,
            database:  'db_archivo_pj'
});

pool.connect((error)=>{
    if(error){
        console.log('el error de conexion a la base de datos es: '+error);
        return;    
    }
    console.log('¡conexion con exito a la base de datos!')
})

export default pool;

  