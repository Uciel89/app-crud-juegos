/*===/ VAMOS A CREAR EL TIPO DE DATOS JUEGOS /===*/

export interface Game {
    // Definimos los campos que va a tener este tipo de dato
    id?: number;
    title: string;
    description: string;
    image?: string;
    create_at?: Date;
}