import { CancionEnJam } from "./CancionEnJam.interface";

export interface Jam{
  visible:boolean;
  activated:boolean;
  id:string;
  nombre:string;
  fecha:Date;
  instrumentos: Array<{nombre:string}>
  ubicacion:{
    direccion:string,
    url:string
  };
  canciones:Array<CancionEnJam>;

}