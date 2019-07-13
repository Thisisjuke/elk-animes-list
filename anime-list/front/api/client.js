const axios = require('axios');

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3005',
});

module.exports = axiosInstance;