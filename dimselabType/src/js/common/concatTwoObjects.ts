import { Item } from "../interface/item";

//laver nærmest et join
export const concatTwoObjects = (arr: any[], items: Item[]) => {
  const mappedItems: any[] = []
  arr.forEach(i => {
    const match = items.find((item: any) => item.uid === i.item_uid)
    const newObject = { ...i, ...match }
    mappedItems.push(newObject)
  })

  return mappedItems
}