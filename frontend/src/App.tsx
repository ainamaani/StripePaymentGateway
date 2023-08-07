import React,{useState} from 'react';
import StripeCheckout,{Token} from 'react-stripe-checkout';
import axios from 'axios';

function App():JSX.Element {

  const [product,setProduct] = useState({
    name: "Laptop from DELL",
    price: 1000,
    productBy: "DELL"
  });
  

  const makePayment = (token:Token) =>{
    const body = {
      token,
      product
    }
    return axios.post("http://localhost:8282/payment",
                      JSON.stringify(body),{
                        headers:{
                          'Content-Type':'application/json'
                        }
                      }
    ).then((response)=>{
      const {status} = response;
      console.log("RESPONSE",response);
      console.log(status);
    }).catch((error)=>{
      console.log(error);
    })
  }

  return (
    <div className="App">
      <h2>Make a payment</h2>
      {/* @ts-ignore */}
      <StripeCheckout stripeKey='pk_test_51NcPAuFo49q8D5COi5DnWZxErp1axl33o1IgfMbmynObwXG0wxrFnPxhzhWtcrp5fXtFX5wA2bN9n3SYQ1dTTvNe00HKNmvShX' 
      token={makePayment} 
      name='Buy Laptop'
      amount={product.price * 100}
      description="A powerful laptop from DELL" 
      currency="eur" 
      billingAddress={true} 
      shippingAddress={true} 
      zipCode={true} 
      >
          <button>Buy laptop at just ${product.price}</button>
      </StripeCheckout>
    </div>
  );
}

export default App;
