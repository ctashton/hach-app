import axios from 'axios'

export default class AuthHelperMethods {
    login = (username, password) => {
        axios.post(`/login`,{
            username,
            password
          }).then(res => {
            
            this.setToken(res.token) // Setting the token in localStorage
            return Promise.resolve(res);
        })
    
    }
}