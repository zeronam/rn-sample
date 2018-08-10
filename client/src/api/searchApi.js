import axios from 'axios';

export const searchProduct = (params) => {
  console.log(params);
    return axios.post('/search', {
        params
      }).then(function(res) {
        return res.data;
      })
      .catch(function(error) {
        console.log(error);
      });      
};