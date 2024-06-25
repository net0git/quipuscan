import express, { Application} from 'express';
import cors from 'cors';
import morgan from 'morgan'

//importamos las rutas
import personaRoutes from './routes/principal_routes/personaRoutes';
import usuariosRoutes from './routes/principal_routes/usuariosRoutes';
import resolucionRoutes from './routes/principal_routes/resolucionRoutes';
import inventarioRoutes from './routes/principal_routes/inventarioRoutes';
import expedienteRoutes from './routes/principal_routes/expedienteRoutes';
import parteRoutes from './routes/principal_routes/parteRoutes';
import digitalizadorRoutes from './routes/principal_routes/digitalizadorRoutes';
import indizacionRouter from './routes/principal_routes/indizacionRouter';
import controlCaliadRoutes from './routes/principal_routes/controlCaliadRoutes';
import fedatarioRoutes from './routes/principal_routes/fedatarioRoutes';




class Server{
    public app: Application;

    constructor(){
        this.app=express();
        this.config();
        this.ruotes();
        
    }
    config():void{
        this.app.set('port',process.env.PORT||3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json({ limit: '100mb' }));
        this.app.use(express.urlencoded({ limit: '100mb', extended: true }));
        //Configura el límite de carga en 50MB (ajusta según tus necesidades)
       // this.app.use(bodyParser.json({ limit: '100mb' }));
        //this.app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
    }
    ruotes():void{
        this.app.use('/',personaRoutes);
        this.app.use('/',usuariosRoutes);
        this.app.use('/',resolucionRoutes);
        this.app.use('/',inventarioRoutes);
        this.app.use('/',expedienteRoutes);
        this.app.use('/',parteRoutes);
        this.app.use('/',digitalizadorRoutes);
        this.app.use('/',indizacionRouter);
        this.app.use('/',controlCaliadRoutes);
        this.app.use('/',fedatarioRoutes)
       
    }
    star():void{
        this.app.listen(this.app.get('port'),()=>{
            console.log('server listening in port ', this.app.get('port'))
        })
    }
}

const server=new Server();
server.star();