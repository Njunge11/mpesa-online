/**
 *  mpesa-online
 *  Copyright(c) 2018 Njunge Njenga
 *  MIT Licensed
 *  TO-D0 - add callback logic
 */

'use strict'

/**
 *  Module dependencies
 */
const ProcessRequest = require('./request')
const validRequestTypes = ['processRequest', 'queryRequest']

module.exports = class MpesaOnline {
  mpesaRequest (params, requestType) {
    return new Promise((resolve, reject) => {
      if (!validRequestTypes.includes(requestType)) {
        const result = { errorCode: 400, errorMessage: 'Invalid requestType passed' }
        reject(result)
        return
      }
      new ProcessRequest(params, requestType).post()
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}
