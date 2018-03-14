import axios from 'axios';

export const searchProduct = (params) => {
    debugger;
    return axios.post('/search', {
        params
      }).then(function(res) {
          debugger;
        return res.data;
      })
      .catch(function(error) {
        console.log(error);
      });      
};