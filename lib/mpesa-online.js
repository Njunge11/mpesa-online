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
const MpesaRequest = require('./request')
const validRequestTypes = ['processRequest', 'queryRequest']

module.exports = class MpesaOnline {
  constructor (params, requestType) {
    this.params = params
    this.requestType = requestType
  }

  processRequest () {
    return new Promise((resolve, reject) => {
      if (!validRequestTypes.includes(this.requestType)) {
        const result = { errorCode: 400, errorMessage: 'Invalid requestType passed' }
        reject(result)
        return
      }
      new MpesaRequest(this.params, this.requestType).post()
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}
