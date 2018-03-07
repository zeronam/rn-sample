import axios from 'axios';

export const adminCreate = (params) => {
    return axios.post('/admin', {
        params
      }).then(function(res) {
        return res.data;
      })
      .catch(function(error) {
        console.log(error);
      });

      
};