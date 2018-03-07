import axios from 'axios';

export const listMobile = (params) => {
    return axios.get('/mobile').then(res => res.data);
};