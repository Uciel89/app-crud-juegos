"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* ===/ Definimos un enrutador /=== */
const express_1 = require("express");
const indexController_1 = require("../controllers/indexController");
class IndexRoutes {
    constructor() {
        // Definimos el enrutador
        this.router = (0, express_1.Router)();
        this.config();
    }
    // Metodo Config -> nos permite definir nuestras rutas
    config() {
        this.router.get('/', indexController_1.indexController.index);
    }
}
const indexRoutes = new IndexRoutes();
// Exportamos el enrutador
exports.default = indexRoutes.router;
