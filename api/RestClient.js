import AsyncStorage from "@react-native-async-storage/async-storage";

export default class RestClient {
    constructor (baseUrl = '', { headers = {}, devMode = false, simulatedDelay = 0 } = {}) {
      if (!baseUrl) throw new Error('missing baseUrl');
      this.headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };
      Object.assign(this.headers, headers);
      this.baseUrl = baseUrl;
      this.simulatedDelay = simulatedDelay;
      this.devMode = devMode;
    }
    async replayLastFetch(){

    }
    async accessTokenExpired(){
      console.warn("accessTokenExpired");
    }
    _simulateDelay () {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, this.simulatedDelay);
      });
    }
  
    _fullRoute (url) {
      return `${this.baseUrl}${url}`;
    }

    _fetch_retry = async (url, options, n) => {
      try {
          console.log("retry fetch " , url )
          return await fetch(url, options)
      } catch(err) {
        console.log({err})
          if (n <= 1) throw err;
          return await this._fetch_retry(url, options, n - 1);
      }
    };
  
    async _fetch (route, method, body, isQuery = false,options={}) {
      const defaultOptions = {
        authorizationHeader : true,
        edirect: 'follow'
      };
      options = {...defaultOptions,...options};
      if (!route) throw new Error('Route is undefined');
      var fullRoute = this._fullRoute(route);
      // console.log("API REQUEST: " + fullRoute + " body: " + JSON.stringify(body));
      console.log("API REQUEST: " + fullRoute );
      if (isQuery && body) {
        var qs = require('qs');
        const query = qs.stringify(body);
        fullRoute = `${fullRoute}?${query}`;
        body = undefined;
      }
      if(options.authorizationHeader){
        //add user token if it exists
        const userToken = await AsyncStorage.getItem('token');
        if(userToken){
          this.headers = {...this.headers,'Authorization': 'Bearer ' + userToken};
        }
      }

      let opts = {
        method,
        headers: this.headers
      };
      if (body) {
        if(body.constructor.name!='FormData' && !options.isUpload){
          Object.assign(opts, { body: JSON.stringify(body) });
        } else{
          Object.assign(opts, { body: body });
          opts.headers['Content-Type'] = 'multipart/form-data';
        }
      }

      // console.log('opts',opts);
      let fetchPromise = null
      if(options.retries > 1){
        fetchPromise = () => this._fetch_retry(fullRoute, opts,options.retries);
      } else{
        fetchPromise = () => fetch(fullRoute, opts);
      }


      
      const extractResponse = response => {

        if (response.status >= 200 && response.status < 300) {
            return response.text().then(
              text => {
                 console.log(text);
                return text? JSON.parse(text) : undefined
              }
            )
          }else {
            response.text().then(
              text => {
                 console.log(text);
              }
            )
            return Promise.reject(response)
          }

        };

      const manageError = async response => {

        if(response instanceof TypeError){
          throw new Error(response)
        }
        console.log('reject url', this.url)
        //console.log('reject',await response);
        
        try{
          if(typeof(response.text)!=='function'){
            return {
              success: false,
              error: response
            };
          }
          responseData = await response.text().then(
            (text) => {
              var ret = {
                success: false,
                error: response
              };
             // console.log(text);
              try{
                ret = text? JSON.parse(text) : undefined;
              } catch(e){
                return {
                  success: false,
                  response: response,
                  error: e
                };
              }
              return ret;
            }
          ).catch(e=>{
            return {
              success: false,
              response: response,
              error: e
            };
          });
          if(typeof(responseData.access_token_expired!='undefined') && responseData.access_token_expired){
            // call renew access token method
            this.accessTokenExpired();
          }

        } catch(e){
          return {
            success: false,
            response: response,
            error: e
          };
        }
      }
  
      if (this.devMode && this.simulatedDelay > 0) {
        // Simulate an n-second delay in every request
        return this._simulateDelay()
          .then(() => fetchPromise())
          .then(extractResponse)
          .catch(manageError);
      } else {
        return fetchPromise()
          .then(extractResponse)
          .catch(manageError);
      }
    }
  
    GET (route, query,options={}) { return this._fetch(route, 'GET', query, true, options); }
    POST (route, body, options={}) { return this._fetch(route, 'POST', body, false, options); }
    PUT (route, body,options={}) { return this._fetch(route, 'PUT', body,false,options); }
    DELETE (route, query,options={}) { return this._fetch(route, 'DELETE', query, true,options); }
  }