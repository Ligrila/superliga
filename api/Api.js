import RestClient from './RestClient';

export default class Api extends RestClient {
  constructor () {
    // Initialize with your base URL
    super('https://api.myawesomeservice.com');
  }
  // Now you can write your own methods easily
  login (username, password) {
    // Returns a Promise with the response.
    return this.POST('/login', { username, password });
  }
  getCurrentUser () {
    // If the request is successful, you can return the expected object
    // instead of the whole response.
    return this.GET('/auth')
      .then(response => response.user);
  }
};