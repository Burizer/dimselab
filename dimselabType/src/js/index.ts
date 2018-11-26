import Axios, { } from '../../node_modules/axios/index';

//område til HTML elementer 
let API = document.getElementById("API") as HTMLTextAreaElement

//område til interface(wannabe class)
interface APIelementer
{
    uid : string,
    item : string,
    amount: number,
    description: string,
    link : string
}

//get all
// replace user? med din api
Axios.get("http://api.evang.dk/dimselab/v1/items.php?", {
    'headers': 
    {
        'Authorization' : 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6InRlc3QgYWNjb3VudCIsIm5hbWUiOiJTdHVkZW50IiwiYWRtaW4iOmZhbHNlLCJpYXQiOjE1NDI2MzQ5NTMsImV4cCI6MTU1ODQxNDk1M30.YJAjKlKx5QWYtyb_sIEKRfNRIKtnlci3nn2Ee7o4Ges'
    }
})
.then(function (response)
{
    let APPI = response.data as APIelementer[];

    APPI.forEach(GetItem => {
        API.value += " ID " + GetItem.uid + "Item " +GetItem + "Amount " + GetItem.amount + "description " + GetItem.description + "link " + GetItem.link + "\n";
    }); 
    console.log(response);
})
.catch(function (error) {
  // handle error
  console.log(error);
});
