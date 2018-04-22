import axios from 'axios';

export const PostData = (params) => {
    return axios.post('http://localhost:5000/facebook', {
        params
      }).then(function(res) {
        return res.data;
      })
      .catch(function(error) {
        console.log(error);
      });

      
};