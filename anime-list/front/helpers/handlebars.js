const dayjs = require('dayjs');
const paginate = require('jw-paginate');

const register = function(Handlebars) {
    const helpers = {
        formatDate: function(date) {
            return dayjs(date).format('DD MMMM, YYYY');
        },
        ifCond: (v1, v2, options) => {
            if (v1 === v2) {
                return options.fn(this);
            }
            return options.inverse(this);
        },
        displayStars,
        paginateHelper
    };

    if (Handlebars && typeof Handlebars.registerHelper === "function") {
        for (const prop in helpers) {
            Handlebars.registerHelper(prop, helpers[prop]);
        }
    } else {
        return helpers;
    }

};

const displayStars = (rate) => {
    const fullStar = '●';
    const halfStar = '◐';
    const emptyStar = '○';

    let rating = rate/100*5;

    rating = Math.round(rating * 2) / 2;
    let output = [];
    let i;

    for (i = rating; i >= 1; i--){
        output.push(fullStar);
    }

    if (i === .5) output.push(halfStar);

    for (i = (5 - rating); i >= 1; i--)
        output.push(emptyStar);

    return output.join('');
};

const paginateHelper = (current, total, size=20, maxPages=7) => {
    const pagination = paginate(total, parseInt(current), size, maxPages);
    return generatePaginationHTML(pagination.pages, parseInt(current));
};

const generatePaginationHTML = (tab, current) => {
    let htmlTab = [];
    tab.forEach((elem) => {
        if(elem === current) htmlTab.push(`<li><a class="active">${elem}</a></li>`)
        else htmlTab.push(`<li><a href="?page=${elem}">${elem}</a></li>`)
    });
    return htmlTab.join('');
};

module.exports.register = register;
module.exports.helpers = register(null); 