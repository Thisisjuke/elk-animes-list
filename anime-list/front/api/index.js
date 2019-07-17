const axios = require('./client');

const queryAnimes = async (url, res) => {
    const resp = await axios.get(url)
        .then(response => {
            return response.data;
        }).catch(() => {
            return res.redirect(301, "/not_found");
        });
    return resp;
};

module.exports = {
    queryAnimes,
};