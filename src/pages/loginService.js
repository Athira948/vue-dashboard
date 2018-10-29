import { APIENDPOINT , getHeader } from '../app.config';
import axios from 'axios';
export default {

  
    login(value) {
        return new Promise(function (resolve, reject) {
              axios.post(APIENDPOINT +'/login', value)
            .then(function (res) {
                
                resolve(res.data);
             
                console.log('hello')
               
            })
            .catch(function (err) {
                reject(err.response.data)
              
               
            
                
            })
        });
      

    }


}