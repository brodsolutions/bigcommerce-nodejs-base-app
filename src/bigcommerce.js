'use strict';
/* BigCommerce OAuth2 Authentication and API access */
const crypto = require('crypto'), Request = require('./request');
class BigCommerce {
  constructor(config) {
    if (!config) {throw new Error('Config missing. The config object is required.');}
    this.config = config;
    this.apiVersion = this.config.apiVersion || 'v2';
  }
  // https://developer.bigcommerce.com/docs/ZG9jOjEyNDcxODE-handling-callbacks#verifying-the-signed-payload
  verify(signedRequest) {
    const splitRequest = signedRequest.split('.'); // encoded_json_string.encoded_hmac_signature
    const signature = Buffer.from(splitRequest[1], 'base64').toString('utf8'); // decode the encoded_hmac_signature
    const json = Buffer.from(splitRequest[0], 'base64').toString('utf8'); //decode the encoded_json_string
    const data = JSON.parse(json); // convert encoded_json_string to Object
    const expected = crypto.createHmac('sha256', this.config.secret).update(json).digest('hex'); // use Crypto to create hmac with client_secret
    return data;
  }
  // POST OAUTH2 to Get Access Token
  async authorize(query) {
    const payload = {
      client_id: this.config.clientId,
      client_secret: this.config.secret,
      redirect_uri: this.config.callback,
      grant_type: 'authorization_code',
      code: query.code,
      scope: query.scope,
      context: query.context
    };
    const request = new Request('login.bigcommerce.com', {
      failOnLimitReached: this.config.failOnLimitReached
    });
    return await request.run('post', '/oauth2/token', payload);
  }
  // API Requests to BigCommerce API
  createAPIRequest() {
    const accept = this.config.responseType === 'xml' ? 'application/xml' : 'application/json';
    return new Request('api.bigcommerce.com', {
      headers: Object.assign({
        Accept: accept,
        'X-Auth-Token': this.config.accessToken
      }, this.config.headers || {}),
      failOnLimitReached: this.config.failOnLimitReached,
      agent: this.config.agent
    });
  }
  async request(type, path, data) {
    if (!this.config.accessToken || !this.config.storeHash) {throw new Error('Access Token & Store Hash are required to call the BigCommerce API');}
    const extension = this.config.responseType === 'xml' ? '.xml' : '';
    const version = this.apiVersion;
    const request = this.createAPIRequest();
    let fullPath = `/stores/${this.config.storeHash}/${version}`;
    if (version !== 'v3') {fullPath += path.replace(/(\?|$)/, extension + '$1');
    } else {fullPath += path;}
    return await request.run(type, fullPath, data);
  }
  async get(path) {return await this.request('get', path);}
  async post(path, data) {return await this.request('post', path, data);}
  async put(path, data) {return await this.request('put', path, data);}
  async delete(path) {return await this.request('delete', path);}
}
module.exports = BigCommerce;
