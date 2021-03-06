import Vue from 'vue'
import App from './App.vue'

/**
 * !important
 * before import/require `jsflagr` we need to config webpack
 * check vue.config.file
 */

const Jsflagr = require('jsflagr')


const flagrClient = new Jsflagr.ApiClient()

/**
 * Setup a custom base path/URI to connect to self-hosted Flagr server
 */
flagrClient.basePath = process.env.VUE_APP_FLAGR_BASEPATH
flagrClient.defaultHeaders = {
  Authorization: process.env.VUE_APP_FLAGR_AUTH
}

const getFeatureContext = async () => {
  /**
   * Create new API instance for getting Evaluation data
   */
  const apiInstance = new Jsflagr.EvaluationApi(flagrClient)
  /**
   * To use postEvaluationBatch, we need to add parameters
   * read more: https://checkr.github.io/flagr/api_docs/#operation/postEvaluationBatch
   */
  const body = new Jsflagr.EvaluationBatchRequest.constructFromObject({
    "entities": [{}],
    "flagTags": [
      process.env.VUE_APP_FLAGR_TAGS
    ],
  })

  apiInstance.postEvaluationBatch(body, (error, data) => {
    if (error) {
      console.error(error)
    } else {
      return data
    }
    return {}
  })
}

/**
 * TODO:
 * - need to find the best way to store this data
 */

const featureContext = getFeatureContext()

console.log(featureContext)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')