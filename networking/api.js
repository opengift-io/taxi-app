import Base64 from './base64'

export default class API {
    countries() {
        return fetch('http://159.89.9.187:5000/countries',
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + Base64.btoa('admin:admin'),
                }
            }
        )
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson;
            })
            .catch((error) => {
                console.error(error);
            });
    }

    cities() {
        return fetch('http://159.89.9.187:5000/cities',
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + Base64.btoa('admin:admin'),
                },
            }
        )
            .then((data) => data.json())
            .then((result) => result)
            .catch((error) => { console.log(error); })
    }

    users(method, bodyData) {
        if (method == 'GET') {
            return fetch('http://159.89.9.187:5000/users',
                {
                    method: method,
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Basic ' + Base64.btoa('admin:admin'),
                    },
                }
            )
                .then((data) => data.json())
                .then((result) => result)
                .catch((error) => { console.log(error); })
        }
        else if (method == 'POST') {
            return fetch('http://159.89.9.187:5000/users',
                {
                    method: method,
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Basic ' + Base64.btoa('admin:admin'),
                    },
                    body: JSON.stringify(bodyData)
                }
            )
                .then((data) => data.json())
                .then((result) => result)
                .catch((error) => { console.log(error); })
        }

    }
}