import RestClient from './RestClient';

export default class Api extends RestClient {
  constructor () {
    // Initialize with your base URL
    super('http://192.168.0.138/superliga');
  }
  // Now you can write your own methods easily
  login (username, password) {
    // Returns a Promise with the response.
    return this.POST('/users/login', { username, password });
  }
  token (token) {
    // Returns a Promise with the response.
    return this.POST('/users/token', { token });
  }
  facebookLogin (access_token) {
    // Returns a Promise with the response.
    return this.POST('/users/facebook-login', { access_token });
  }
  getCurrentUser () {
    // If the request is successful, you can return the expected object
    // instead of the whole response.
    return this.GET('/auth')
      .then(response => response.user);
  }
  getTrivias(){
    return this.GET('/trivias/index');

  }
};