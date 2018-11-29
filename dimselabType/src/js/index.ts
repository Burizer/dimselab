//område til interface(wannabe class)
export interface Item
{
  uid: string;
  item: string;
  amount: string;
  description: string;
  keywords: string;
  link: string;

  [key: string]: string
};

export interface User 
{
  category: string,
  name: string,
  admin: boolean,
  iat: number,
  exp: number,
  // index signature -> Beskriver de ovenstående index typer
  [key: string]: string | number | boolean
};

const API_URL = 'http://api.evang.dk/dimselab/v1/items.php?'
const API_TOKEN =  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6InRlc3QgYWNjb3VudCIsIm5hbWUiOiJTdHVkZW50IiwiYWRtaW4iOmZhbHNlLCJpYXQiOjE1NDI2MzQ5NTMsImV4cCI6MTU1ODQxNDk1M30.YJAjKlKx5QWYtyb_sIEKRfNRIKtnlci3nn2Ee7o4Ges"

fetch(API_URL, {
  method: 'get',
  headers: new Headers ({
    'Authorization': `Bearer ${API_TOKEN}` 
  })
})
  .then((response) => {
    return response.json();
  })
  .then((myJson) => {
    console.log(JSON.stringify(myJson));
    
    console.log(myJson.user)
    const user: User = myJson.user
    document.getElementById('name').innerText = user.name
    document.getElementById('category').innerText = user.category
    Object.keys(user).forEach((key) => {
      // Ternary operator - Hvis første del inden spørgsmålstegn er true, gør den det inden kolon (':') ellers det efter
      //!! (Double bangs) gør alting til bools
      !!document.getElementById(key) ? SetHtmlElement(key, user[key].toString()) : null
    })

    // ... betyder "spread operator"
    const items : Item[] = [...myJson.items] 
    items.forEach((item: Item) => {
      Object.keys(item).forEach((key) => {
        // Du har hvert item her
        const wrapper = document.createElement("div")
          // sæt en anden value ind her som du får fra dit andet API
          // fjern const og lav en "let value" og sæt IF ind
          const value = document.createTextNode(item[key])
          
        wrapper.appendChild(value)
        document.getElementById('items').appendChild(wrapper)
      })
      const hr = document.createElement('hr')      
      const MakeBotton = document.createElement('button')
      MakeBotton.innerHTML = "Reserver denne"
      MakeBotton.onclick = function() {
        window.location.href = "/items/?"+ item.uid
    }
    document.getElementById('items').appendChild(MakeBotton)
    document.getElementById('items').appendChild(hr)
    })

    // let ost = {
    //   name: 'brie'  
    // }
    
    // let osteTemplate = `
    //   <div class="">
      
    //   </div>
    //   <p>${ost.name}</p>
    // `
    
    // document.getElementById('items').innerHTML = osteTemplate

});
const SetHtmlElement = (element: string, value: string) => {
      document.getElementById(element).innerText = value.toString()
  
}
const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('object');
if (myParam != null)
{

}

// urlparametren -> fetch -> data -> template -> vises