/**
 *  mpesa-online
 *  Copyright(c) 2018 Njunge Njenga
 *  MIT Licensed
 *
 */

'use strict'

/**
 *  Module dependencies
 */
const request = require('request-promise-native')
const Buffer = require('safe-buffer').Buffer

// Parameters required by the lib to make an mpesa payment
const processRequestRequiredParams =
    [
      'BusinessShortCode',
      'TransactionType',
      'Amount',
      'PartyA',
      'PartyB',
      'PhoneNumber',
      'CallBackURL',
      'AccountReference',
      'TransactionDesc',
      'consumerKey',
      'consumerSecret',
      'passKey',
      'authenticationURL',
      'processRequestURL'
    ]

const queryRequestRequiredParams =
    [
      'BusinessShortCode',
      'CheckoutRequestID',
      'consumerKey',
      'consumerSecret',
      'passKey',
      'authenticationURL',
      'processRequestURL'
    ]

module.exports = class MpesaRequest {
  constructor (params, requestType) {
    this.params = params
    this.requestType = requestType
  }

  /**
     * Get the accessToken and make a Lipa na M-Pesa Online Payment
     *
     * @returns {Promise} - Returns responses from mpesa as well as any errors that may occur during processing
     */
  post () {
    return new Promise((resolve, reject) => {
      const paramsArray = this.storeParamsInArray()
      const requiredParams = this.requestType === 'processRequest' ? processRequestRequiredParams : queryRequestRequiredParams
      const missingParams = this.missingParams(requiredParams, paramsArray)
      const emptyParams = this.emptyParams()
      // return the missing params
      if (missingParams) {
        const result = { errorCode: 400, errorMessage: 'missing param(s) ' + missingParams.slice(0, -2) }
        reject(result)
      }
      // return the params containing empty values
      if (emptyParams) {
        const result = { errorCode: 400, errorMessage: emptyParams.slice(0, -2) + ' param(s) cannot be empty' }
        reject(result)
      }
      // Get access token
      this.getAccessToken().then(response => {
        const accessToken = JSON.parse(response).access_token
        // Make mpesa payment
        this.makeMpesaOnlinePayment(accessToken).then(result => {
          resolve(result)
        }).catch(result => {
          reject(result.error)
        })
      }).catch(result => {
        reject(result.error)
      })
    })
  }
  getAccessToken () {
    const auth = 'Basic ' + new Buffer(this.params.consumerKey + ':' + this.params.consumerSecret).toString('base64')
    const authParams = {
      url: this.params.authenticationURL, headers: { 'Authorization': auth }
    }
    return this.mpesaRequest(authParams).then(response => response)
  }

  makeMpesaOnlinePayment (accessToken) {
    const timeStamp = new Date().toISOString().slice(-24).replace(/\D/g, '').slice(0, 14)
    const password = new Buffer(this.params.BusinessShortCode + this.params.passKey + timeStamp).toString('base64')
    const processRequestURL = this.params.processRequestURL
    this.params.Password = password
    this.params.Timestamp = timeStamp
    this.removeParams()

    const processRequestParams = {
      method: 'POST',
      url: processRequestURL,
      headers: { 'Authorization': 'Bearer ' + accessToken },
      json: this.params
    }

    return this.mpesaRequest(processRequestParams).then(response => response)
  }

  /**
     * @param {any} options
     *
     * @returns {Promise} - response from mpesa
     */
  mpesaRequest (options) {
    return request(options).then(response => response)
  }

  /**
     * Put the passed params in a array
     *
     * @returns {array} paramsArray - An array containing the params passed by the user
     */
  storeParamsInArray () {
    let paramsArray = []
    Object.keys(this.params).map((param) => {
      paramsArray.push(param)
    })
    return paramsArray
  }

  /**
     * Compare the required params to what has been passed. If there's a difference return the missing params.
     *
     * @returns {String} missingParams - String containing all the missing params
     */
  missingParams (requiredParams, paramsArray) {
    let missingParams = ''
    requiredParams.filter((param, index) => {
      const missingParam = paramsArray.indexOf(param) === -1
      if (missingParam) {
        missingParams += param + ', '
      }
    })
    return missingParams
  }

  /**
     * Check if any of the passed params are empty
     *
     * @returns {String} emptyParams - String containing all the params with empty/null/undefined values
     */
  emptyParams () {
    let emptyParams = ''
    Object.keys(this.params).map((param) => {
      if (!this.params[param]) {
        emptyParams += param + ', '
      }
    })
    return emptyParams
  }

  /**
     * Remove the params that are not required to make a processRequest call
     *
     */
  removeParams () {
    delete this.params.consumerKey
    delete this.params.consumerSecret
    delete this.params.authenticationURL
    delete this.params.processRequestURL
    delete this.params.passKey
  }
}
