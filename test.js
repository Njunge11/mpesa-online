const MpesaOnline = require('./lib/mpesa-online')
// const params = {
//   'BusinessShortCode': '174379',
//   'TransactionType': 'CustomerPayBillOnline',
//   'Amount': '1',
//   'PartyA': '254726325093',
//   'PartyB': '174379',
//   'PhoneNumber': '254726325093',
//   'CallBackURL': 'https://developer.safaricom.co.ke/',
//   'AccountReference': '4002',
//   'TransactionDesc': 'Testing mpesa online',
//   'consumerKey': 'IQy1VSCZAqM7BaBjuLWazjYI1R4Dp0J2',
//   'consumerSecret': '5gLwicObjcxXG5IE',
//   'passKey': 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919',
//   'authenticationURL': 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
//   'processRequestURL': 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest'
// }
// new MpesaOnline(params, 'processRequest').processRequest()
//   .then(response => console.log(response))
//   .catch(error => console.log(error))

const payload = {
  'BusinessShortCode': '174379',
  'CheckoutRequestID': 'ws_CO_DMZ_38189692_08062018041430377',
  'consumerKey': 'IQy1VSCZAqM7BaBjuLWazjYI1R4Dp0J2',
  'consumerSecret': '5gLwicObjcxXG5IE',
  'passKey': 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919',
  'authenticationURL': 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
  'processRequestURL': 'https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query'
}
new MpesaOnline(payload, 'queryRequest').processRequest().then(response => console.log(response)).catch(error => console.log(error))
