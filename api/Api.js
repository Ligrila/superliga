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
  register (first_name,last_name,email, password,referral_username,document,mobile_number) {
    const sha1 = require('js-sha1');
    // Returns a Promise with the response.
    const hash = sha1( 'wt1U5MACWJFTXGenFoZoiLwQGrLgdbHA' + email.toUpperCase() + 'wt1U5MACWJFTXGenFoZoiLwQGrLgdbHA');
    return this.POST('/users/add', { first_name,last_name,email, password, referral_username, hash,document,mobile_number },{authorizationHeader:false});
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

    return this.POST('/users/edit',formData,{isUpload:true});
  }
  editUser(user){
    return this.POST('/users/edit',user);
  }

  // premios

  getAwards(){
    return this.GET('/awards/index');
  }

  changePoints(award_id){
    return this.POST('/awards/change-points',{award_id});
  }

  //calendario
  // Dates -> Trivia

  calendar(){
    return this.GET('/dates/calendar');
  }

  viewCalendar(id){
    return this.GET(`/dates/view/${id}`);
  }

  getLivePacks(){
    return this.GET('/live-packs/index');
  }

  purchase(item){
    return this.GET('/payments/buy/'+item.id);
  }

  pushNotificationsRegister(token){
    return this.POST('/push-notifications/add',{
      token
    });
  }

  getStatistics(){
    return this.GET('/users/statistics');
  }
  getTriviaStatistics(trivia_id){
    return this.GET('/users/trivia_statistics/'+trivia_id);
  }

  championshipList(){
    return this.GET('/championships/index');
  }
  
  allChampionshipList(q,notMy=false){
    let search = ignoreMy = '';
    let startQ = '?'
    if(q){
      search = startQ + 'q='+q;
      startQ='&';
    }
    if(notMy){
      ignoreMy = startQ+'not_my';
      startQ='&';
    }

    return this.GET('/championships/all');


//    return this.GET('/championships/all'+search+ignoreMy);
  }

  championshipRanking(id,type){
    return this.GET('/championships/ranking/'+id+'?type='+type);
  }


  createChampionship(name,picture=null){
    
      if(picture){
        let formData = new FormData();
        let uriParts = picture.split('.');
        let fileType = uriParts[uriParts.length - 1];
        const photorand = Math.floor(Math.random()* 1000000);
        formData.append('name',name)
        formData.append('picture', {
          uri: picture,
          name: `photo_${photorand}.${fileType}`,
          type: `image/${fileType}`,
        });
    
        return this.POST('/championships/add',formData,{isUpload:true});
      }
    
    return this.POST('/championships/add',{
      name
    });
  }
  editChampionship(id,name,picture=null){
      if(picture){
        let formData = new FormData();
        let uriParts = picture.split('.');
        let fileType = uriParts[uriParts.length - 1];
        const photorand = Math.floor(Math.random()* 1000000);
        formData.append('name',name)
        formData.append('picture', {
          uri: picture,
          name: `photo_${photorand}.${fileType}`,
          type: `image/${fileType}`,
        });
    
        return this.POST('/championships/edit/'+id,formData,{isUpload:true});
      }
    return this.POST('/championships/edit/'+id,{
      name
    });
  }
  subscribeChampionship(id){
    return this.POST('/championships/subscribe/'+id,{
    });
  }
  challengesList(){
    return this.GET('/challenges/index');
  }

  notificationsList(){
    return this.GET('/notifications/index');
  }

  createChallenge(championship_id,challenge_championship_id){
    return this.POST('/challenges/add-request',{
      championship_id,
      challenge_championship_id
    });
  }

  challengeResponse(id,accepted){
    return this.POST('/challenges/response-request',{
      id,
      accepted
    });

  }

  challengeRanking(id,type){
    return this.GET('/challenges/ranking/'+id+'?type='+type);
  }

  championshipUsers(id){
    return this.GET('/championship-users/index/'+id);
  }
  toggleChampionshipUser(user_id,championship_id,value){
    const action = value ? 'enable' : 'disable'
    return this.GET('/championship-users/'+action+'/'+user_id+'/'+championship_id);
  }

  contactTopics(){
    return this.GET('/contacts/topics/');
  }
  contact(contact_topic_id,body){
    return this.POST('/contacts/add',{
      contact_topic_id,
      body
    });
  }

  homeBanners(){
    return this.GET('/trivias/index-banners');
  }
};