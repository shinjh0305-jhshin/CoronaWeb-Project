const {google} = require('googleapis')
const {JWT} = require('google-auth-library')
require('dotenv').config();
const credentials = require('./keys.json');

async function create() {
    const client = new JWT({
        keyFile: './keys.json',
        scopes: ['https://www.googleapis.com/auth/spreadsheets']
    })
    client.authorize();

    const service = google.sheets({version: 'v4', auth: client});
    
    return service;
}

module.exports = {create};