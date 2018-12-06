import { putRequest } from "../common/apiRequest";
import { API_ITEMS } from "../common/constants";


const createButton = (name: string, appendTo: string, handleClick: any) => {
  const button = document.createElement('button')
  button.innerHTML = name
  document.getElementById(appendTo).appendChild(button)
  button.onclick = () => handleClick(event)
}

const APPEND_TO = 'items'

export const writeLoanButtonsToHtml = () => {
  createButton('Lån dims', APPEND_TO , handleLoanButtonClick)
  createButton('Aflever dims', APPEND_TO , handleReturnButtonClick)
}

const handleLoanButtonClick = (event: any) => {
  const item_loan_amount = prompt('Antal')
  const item_uid = prompt('Scan venligst stregkode')
  putRequest(`${API_ITEMS}/getitem/${item_uid}`, {
    amount_to_loan: item_loan_amount
  })
}

const handleReturnButtonClick = (event: any) => {
  const item_uid = prompt('Scan venligst stregkode')
  putRequest(`${API_ITEMS}/return/${item_uid}`, {
  })
}