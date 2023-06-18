import axios from 'axios';

const requests=axios.create({
    baseURL:'/music',
    timeout:10000
})

export default requests;