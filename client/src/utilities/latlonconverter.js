// ​import NodeGeocoder from 'node-geocoder';
const NodeGeocoder = require('node-geocoder')
​
const options = {
    provider: 'google',
    apiKey: 'AIzaSyArYUj_aKKGPm5FDl1dAf_CN_Ni62nkAMM',
    formatter: null
}
​
const geocoder = NodeGeocoder(options)
const address = '9111 Palm Tree Drive'
​
geocoder.geocode(address)
    .then(function(res) {
        console.log(res)
    })
    .catch(function(err) {
        console.log(err)
    })