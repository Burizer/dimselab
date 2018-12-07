export interface User
{
  id:number,
  name:string,
  category:string,
  role:string,
  [key:number]:number | string
}