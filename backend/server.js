const express = require('express');
const cors = require('cors');
const stripe = require('stripe');

const app = express();

app.use(express.json());
app.use(cors());

app.listen('8282', ()=>{
    console.log('Listening to port 8282');
})