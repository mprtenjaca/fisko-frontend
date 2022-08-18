import axios from 'axios';

export default axios.create({
    baseURL: 'https://prte-invoice.herokuapp.com',
    //headers: {'Authorization': 'Bearer ' + }
});