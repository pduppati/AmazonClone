/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
const functions = require("firebase-functions");
const {onRequest} = require("firebase-functions/v2/https");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51OhhdkFcnxzVGrg2eJU3oiBhXikbJUvPm6mkA96XLtTe8C54xyjTAA2fUXT0xBvr7OmMlwTvvnhlbHwmf9eOpCQO00nAk7K3qq"
);

// API

// - App config
const app = express();

const corsOptions = {
    origin: 'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}
app.use(cors(corsOptions));
// - Middlewares
// app.use(cors({ origin: true }));
app.use(express.json());

// - API routes
app.get("/", (request, response) => response.status(200).send({ "data": "hello world"}));

app.post("/payments/create", async (request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
    response.setHeader("Access-Control-Allow-Credentials", "true");
    response.setHeader("Access-Control-Max-Age", "1800");
    response.setHeader("Access-Control-Allow-Headers", "content-type");
    response.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 


  const total = request.query.total;

  console.log("Payment Request Recieved BOOM!!! for this amount >>> ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(total * 100), // subunits of the currency
    currency: "usd",
  });

  // OK - Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// - Listen command
exports.api = functions.https.onRequest(app);

// Example endpoint
// http://localhost:5001/challenge-4b2b2/us-central1/api

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");
// const functions = require('firebase-functions');
// const express = require('express');
// const cors = require('cors');
// const { request, response } = require("express");
// const stripe = require('stripe')('sk_test_51OhhdkFcnxzVGrg2eJU3oiBhXikbJUvPm6mkA96XLtTe8C54xyjTAA2fUXT0xBvr7OmMlwTvvnhlbHwmf9eOpCQO00nAk7K3qq');

// //app config
// const app = express();

// //middleware
// app.use(cors({ origin: true }));
// app.use(express.json());

// //api route
// app.get('/', (request, response) => response.status(200).send('hello world'));

// app.post('/payments/create', async (request, response) => {

//     response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//     response.setHeader('Access-Control-Allow-Methods', 'POST');
    
//     const total = request.query.total;
//     console.log('Payment received', total);

//     const paymentIntent = await stripe.paymentIntents.create({
//         amount: total,
//         currency: "usd"
//     });

    
    
//     //201 -ok created
//     response.status(201).send({
//         clientSecret: paymentIntent.client_secret
//     })
// })

// //listen command
// exports.api = functions.https.onRequest(app);

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
