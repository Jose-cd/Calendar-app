export interface IEvent {
  _id?: string;
  nombre: string;
  descripcion: string;
  lugar: string;
  color: string;
  fecha: Date;
  horaInicio: Date;
  horaFinalizacion: Date;
}
