import Base64 from './base64'

export default class API {
     countries() {
        // try {
        //     let data = await fetch('http://159.89.9.187:5000/countries',
        //         {
        //             method: 'GET',
        //             headers: {
        //                 Accept: 'application/json',
        //                 'Content-Type': 'application/json',
        //                 'Authorization': 'Basic ' + btoa('admin:admin'),
        //             }
        //         }
        //     )
        //     let result = await data.json()
        //     return result
        // }
        // catch (error) {
        //     console.log(error);
        // }

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
    //'/cities/?where='{"title":{"$regex":"Aba.*"}}'
    cities(countryId, page, searchKey) {
        let where = JSON.stringify({
            country: countryId,
            title: { "$regex": searchKey + ".*" }
        })
        return fetch(`http://159.89.9.187:5000/cities?where=${where}&page=${page}`,
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

    users(method, bodyData, phone) {
        if (method == 'GET') {
            let where = JSON.stringify({ "phone": phone })
            let url = `http://159.89.9.187:5000/users?where=${where}`
            console.log(url);
            return fetch(url,
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
    drivings(method, bodyData, page, orderId) {
        if (method == 'POST') {
            console.log('ggggggggggggggggggggggg');
            console.log(bodyData);
            
            return fetch(`http://159.89.9.187:5000/drivings`,
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
        else if (method == 'GET') {
            let where= JSON.stringify(bodyData)
            console.log(`http://159.89.9.187:5000/drivings?page=${page}&where=${where}`);
            
            
            return fetch(`http://159.89.9.187:5000/drivings?page=${page}&where=${where}`,
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
        else if (method == 'DELETE') {
            console.log(orderId);
            let where = JSON.stringify({
                id: orderId,
            })
            return fetch(`http://159.89.9.187:5000/drivings?where=${where}`,
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
                .then((result) => {
                    console.log(result);

                    return result
                })
                .catch((error) => { console.log(error); })
        }

    }
}