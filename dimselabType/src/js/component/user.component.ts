import { DimselabUser } from "../interface/dimselabuser";

export const writeUserToHtml = (user: DimselabUser) => {
  document.getElementById('name').innerText = user.name
  document.getElementById('category').innerText = user.category
  Object.keys(user).forEach((key) => {
    // Ternary operator - Hvis første del inden spørgsmålstegn er true, gør den det inden kolon (':') ellers det efter
    //!! (Double bangs) gør alting til bools
    !!document.getElementById(key) ? document.getElementById(key).innerHTML = user[key].toString() : null
  })
}