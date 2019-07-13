const axios = require('./client');

const getAllAnimes = async (page = 1) => {
    const resp = await axios.get(`/animes?page=${page}`)
        .then(response => {
            return response.data;
        });
    return resp;
};

module.exports = {
    getAllAnimes,
};