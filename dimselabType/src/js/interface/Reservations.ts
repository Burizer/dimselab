export interface Reservations
{
  id:number,
  user:number,
  amount:number,
  item:number,
  reservation_start:string,
  reservation_end:string,
  reservation_status:boolean,

  [key : number]:number|string|boolean
}
