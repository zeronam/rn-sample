import axios from 'axios';

export const getListUser = (params) => {
    return axios.get('/listuser').then(res => res.data);
};