const express = require('express');
const cors = require('cors');
const stripe = require('stripe')("sk_test_51NcPAuFo49q8D5COg68LEh5w7uqzPGNp9gPR6gY5hwY8JvbnzkDZ17gIUhEz9U2G1XrJeKSp8N1zmYMAxK1ZoopB001FF8A8DI");
const { v4:uuidv4 } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

//routes
app.post('/payment',(req,res)=>{
    const {product,token} = req.body;
    const idempotencyKey = uuidv4();

    return stripe.customers.create({
        email: token.email,
        source: token.id
    }).then((customer)=>{
        stripe.charges.create({
            amount: product.price * 100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email,
            description: product.name,
            shipping: {
                name: token.card.name,
                address: {
                    county: token.card.address_country
                }
            }
        },{idempotencyKey})
    }).then((result)=>{
        res.status(200).json(result);
    }).catch((error)=>{
        console.log(error);
    })
})

app.listen('8282', ()=>{
    console.log('Listening to port 8282');
})