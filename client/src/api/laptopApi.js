import axios from 'axios';

export const listLaptop = (params) => {
    return axios.get('/laptop').then(res => res.data);
};
