import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importamos los componenetes para poder renderizarlos
import { GameListComponent } from './components/game-list/game-list.component';
import { GameFormComponent } from './components/game-form/game-form.component';
import { InicioComponent } from './components/inicio/inicio.component';

const routes: Routes = [

  // Definiendo las rutas de nuestra pagina
  {
    path: '',
    redirectTo: '/juegos',
    pathMatch: 'full'
  },
  {
    path:'juegos',
    component: GameListComponent
  },
  {
    path:'juegos/agregar',
    component: GameFormComponent
  },
  {
    path:'juegos/editar/:id',
    component: GameFormComponent
  },
  {
    path:'inicio',
    component: InicioComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
