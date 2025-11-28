import { Cancion } from "./Cancion.interfaz";

export interface Jam{
  visible:boolean;
  activated:boolean;
  _id:string;
  nombre:string;
  fecha:Date;
  instrumentos: Array<{nombre:string}>
  ubicacion:{
    direccion:string,
    url:string
  };
  canciones:Array<Cancion>;

}