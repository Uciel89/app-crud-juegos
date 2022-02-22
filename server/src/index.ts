/*====/ SERVER SETTINGS /====*/
import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors'; 


/*=== Importamos las rutas === */
import indexRoutes from './routes/indexRoutes';
import gamesRoutes from './routes/gamesRoutes';

/* === Definimos nuestro servidor === */
class Server {

    // Guardamos el objeto que nos devuelve expresss
    public app: Application;

    // Inicializamos express
    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }

    // Metodo para configurar la propiedad app. Establecemos que no retorne nada porque solo es para realizar las configuraciones de app
    config(): void {

        // Defino el puerto
        this.app.set('port', process.env.PORT || 3000);

        // Morgan -> nos muestra las peticiones que realiza la parte cliente 
        this.app.use(morgan('dev'));
        
        // Cors -> permite a Angular pedir los datos a nuestro servidor
        this.app.use(cors());

        //express.json -> permite a nuestro servidor entender archivos json
        this.app.use(express.json());

        //configuracion para enviar datos por formulario
        this.app.use(express.urlencoded({extended: false}))

    }

    //Metodo para definis las rutas de mi servidor
    routes(): void{
        this.app.use('/', indexRoutes);
        //agregamos el prefijo /app/games
        this.app.use('/api/juegos', gamesRoutes);
    }

    //Metodo para inicializar nuestro servidor (ejecutar el tipico app.listen)
    start(): void{

        // Agregamos el .listen para que el servidor se quede escuchando el inicio del mismo.
        this.app.listen(this.app.get('port'), () => {
            console.log(`Server on port ${this.app.get('port')}`);
        });
    }
}

const server = new Server();
server.start();