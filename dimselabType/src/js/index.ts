const flatpickr = require("flatpickr")
const moment = require('moment');

//#region API konstanter
const API_DIMSELAB = 'http://api.evang.dk/dimselab/v1/items.php?'
const API_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6InRlc3QgYWNjb3VudCIsIm5hbWUiOiJTdHVkZW50IiwiYWRtaW4iOmZhbHNlLCJpYXQiOjE1NDI2MzQ5NTMsImV4cCI6MTU1ODQxNDk1M30.YJAjKlKx5QWYtyb_sIEKRfNRIKtnlci3nn2Ee7o4Ges'
const API_ITEMS = 'https://3semesterprojekt.azurewebsites.net/api/items'
const API_RES ='https://3semesterprojekt.azurewebsites.net/api/reservations'
const API_USERS ='https://3semesterprojekt.azurewebsites.net/api/users'
const API_WEEKS ='https://3semesterprojekt.azurewebsites.net/api/weeks'
//#endregion

//#region API


const fetchOptions = (type: string, body: any = {})  => {
  const options = {
    method: type,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'Application/json'
    }
  }
  return options
}


const getRequest = (apiUrl: string, config: object = {}) => {
  return fetch(apiUrl, config)
    .then(res => res.json())
}

const postRequest = (apiUrl: string, body: object) => {
  return fetch(apiUrl, Object.assign({}, fetchOptions('POST', body)))
    .then(res => res.json())
}

const putRequest = (apiUrl: string, body: object) => {
  return fetch(apiUrl, Object.assign({}, fetchOptions('PUT', body)))
    .then(res => {
      console.log(res)
    })
}
//laver nærmest et join
const mapRemainingItemsToOriginalItems = (arr:any[], items: Item[]) => {
  const mappedItems: any[] = []
  arr.forEach(i => {
    const match = items.find((item: any) => item.uid === i.item_uid)
    const newObject = {...i, ...match}
    mappedItems.push(newObject)
  })

  return mappedItems
}

const writeUserToHtml = (user: DimselabUser) => {
  document.getElementById('name').innerText = user.name
  document.getElementById('category').innerText = user.category
  Object.keys(user).forEach((key) => {
    // Ternary operator - Hvis første del inden spørgsmålstegn er true, gør den det inden kolon (':') ellers det efter
    //!! (Double bangs) gør alting til bools
    !!document.getElementById(key) ? document.getElementById(key).innerHTML = user[key].toString() : null
  })
}

const handleButtonClick = (event: any) => {
  const itemId = event.target.name

  // 2) Byg form til at reserveres
  const currentForm = document.getElementById('reserverForm') // enten lig med et HTML element eller undefined
  
  const form = document.createElement('form')
  form.setAttribute('id', 'reserverForm')
  form.setAttribute('method', 'post')
  form.setAttribute('action', '/')

  const input = document.createElement('input')
  input.setAttribute('type', 'text')
  input.setAttribute('placeholder', 'Antal')
  //hvis der skal bruges flere input, lav dem her

  const submit = document.createElement("input")
  submit.setAttribute('type',"submit")
  submit.setAttribute('value',"Submit")

  form.appendChild(input)
  form.appendChild(submit)
  
  
  if (currentForm) { // hvis den ikke er undefined (hvis den findes)
    currentForm.replaceWith(form) // Så udskift den med den nye form
  } else { // ellers
    document.getElementById('reservations').appendChild(form) // så indsæt en ny form
  }

  // 3) POST til API for at reservere
  submit.onclick = (event: any) => {
    event.preventDefault
  }

  const datePicker = document.createElement('input')
  datePicker.type = 'text'
  datePicker.setAttribute('data-input', 'datainput')

  // Udskift med data fra API Kald
  // Husk at formatere datoer fra API :)
  // 2018-12-19-12:001
  // gør moment('weeks_weeks', 'DD-MM-YYYY').format('DD-MM-YYYY')
  const testDates: any[] = [
    moment('29-11-2018', 'DD-MM-YYYY').format('DD-MM-YYYY'),
    moment('19-11-2018', 'DD-MM-YYYY').format('DD-MM-YYYY'),
    moment('19-11-2018', 'DD-MM-YYYY').format('DD-MM-YYYY'),
    moment('09-11-2018', 'DD-MM-YYYY').format('DD-MM-YYYY'),
    moment('11-11-2018', 'DD-MM-YYYY').format('DD-MM-YYYY'),
    moment('12-11-2018', 'DD-MM-YYYY').format('DD-MM-YYYY')
  ]

  const chosenDates: any = {
    start: null,
    end: null
  }

  flatpickr(datePicker, {
    mode: "range",
    locale: {
      firstDayOfWeek: 1
    },
    disable: [
      function(date: Date) {
        // return true to disable
        // Vælg datoer her der skal være slået fra (dage der er optaget)
        // Johan siger:
        //  Jeg tror at du skal bruge følgende metodik
        //  
        return testDates.includes(moment(date).format('DD-MM-YYYY'))
        // return (moment(date).format('DD-MM-YYYY') === moment().format('DD-MM-YYYY') || date.getDay() === 0);
      }
    ],
    onValueUpdate: function(date: Date[]) {
      chosenDates.start = date[0],
      chosenDates.end = date[1]

    }    
  })

  document.getElementById('reservations').appendChild(datePicker)
  // lave en søge funktion efter "tags" fra ebbe's api  
  //#endregion Resvereknap
}

//ændre så logikken bag det her, er i databasen og ikke frontend.
const handleLoanButtonClick = (event: any, amount: any) => {
  const item_uid = prompt('Scan venligst stregkode')
  const item_amount = --amount
  putRequest(`${API_ITEMS}/${item_uid}`, {
    item_amount
  })
}

const writeButtonsToHtml = (itemUid: string, amount: any) => {
  const button = document.createElement('button')
  const loanButton = document.createElement('button')
  const hr = document.createElement('hr')
  
  button.type = 'button'
  button.name = itemUid
  button.innerText = "Reserver denne"
  document.getElementById('items').appendChild(button)
  button.onclick = () => handleButtonClick(event)

  if(amount > 0) {
    loanButton.innerHTML = "Lån denne"
    loanButton.setAttribute('uid', itemUid)
    document.getElementById('items').appendChild(loanButton)
    loanButton.onclick = () => handleLoanButtonClick(event, amount)
  }
  
  document.getElementById('items').appendChild(hr)
}

const writeItemsTextToHTML = (item : Item) => {
  Object.keys(item).forEach((key) => {
    if(!key.startsWith('item_')) {
      // Du har hvert item her
    const wrapper = document.createElement("div")
    let value
    if(key === 'amount') {
      value = document.createTextNode(`${item.item_amount} / ${item.amount} tilgængelig`)
    } else {
      value = document.createTextNode(item[key])
    }
      
    wrapper.appendChild(value)
    document.getElementById('items').appendChild(wrapper)
    }
  }) 
}

const writeItemsToHTML = (items: any[]) => {
  items.forEach((item: Item) => {
    writeItemsTextToHTML(item)
    
    writeButtonsToHtml(item.uid, item.item_amount)
      
  })
}


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

export interface Reservations
{
  id:number,
  week:number,
  user:number,
  amount:number,
  item:number,
  
  [key : number]:number
}

export interface Weeks
{
  id:number,
  week_date:string,
  [key:string]:string | number
}

export interface User
{
  id:Number,
  name:string,
  category:string,
  admin:number,
  [key:number]:number | string
}
//#endregion


const itemsPromise = getRequest(API_DIMSELAB, {
    headers: {
    'Authorization': `Bearer ${API_TOKEN}` 
  }
})

const remainItemsPromise = getRequest(API_ITEMS)  

Promise.all([itemsPromise, remainItemsPromise])
  .then((responses: any[]) => {
    const myJson = responses[0]
    const remainingItems = responses[1]

    // ... betyder "spread operator"
    const items : Item[] = [...myJson.items] 

    const mappedItems = mapRemainingItemsToOriginalItems(remainingItems, items)

    writeUserToHtml(myJson.user)

    writeItemsToHTML(mappedItems)

  })
