const apiUrl="https://funsitesstage.feedconstruct.com/api/";

const COUNTRIES = {
    ALL_COUNTRIES: {URL: 'countries'}
};

const queryParams = (params) => {
    return Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');
};

class ConnectionService {
    getCountries (params = {}) {
        return new Promise((resolve, reject) => {
            fetch(apiUrl + COUNTRIES.ALL_COUNTRIES.URL + '?' + queryParams(params))
                .then(res => res.json())
                .then(res => { resolve(res) })
                .catch(err => { reject(err) });
        });
    }
}

export default new ConnectionService();