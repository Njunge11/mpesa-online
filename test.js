const MpesaOnline = require('./lib/mpesa-online')
const params = {
  'BusinessShortCode': '174379', // The organization shortcode used to receive the transaction.
  'TransactionType': 'CustomerPayBillOnline', // The transaction type to be used for this request.
  'Amount': '1', // Amount to be charged / paid
  'PartyA': '254726325093', // The mobile number sending the funds.
  'PartyB': '174379', // The organization shortcode receiving the funds
  'PhoneNumber': '254726325093', // The mobile number sending the funds.
  'CallBackURL': 'https://developer.safaricom.co.ke/', // The url to where responses from M-Pesa will be sent to.
  'AccountReference': '4002', // Used with M-Pesa PayBills
  'TransactionDesc': 'Testing mpesa online',
  'consumerKey': 'IQy1VSCZAqM7BaBjuLWazjYI1R4Dp0J2',
  'consumerSecret': '5gLwicObjcxXG5IE',
  'passKey': 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919', // Used to create a password for use when making a Lipa Na M-Pesa Online Payment API calls
  'authenticationURL': 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', // MPESA authentication end point
  'processRequestURL': 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest' // MPESA request processing end point
}
new MpesaOnline(params, 'processRequest').mpesaRequest()
  .then(response => console.log(response))
  .catch(error => console.log(error))

// const payload = {
//   'BusinessShortCode': '',
//   'CheckoutRequestID': '',
//   'consumerKey': '',
//   'consumerSecret': '5gLwicObjcxXG5IE',
//   'passKey': '',
//   'authenticationURL': '',
//   'queryRequestURL': 'https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query'
// }
// new MpesaOnline(payload, 'queryRequest').processRequest()
//   .then(response => console.log(response))
//   .catch(error => console.log(error))
