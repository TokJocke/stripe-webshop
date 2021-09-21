import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { BrowserRouter } from 'react-router-dom';
import Layout from './components/layout';




function App() {

  let stripePromise = loadStripe("pk_test_51Jc4ATLpg1g4fXEzkx1YcfrQvbsFinZcj13y4UxktExST0waZLn4f3tRK0rUDMiGcRddjw9Kjfn7uMK8p4dqlae500SJZz8Dgi")


  return (
    <Elements stripe={stripePromise}>
      <BrowserRouter>
          <Layout />    
      </BrowserRouter>
    </Elements>
  );
}

export default App;