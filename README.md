# mpesa-online
A lightweight library for node.js that simplifies integrating your website/web app to mpesa using the Lipa na mpesa online payment API . The API documentation is quite adequate and contains sufficient code samples for several languages, you can check it out [here.](https://developer.safaricom.co.ke/docs#lipa-na-m-pesa-online-payment) If you don't have a developers' account , please [register](https://developer.safaricom.co.ke/login-register) and [create an app.](https://developer.safaricom.co.ke/docs#creating-a-sandbox-app) This step is very important in order to access test short codes and credentials required by the API.

This library provides a quick and painless means to integrate to MPESA. It will be useful to developers that want to get up and running as fast as possible and also presents an opportunity to effortlessly test the payment experience for those who are unfamiliar with the process. 

## Installation
```
$ npm install mpesa-online
```
## Initiate mpesa transaction (processRequest)
#### The constructor expects 2 arguments - a params object and the request type (in this case processRequest). 'processRequest' will initiate an mpesa transaction and a payment prompt (STK push) will be sent to your mobile device.

####
```javascript
const MpesaOnline = require('./lib/mpesa-online')

new MpesaOnline(params, 'processRequest').mpesaRequest()
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
1. Login to the [developer's portal](https://developer.safaricom.co.ke/login-register)
2. Click on your app.
3. The 'Keys' tab contains both keys.

#### When you run your code, you should receive a payment prompt on your mobile device:
<p align = "center">
<img src = https://raw.githubusercontent.com/Njunge11/mpesa-online/master/IMG_8703.PNG  alt="STK push" width="250"/>
</p>

## Check payment status(queryRequest)
#### The queryRequest request type checks the status of the payment.
#### The params
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
new MpesaOnline(params, 'queryRequest').mpesaRequest()
  .then(response => console.log(response))
  .catch(error => console.log(error))
```
## License
#### MIT

