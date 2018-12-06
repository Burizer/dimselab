import {getRequest, postRequest, putRequest} from './common/apiRequest'
import * as constants from './common/constants'
import { writeLoanButtonsToHtml } from './component/buttons.component';
import { Item } from './interface/item';
import { concatTwoObjects } from './common/concatTwoObjects';
import { writeUserToHtml } from './component/user.component';
import { writeItemsToHtml } from './component/items.component';

const itemsPromise = getRequest(constants.API_DIMSELAB, {
    headers: {
    'Authorization': `Bearer ${constants.API_TOKEN}` 
  }
})

const remainItemsPromise = getRequest(constants.API_ITEMS)  

Promise.all([itemsPromise, remainItemsPromise])
  .then((responses: any[]) => {
    const myJson = responses[0]
    const remainingItems = responses[1]
    const items : Item[] = [...myJson.items] 
    const mappedItems = concatTwoObjects(remainingItems, items)

    writeUserToHtml(myJson.user)
    writeLoanButtonsToHtml()
    writeItemsToHtml(mappedItems)
  })
