import { APIENDPOINT , getHeader } from '../app.config';
import axios from 'axios';
export default {


    signup(value) {
        return new Promise(function (resolve, reject) {
              axios.post(APIENDPOINT +'/signUp', value)
            .then(function (res) {
                console.log('from backend')
                resolve(res.data);
               
            })
            .catch(function (err) {
                reject(err.response.data)
                console.log('error')
                console.log('ahhhh')
            })
        });
      

    }


}