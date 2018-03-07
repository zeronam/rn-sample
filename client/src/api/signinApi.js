import axios from 'axios';

export const signInApi = (params) => {
    return axios.post('/account', {
        params
      }).then(function(res) {
        return res.data;
      })
      .catch(function(error) {
        console.log(error);
      });      
};