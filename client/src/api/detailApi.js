import axios from 'axios';

export const getId = (params) => {    
    return axios.post(`/detail`, {
        params
      }).then(function(res) {
        return res.data;
      })
      .catch(function(error) {
        console.log(error);
      });
};