/* ===/ Definimos un enrutador /=== */
import { Router } from 'express'
import { indexController } from '../controllers/indexController';

class IndexRoutes {

    // Definimos el enrutador
    public router: Router = Router();

    constructor(){
        this.config();
    }

    // Metodo Config -> nos permite definir nuestras rutas
    config(): void{
        this.router.get('/', indexController.index);
    }
}

const indexRoutes = new IndexRoutes();

// Exportamos el enrutador
export default indexRoutes.router;