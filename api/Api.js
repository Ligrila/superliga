import RestClient from './RestClient';

import {
  AsyncStorage
} from 'react-native';

export default class Api extends RestClient {
  constructor () {
    // Initialize with your base URL
    super('http://192.168.0.138/superliga');
    //super('http://172.16.10.22/superliga');
  }
  async accessTokenExpired(){
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    
    var user = await this.token(refreshToken)
    if(user.success){
      console.log(user);
      console.log("saving new data");
      console.log("That expire at " + user.data.expire);
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
    // Returns a Promise with the response.
    return this.POST('/users/add', { first_name,last_name,email, password },{authorizationHeader:false});
  }
  token (refresh_token) {
    // Returns a Promise with the response.
    return this.POST('/users/token', { refresh_token },{authorizationHeader:false});
  }
  getTeams(){
    return this.GET('/teams/index',{authorizationHeader:false});
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
};