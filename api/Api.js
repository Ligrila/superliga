import RestClient from './RestClient';

import Enviroment from '../constants/Enviroment';

import {
  AsyncStorage
} from 'react-native';

export default class Api extends RestClient {
  constructor () {
    // Initialize with your base URL
    super(Enviroment.apiUrl);
    //super('http://172.16.10.22/superliga');
  }
  async accessTokenExpired(){
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    
    var user = await this.token(refreshToken)
    if(user.success){
      await AsyncStorage.setItem('tokenExpire', `${user.data.expire}`);
      await AsyncStorage.setItem('token', user.data.access_token);
      await AsyncStorage.setItem('refreshToken', user.data.refresh_token);
    } else{
      await AsyncStorage.removeItem('tokenExpire');
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('refreshToken');
    }
  }
  // Now you can write your own methods easily
  login (email, password) {
    // Returns a Promise with the response.
    return this.POST('/users/login', { email, password },{authorizationHeader:false});
  }
  register (first_name,last_name,email, password) {
    const sha1 = require('js-sha1');
    // Returns a Promise with the response.
    const hash = sha1( 'wt1U5MACWJFTXGenFoZoiLwQGrLgdbHA' + email.toUpperCase() + 'wt1U5MACWJFTXGenFoZoiLwQGrLgdbHA');
    return this.POST('/users/add', { first_name,last_name,email, password, hash },{authorizationHeader:false});
  }
  token (refresh_token) {
    // Returns a Promise with the response.
    return this.POST('/users/token', { refresh_token },{authorizationHeader:false});
  }
  getTeams(){
    return this.GET('/teams/index',{authorizationHeader:false});
  }
  googleLogin (access_token) {
    // Returns a Promise with the response.
    return this.POST('/users/google-login', { access_token });
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
  
  getUserInformation(){
    return this.GET('/users/me');
  }

  getTrivias(){
    return this.GET('/trivias/index');
  }
  getNextTrivia(){
    return this.GET('/trivias/next');
  }
  getCurrentTrivia(){
    return this.GET('/trivias/current');
  }

  sendAnswer(question_id,option){
    return this.POST('/answers/add',{
      question_id: question_id,
      selected_option: "option_" + option
    });
  }

  changeAvatar(uri){
    
    let formData = new FormData();
    let uriParts = uri.split('.');
    let fileType = uriParts[uriParts.length - 1];
    const photorand = Math.floor(Math.random()* 1000000);

    formData.append('picture', {
      uri,
      name: `photo_${photorand}.${fileType}`,
      type: `image/${fileType}`,
    });

    return this.POST('/users/edit',formData);
  }
};