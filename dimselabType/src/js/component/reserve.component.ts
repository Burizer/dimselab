const moment = require('moment')
const flatpickr = require('flatpickr')

export const writeReserveButtonsToHtml = (itemUid: string, amount: any) => {
  const button = document.createElement('button')
  const loanButton = document.createElement('button')
  const hr = document.createElement('hr')

  button.type = 'button'
  button.name = itemUid
  button.innerText = "Reserver denne"
  document.getElementById('items').appendChild(button)
  button.onclick = () => handleButtonClick(event)

  document.getElementById('items').appendChild(hr)
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
  submit.setAttribute('type', "submit")
  submit.setAttribute('value', "Submit")

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
      function (date: Date) {
        // return true to disable
        // Vælg datoer her der skal være slået fra (dage der er optaget)
        // Johan siger:
        //  Jeg tror at du skal bruge følgende metodik
        //  
        return testDates.includes(moment(date).format('DD-MM-YYYY'))
        // return (moment(date).format('DD-MM-YYYY') === moment().format('DD-MM-YYYY') || date.getDay() === 0);
      }
    ],
    onValueUpdate: function (date: Date[]) {
      chosenDates.start = date[0],
        chosenDates.end = date[1]

    }
  })

  document.getElementById('reservations').appendChild(datePicker)
  // lave en søge funktion efter "tags" fra ebbe's api  
  //#endregion Resvereknap
}