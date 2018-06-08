# mpesa-online
Uncomplicated javascript library for node.js that simplifies integrating your website/web app to mpesa using the Lipa na mpesa online payment API . The MPESA API is quite adequate and contains sufficient code samples for several languages, you can check it out [here.](https://developer.safaricom.co.ke/docs#lipa-na-m-pesa-online-payment)

This library provides a quick and painless means to integrate to the platform. It will be useful to developers that want to get up and running as fast as possible and also presents an opportunity to effotlessly test the payment experience for those who are unfamiliar with the process.

## Installation
```
$ npm install mpesa-online
```
### Initiate mpesa transaction
```javascript
const MpesaOnline = require('./lib/mpesa-online')
const params = {}
new MpesaOnline(params, 'processRequest').processRequest()
  .then(response => console.log(response))
  .catch(error => console.log(error))
```
##### In the snippet above, a params object is required to be passed. Below is a sample of what's required:
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
