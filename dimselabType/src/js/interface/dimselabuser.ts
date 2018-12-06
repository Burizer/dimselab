export interface DimselabUser 
{
  category: string,
  name: string,
  admin: boolean,
  iat: number,
  exp: number,
  // index signature -> Beskriver de ovenstående index typer
  [key: string]: string | number | boolean
};