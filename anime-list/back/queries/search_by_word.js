const search_by_word = (app, client) => {
    return app.get('/search/:word', (req, res) => {
        const query = {
            index: 'animes',
            type: '_doc',
            body: {
                query: {
                    bool: {
                        must: [
                            {
                                multi_match: {
                                    query: req.params.word,
                                    operator: 'or',
                                    fuzziness: 'auto',
                                    fields: ['titles.en', 'titles.en_jp']
                                }
                            }
                        ]
                    }
                }
            }
        };

        req.query.status ? query.body.query.bool.must.push({"term": {"status": {"value": req.query.status}}}) : null;
        req.query.age ? query.body.query.bool.must.push({"term": {"ageRating": {"value": req.query.age}}}) : null;

        client
            .search(query)
            .then(({body}) => {
                res.status(200).send(body.hits.hits);
            })
            .catch(() => {
                return res.status(500)
            });
    });
};

module.exports = search_by_word;