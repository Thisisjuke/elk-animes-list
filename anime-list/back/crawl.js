const axios = require('axios');
const { Client } = require('es6');
const client = new Client({ node: 'http://localhost:9200' });

const bulkData = data => {
    const bulk = {
        index: {
            _index: 'animes',
            _type: '_doc',
            _id: data.data.id
        }
    };
    return [bulk, data.data.attributes];
};

const indexAnimes = (anime_id = 1) => {
  axios
    .get(`https://kitsu.io/api/edge/anime/${anime_id}`)
    .then(resp => {
      indexAnimes(anime_id + 1);

      const bulk = bulkData(resp.data);
      debugger;

      client
        .bulk({
          refresh: true,
          body: bulk
        })
        .then(() => {
          console.log(`Anime ${anime_id} indexed!`);
        });
    })
    .catch(e => {
      console.error(e);
      indexAnimes(anime_id + 1);
    });
};

indexAnimes();
