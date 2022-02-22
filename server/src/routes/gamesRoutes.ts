/* ===/ Definimos un enrutador /=== */
import { Router } from 'express'
import gamesController from '../controllers/gamesController';

class GamesRoutes {

    // Definimos el enrutador
    public router: Router = Router();

    constructor(){
        this.config();
    }

    // Metodo Config -> nos permite definir nuestras rutas
    config(): void{
        this.router.get('/', gamesController.list);
        this.router.get('/:id', gamesController.getOne);
        this.router.post('/', gamesController.create);
        this.router.put('/:id', gamesController.update);
        this.router.delete('/:id', gamesController.delete);
    }
}

const gamesRoutes = new GamesRoutes();

// Exportamos el enrutador
export default gamesRoutes.router;