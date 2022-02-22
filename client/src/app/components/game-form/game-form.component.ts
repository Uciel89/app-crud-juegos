import { Component, HostBinding, OnInit } from '@angular/core';
import { Game } from 'src/app/models/game';

/*===/ Traemos el servicio de conexión con la REST API para mandar el contenido del objeto game /=== */
import { GamesService } from '../../services/games.service';

/*===/ Metodo para redireccionar al usuario a otra pantalla /===*/
import { ActivatedRoute ,Router } from '@angular/router'

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  // Generamos un objeto que vamos a ir llenando con el doble enlace de datos 
  // Y cuando terminemos de rellenar los campos, enviamos los datos al servidor, el cual va a enviar la informacion a la DB
  game: any = {
    title: "",
    description: "",
    image: "",
    create_at: new Date()
  }

  edit: Boolean = false; 

  constructor(private gamesService: GamesService, private router: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void{

    // Vamos a realizar una comprobacion, de si queremos crear un juego o editar un juego segun un parametro
    const params =  this.activeRoute.snapshot.params;

    // Comprobacion para traer los datos de ese objeto almacenado en nuestra base de datos
    if(params["id"]){
      this.gamesService.getGame(params["id"])
          .subscribe(
            res => {
              console.log(res)
              this.game = res;
              this.edit = true;
            },
            err => console.error(err)

          )
    }
  }

  // Metodo para poder almacenar los juegos agregados por el formulario
  saveNewGame(){
    // Eliminamos estos datos porque no los necesito, ya que mi base de datos los genera automaticamente
    delete this.game.create_at;
    delete this.game.id;
    
    // Llamamos al metodo saveGame de nuestro servicio de conexión con nuestro REST API 
    this.gamesService.saveGame(this.game)
        .subscribe(
          res => {
            console.log(res);
            // .navigate nos permite establecer una direccion de redireccionamiento 
            this.router.navigate(['/juegos']);
          },
          err => console.log(err)
        )
  }

  // Metodo para actualizar los datos de un juego
  updateGame(){
    delete this.game.create_at;
    this.gamesService.updateGame(this.game.id, this.game)
        .subscribe(
          res => {
            console.log(res);
            // .navigate nos permite establecer una direccion de redireccionamiento 
            this.router.navigate(['/juegos']);
          },
          err => console.log(err)
        )
  }
}
