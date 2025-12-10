import { Cancion } from './Cancion.interfaz';
import { Participante } from './Participante.interfaz';

export interface CancionEnJam extends Cancion {
  participantes: Participante[];
}