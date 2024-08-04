// test.js

const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const form = new FormData();
form.append('file', fs.createReadStream('/home/joe/Pictures/1975.png'));

axios.post('http://localhost:3000/api/upload', form, {
  headers: {
    ...form.getHeaders(),
  },
})
.then(response => {
  console.log('Upload response:', response.data);
})
.catch(error => {
  console.error('Error:', error);
});
