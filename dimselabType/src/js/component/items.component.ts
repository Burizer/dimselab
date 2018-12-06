import { Item } from "../interface/item";
import {writeReserveButtonsToHtml } from './reserve.component'

export const writeItemsToHtml = (items: any[]) => {
  items.forEach((item: Item) => {
    writeItemsTextToHtml(item)
    writeReserveButtonsToHtml(item.uid, item.item_amount)
  })
}

const writeItemsTextToHtml = (item: Item) => {
  Object.keys(item).forEach((key) => {
    if (!key.startsWith('item_')) {
      // Du har hvert item her
      const wrapper = document.createElement("div")
      let value
      if (key === 'amount') {
        value = document.createTextNode(`${item.item_amount} / ${item.amount} tilgængelig`)
      } else {
        value = document.createTextNode(item[key])
      }

      wrapper.appendChild(value)
      document.getElementById('items').appendChild(wrapper)
    }
  })
}