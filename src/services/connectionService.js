const apiUrl="https://funsitesstage.feedconstruct.com/api/";

const COUNTRIES = {
    ALL_COUNTRIES: {URL: 'countries'}
};

class ConnectionService {
    getCountries (params = {}) {
        return new Promise((resolve, reject) => {
            fetch(apiUrl + COUNTRIES.ALL_COUNTRIES.URL + `?offset=${params.offset}&limit=${params.limit}`)
                .then(res => res.json())
                .then(res => { resolve(res) })
                .catch(err => { reject(err) });
        });
    }
}

export default new ConnectionService();