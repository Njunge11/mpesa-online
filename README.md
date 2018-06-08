# mpesa-online
A javascript library for node.js that simplifies integrating your website/web app to mpesa using the Lipa na mpesa online payment API . The MPESA API is quite adequate and contains sufficient code samples for several languages, you can check it out [here.](https://developer.safaricom.co.ke/docs#lipa-na-m-pesa-online-payment)

This library provides a quick and painless means to integrate to MPESA. It will be useful to developers that want to get up and running as fast as possible and also presents an opportunity to effortlessly test the payment experience for those who are unfamiliar with the process.

## Installation
```
$ npm install mpesa-online
```
## Initiate mpesa transaction (processRequest)
```javascript
const MpesaOnline = require('./lib/mpesa-online')
const params = {}
new MpesaOnline(params, 'processRequest').processRequest()
  .then(response => console.log(response))
  .catch(error => console.log(error))
```
##### In the snippet above, a params object is required to be passed:
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
  'authenticationURL': '', // MPESA authentication end point
  'processRequestURL': '' // MPESA request processing end point
}
```
##### You can retrieve the BusinessShortCode(Lipa Na Mpesa Online Shortcode), PartyB and passKey(Lipa Na Mpesa Online Passkey) values by :
1. Login into the [developer's portal](https://developer.safaricom.co.ke/login-register)
2. On the navbar, select 'DOCS'
3. Click 'Test Credentials' on the side bar
4. A link to the test credentials is provided in the instructions
##### To obtain the consumerKey and consumerSecret:
1. Login to the [devevolper's portal](https://developer.safaricom.co.ke/login-register)
2. Click on your app.
3. The 'Keys' tab contains both keys.

##### The required sandbox/test URL's
type   | url
--- | ---
authenticationURL   |   https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials
processRequestURL   |   https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest

##### After passing the correct params and running your code, you should receive a payment prompt on your mobile device:
<img src = https://raw.githubusercontent.com/Njunge11/mpesa-online/master/IMG_8703.PNG  alt="STK push" width="250"/>

## Check payment status(queryRequest)
##### The params
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
##### Call processRequest and set the request type to queryRequest
```javascript
new MpesaOnline(params, 'queryRequest').processRequest()
  .then(response => console.log(response))
  .catch(error => console.log(error))
```

