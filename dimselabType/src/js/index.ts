const flatpickr = require("flatpickr")
const moment = require('moment');


//område til interface(wannabe class)
export interface Item
{
  uid: string;
  item: string;
  // amount skal ændres til number
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
const API_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6InRlc3QgYWNjb3VudCIsIm5hbWUiOiJTdHVkZW50IiwiYWRtaW4iOmZhbHNlLCJpYXQiOjE1NDI2MzQ5NTMsImV4cCI6MTU1ODQxNDk1M30.YJAjKlKx5QWYtyb_sIEKRfNRIKtnlci3nn2Ee7o4Ges'
const API_URL2 = 'https://3semesterprojekt.azurewebsites.net/api/barcodedatabase'
const API_URL3 ='API til res'


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
      const button = document.createElement('button')
      const LoanButton = document.createElement('button')
      button.type = 'button'
      button.name = item.uid
      button.innerText = "Reserver denne"
      LoanButton.innerHTML = "Lån denne"
      //#region Resvereknap
      button.onclick = function(event: any) {
        const itemId = event.target.name

        let availableItems: number
        // 1) Hent hvor mange der er available
        // fetch('API')
        //   .then((response) => {
        //     return response.json()
        //   })
        //   .then((resAsJSON) => {
        //     availableItems = resAsJSON.amount
        //   })
        // 1.A) Find ud af hvilke datoer er optaget
            // fetch('http://example.com/movies.json', {
          //   method: 'GET',
          //     // body: {
                
          //     // }
          // })
          //   .then(function(response) {
          //    return response.json();
          //   })
          //   .then(function(myJson) {
          //   console.log(JSON.stringify(myJson));
          //    });
          

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

        //const availableItemsLabel = document.createElement('div')
        //availableItemsLabel.innerHTML = `<bold> Ledige enheder: </bold> ${availableItems}`
        // document.getElementById('reservations').appendChild(availableItemsLabel) 
        
        
        if (currentForm) { // hvis den ikke er undefined (hvis den findes)
          currentForm.replaceWith(form) // Så udskift den med den nye form
        } else { // ellers
          document.getElementById('reservations').appendChild(form) // så indsæt en ny form
        }

        // 3) POST til API for at reservere
        submit.onclick = (event: any) => {
          event.preventDefault
          console.log(event.target)
          // post til API HER (API_URL)
          // fetch('http://example.com/movies.json', {
          //   method: 'POST',
          //     // body: {
                
          //     // }
          // })
          //   .then(function(response) {
          //    return response.json();
          //   })
          //   .then(function(myJson) {
          //   console.log(JSON.stringify(myJson));
          //    });
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

            console.log(chosenDates)
          }    
        })

        document.getElementById('reservations').appendChild(datePicker)

        //lave en hurtigt lån, knap ved siden af resavere hvor man låner et objekt i 30 dage, skal afleveres sidste hverdag inde for de sidste 30 dage
        // hente rasten af info'en fra fetch og ebbes api
        // lave en søge funktion efter "tags" fra ebbe's api  
        //#endregion Resvereknap
    }
    //#region Lånknap
    LoanButton.onclick = function(event: any){
      // let barcode: HTMLInputElement = <HTMLInputElement> document.getElementById("barcodeScanner");
      // alert("Scan hvad du vil låne")
      // if (item.amount != 0)
      // {
      //   alert('Varen er udlånt')
      //   // put vores metode ind her
      //   fetch('http://example.com/movies.json',{
      //     method: 'PUT'
      //   })
      //   .then(function(response) {
      //     return response.json();
      //   })
      //   .then(function(myJson) {
      //     console.log(JSON.stringify(myJson));
      //   });
      // }
      // else 
      // {
      //   alert('Der er ikke nogle ledige')
      // }
      // // barcode.addEventListener("keydown", function(event)){
      // //   if(event.key === 'Enter') {
      // //     alert(barcode.value);    
      // // }
      // document.getElementById("barcodeScanner").focus();
    };
    //#endregion låneknap
    document.getElementById('items').appendChild(button)
    document.getElementById('items').appendChild(LoanButton)
    document.getElementById('items').appendChild(hr)
    })
});
const SetHtmlElement = (element: string, value: string) => {
      document.getElementById(element).innerText = value.toString()
  
}
// ved siden af, resvarer knappen skal du have muligheden bare at låne den i 30 dage;
// knappen