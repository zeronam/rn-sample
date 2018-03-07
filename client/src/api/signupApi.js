import axios from 'axios';

export const signUpApi = (params) => {
    return axios.post('/register', {
        params
      }).then(function(res) {
        return res.data;
      })
      .catch(function(error) {
        console.log(error);
      });      
};