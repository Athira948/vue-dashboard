
export const APIENDPOINT = "http://localhost:3200/api";
export const getHeader = function () {
const tokenData = JSON.parse(window.localStorage.getItem('User'))


const headers = {
        'Accept':'application/json',
        'Authorization':'Bearer' + tokenData.access_token 
       }
       return headers
   
}