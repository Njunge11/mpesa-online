# mpesa-online
A lightweight library for node.js that simplifies integrating your website/web app to mpesa using the Lipa na mpesa online payment API . The API documentation is quite adequate and contains sufficient code samples for several languages, you can check it out [here.](https://developer.safaricom.co.ke/docs#lipa-na-m-pesa-online-payment) If you don't have a developers' account , please [register](https://developer.safaricom.co.ke/login-register) and [create an app.](https://developer.safaricom.co.ke/docs#creating-a-sandbox-app) This step is very important in order to access test short codes and credentials required by the API.

This library provides a quick and painless means to integrate to MPESA. It will be useful to developers that want to get up and running as fast as possible and also presents an opportunity to effortlessly test the payment experience for those who are unfamiliar with the process. 

## Installation
```
$ npm i mpesa-online
```
## Initiate mpesa transaction (processRequest)
#### The mpesaRequest() method expects 2 arguments - a params object and the request type (in this case processRequest). This request type will initiate an mpesa transaction and a USSD payment prompt (STK push) will be sent to your mobile device.

####
```javascript
const MpesaOnline = require('mpesa-online')
const mpesa = new MpesaOnline()

mpesa.mpesaRequest(params, 'processRequest')
  .then(response => console.log(response))
  .catch(error => console.log(error))
```
#### A sample of the params object:
```javascript
const params = {
  'BusinessShortCode': '', // The organization shortcode used to receive the transaction.
  'TransactionType': 'CustomerPayBillOnline', // The transaction type to be used for this request.
  'Amount': '1', // Amount to be charged / paid
  'PartyA': '', // The mobile number sending the funds.
  'PartyB': '', // The organization shortcode receiving the funds
  'PhoneNumber': '', // The mobile number sending the funds.
  'CallBackURL': '', // The url to where responses from M-Pesa will be sent to.
  'AccountReference': '', // Used with M-Pesa PayBills
  'TransactionDesc': 'Testing mpesa online',
  'consumerKey': '',
  'consumerSecret': '',
  'passKey': '', // Used to create a password for use when making a Lipa Na M-Pesa Online Payment API calls
  'authenticationURL': 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', // MPESA authentication end point
  'processRequestURL': 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest' // MPESA request processing end point
}
```
#### You can retrieve the BusinessShortCode (Lipa Na Mpesa Online Shortcode), PartyB and passKey (Lipa Na Mpesa Online Passkey) values [here.](https://developer.safaricom.co.ke/docs#test-credentials) A link to the test credentials is provided in the instructions.

#### To obtain the consumerKey and consumerSecret:
1. Login to the [developers' portal](https://developer.safaricom.co.ke/login-register)
2. Click on your app.
3. The 'Keys' tab contains both keys.

#### When you run your code, you should receive a USSD payment prompt(STK push) on your mobile device:
<p align = "center">
<img src = https://raw.githubusercontent.com/Njunge11/mpesa-online/master/IMG_8703.PNG  alt="STK push" width="250"/>
</p>

## Check payment status(queryRequest)
#### The queryRequest request type checks the status of the payment.

```javascript
const params = {
  'BusinessShortCode': '',
  'CheckoutRequestID': '',
  'consumerKey': '',
  'consumerSecret': '',
  'passKey': '',
  'authenticationURL': '',
  'queryRequestURL': 'https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query'
}
```
```javascript
mpesa.mpesaRequest(params, 'queryRequest')
  .then(response => console.log(response))
  .catch(error => console.log(error))
```
## Connecting the dots...
#### A snippet demonstrating how to make an mpesa payment request and query for the payments' status.
```javascript
// Add the mpesa-online module
const MpesaOnline = require('./lib/mpesa-online')
const mpesa = new MpesaOnline()

// The params required to make a processRequest
const processRequestParams = {
  'BusinessShortCode': '', // The organization shortcode used to receive the transaction
  'TransactionType': 'CustomerPayBillOnline', // The transaction type to be used for this request
  'Amount': '1', // Amount to be charged / paid
  'PartyA': '', // The mobile number sending the funds
  'PartyB': '', // The organization shortcode receiving the funds
  'PhoneNumber': '', // The mobile number sending the funds
  'CallBackURL': '', // Mpesa will push payment statuses to this URL
  'AccountReference': '', // Used with M-Pesa PayBills
  'TransactionDesc': 'Testing mpesa online',
  'consumerKey': '',
  'consumerSecret': '',
  'passKey': '', // Used to create a password for use when making a Lipa Na M-Pesa Online Payment API calls
  'authenticationURL': 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', // MPESA authentication end point
  'processRequestURL': 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest' // MPESA request processing end point
}

// Use processRequest to receive the USSD payment prompt(STK push) on your mobile device
mpesa.mpesaRequest(processRequestParams, 'processRequest')
  .then(response => {
    // If the response code is '0'(a success), query to check the status of the payment
    if (response.ResponseCode === '0') {
      poll(() => {
        const queryRequestParams = {
          'BusinessShortCode': '',
          'CheckoutRequestID': response.CheckoutRequestID,
          'consumerKey': '',
          'consumerSecret': '',
          'passKey': '',
          'authenticationURL': 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
          'queryRequestURL': 'https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query'
        }
        return mpesa.mpesaRequest(queryRequestParams, 'queryRequest')
          .then(response => response)
          .catch(error => error)
      }, 10000, 1000) // Let's query for the payment status every second for 10 seconds, to cater for any little delay in processing
        .then(response => console.log(response))
        .catch(error => console.log(error))
    } else {
      // An error occured, handle it
      console.log(response)
    }
  })
  .catch(error => {
    // An error occured, handle it
    console.log(error)
  })

const poll = (fn, timeout, interval) => {
  const endTime = Number(new Date()) + (timeout)
  const query = (resolve, reject) => {
    fn()
      .then(result => {
        if (result.ResponseCode === '0') {
          // Payment successful
          resolve(result)
        } else if (Number(new Date()) < endTime && (result.errorCode === '500.001.1001' &&
          result.errorMessage === 'The transaction is being processed')) {
          // Payment pending, continue querying
          console.log('continue polling', result)
          setTimeout(query, interval, resolve, reject)
        } else if (Number(new Date()) > endTime) {
          // Configured timeout period has lapsed, handle it
          reject(result)
        } else {
          // An error occured, handle it
          reject(result)
        }
      })
      .catch(error => {
        // An error occured, handle it
        reject(error)
      })
  }
  return new Promise(query)
}
```
## License
#### MIT

