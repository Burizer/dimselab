export interface User
{
  id:Number,
  name:string,
  category:string,
  admin:number,
  [key:number]:number | string
}