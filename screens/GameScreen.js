import React from 'react';
import { KeyboardAvoidingView, TouchableOpacity,Modal,View,Keyboard, StyleSheet } from 'react-native';
import { connectStyle,Container, Content, Footer,Text,Spinner } from 'native-base'
import { StackActions,NavigationActions } from 'react-navigation';


import Wallpaper from '../components/Wallpaper';
import AppHeader from '../components/AppHeader/AppHeader';

import gameBgSrc from '../assets/images/game/bg.png';
import gameDisabledBgSrc from '../assets/images/result/wrong_bg.png';
const bgProgrammedTriviaSrc = require('../assets/images/programmed-trivia-bg.png');

// usado para entre tiempo
// y final
import genericQuestionBg from '../assets/images/game/genericQuestionBg.png';

import Api from '../api/Api';

import Game from '../components/Game/Game';
import GameConnectedUsers from '../components/Game/GameConnectedUsers';

import Reflux from 'reflux';
import { NextTriviaStore,NextTriviaActions } from '../store/NextTriviaStore';
import { UsersStore, UsersActions } from '../store/UserStore';
import Purchase from '../components/Purchase';
import { PurchaseModalStore } from '../store/PurchaseModalStore';
import { TriviaQuestion } from '../store/TriviaQuestion';
import MakeItRain from '../components/MakeItRain';




import {
  AdMobInterstitial,
  Constants
} from 'expo';

import Layout from '../constants/Layout';
import Chat from '../components/Chat/Chat';



const styles = StyleSheet.create({
  game:{
      flex:.7,

  },
  footer:{
    borderTopWidth:0,
    elevation:0
  },
  connectedUsers:{
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'center',
      paddingBottom: Layout.s(20),

  },
  noLifeText:{
      fontFamily: 'OpenSansCondensed_bold',
      color: '#2cd6f5',
      fontSize: Layout.s(35),
  }
  
});




getAdMobInterstitialID = ()=>{
  const isAndroid = Layout.isAndroid
  if(Constants.appOwnership=='expo'){
      return isAndroid ? "ca-app-pub-4248217184030056/6826064667": "ca-app-pub-4248217184030056/4404927217"
  }

  return isAndroid ? "ca-app-pub-4248217184030056/9594987792": "ca-app-pub-4248217184030056/1391751063"

}


class GameScreen extends Reflux.Component {
  api = new Api;
  static modalVisible = false;
  listenActions = []
  state = {
    modalVisible : false,
    genericQuestion: false,
    keyboardVisible:false
  }
  constructor(props){
    super(props);
    /*this.state = {
      isLoadingComplete: false
    }*/
    this.stores = [
      TriviaQuestion,
      NextTriviaStore,
      UsersStore,
      PurchaseModalStore
    ]; // TODO: use Trivia Store
    this._bootstrap();

  }

  _bootstrap(){
    this.props.navigation.setParams({ drawerLockMode: "locked-closed" });
  }

  async renderInterstitial(){
    AdMobInterstitial.setAdUnitID(getAdMobInterstitialID());
    AdMobInterstitial.setTestDeviceID('EMULATOR');
    await AdMobInterstitial.requestAdAsync();
    await AdMobInterstitial.showAdAsync();
  }


  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
    this.listenActions.forEach(listenable => {
      if(typeof listenable == 'function'){
        listenable()
      }
    });

    this.listenActions = []
    super.componentWillUnmount();


  }

  _keyboardDidShow = ()=> {
    const keyboardVisible = true
    this.setState({keyboardVisible})
  }

  _keyboardDidHide = ()=> {
    const keyboardVisible = false
    this.setState({keyboardVisible})
  }


  async componentDidMount() {
    if(!this.state.hasData){
      NextTriviaActions.current();
    }
    if(!this.state.hasInformation){
      UsersActions.update();
    }
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardWillShow',
      this._keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardWillHide',
      this._keyboardDidHide,
    );
    /*TriviaQuestionActions.onNewQuestion.listen((q)=>{
      if(q.model=='GenericQuestions'){
        this.setState({genericQuestion:true});
      } else{
        this.setState({genericQuestion:false});
      }
    })
    TriviaQuestionActions.onFinishQuestion((q)=>{
      this.setState({genericQuestion:false});
    });*/

   


    this.listenActions.push(NextTriviaActions.finish.listen((trivia)=>{
      const currentTriviaId = trivia.id;
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'GameEnd' , params: {currentTriviaId,trivia}})],
      });
      this.props.navigation.dispatch(resetAction);

   }));

   this.listenActions.push(NextTriviaActions.halfTime.listen((b)=>{
      this.props.navigation.navigate('HalfTime')
    }))
    
    this.listenActions.push(NextTriviaActions.halfTimeStarted.listen((b)=>{
      this.props.navigation.navigate('HalfTimeStart')
    }))

    this.listenActions.push(NextTriviaActions.halfTimePlay.listen(()=>{
      this.props.navigation.navigate('GameHalfTimePlay')
    }))

    this.listenActions.push(NextTriviaActions.showBannerStarted.listen((payload)=>{

      if(payload.bannerType=='admob'){
        this.renderInterstitial()
      } else{
        this.props.navigation.navigate('Banner',{payload})
      }
    }))
    
    this.listenActions.push(NextTriviaActions.extraPlay.listen(()=>{
      this.props.navigation.navigate('GameExtraPlay')
    }))

    this.listenActions.push(NextTriviaActions.halfTimeStarted.listen((b)=>{
      this.props.navigation.navigate('HalfTimeStart')
    }))

    this.listenActions.push(UsersActions.me.listen(()=>{
      if(this.state.user.lives <= 0 ){
      }
    }));
    if(this.state.PurchaseModal.visible){
      this.setModalVisible(true);
    }
  }
  

  setModalVisible = (visible) =>{
    this.setState({modalVisible: visible});
  }
  renderModal(){
    return (
      <Modal
      animationType="slide"
      transparent={true}
      visible={this.state.modalVisible}
      onRequestClose={() => {
        this.setModalVisible(false);
      }}>
        <Purchase navigation={this.props.navigation} onHidePress={()=>this.setModalVisible(false)}/>
    </Modal>
    )
  }
  renderFooter(){
    if(this.state.keyboardVisible){
      return null
    }
    if(this.state.hasInformation){
      const hasLives =  this.state.user.lives >= 1;
      if(hasLives){
        return (<GameConnectedUsers />);
      } else{
        return(
          <TouchableOpacity
          onPress={() => {
            this.setModalVisible(true);
          }}>
            <Text style={styles.noLifeText}>
              Si queres seguir jugando hace click aca
            </Text>
          </TouchableOpacity>
        )
      }

    }
    return (<GameConnectedUsers />);
  }
  renderGame(){
    if(this.state.CurrentTrivia.hasData){
      //const currentTriviaId = this.state.CurrentTrivia.Trivia.id;
      //this.props.navigation.navigate({ routeName: 'GameEnd' , params: {currentTriviaId}})
      return (
        <Game currentTrivia={this.state.CurrentTrivia.Trivia} navigation={this.props.navigation} onNoLife={()=>this.setModalVisible(true)} setModalVisibleProp={this.setModalVisibleProp}>
        </Game>
      );
    } else{
      return(<Spinner />);
    }
  }
  makeItRain = () => {
    if(this.state.hasResult && this.state.win){
      return <MakeItRain />;
    }
  }
  render() {
    let bgSrc = gameBgSrc;
    if(this.state.hasInformation){
      bgSrc =  this.state.user.lives <= 0 ? gameDisabledBgSrc : gameBgSrc
    }
    if(this.state.CurrentTrivia.Trivia.half_time_finished && !this.state.CurrentTrivia.Trivia.half_time_started){
      bgSrc = genericQuestionBg;
    }
    if(this.state.CurrentTrivia.Trivia.type=='trivia'){
      bgSrc = bgProgrammedTriviaSrc;
    }
    if(this.state.CurrentTrivia.Trivia.game_finished){
      bgSrc = genericQuestionBg;
    }


    return (
      <Container>
        <Wallpaper source={bgSrc}>
        {this.makeItRain()}
        <AppHeader hideChat={true} navigation={this.props.navigation} drawerOpen={() => {this.props.navigation.openDrawer()}} game={true} />
        <Content padder contentContainerStyle={styles.game}>
          {this.renderModal()}
          {this.renderGame()}
        </Content>
        <KeyboardAvoidingView behavior='position' enabled>        
          <Footer style={styles.footer} transparent>
            <Chat></Chat>
            <View style={styles.connectedUsers}>
            {this.renderFooter()}
            </View>
          </Footer>
        </KeyboardAvoidingView>
        </Wallpaper>
      </Container>
    );
  }
}




//export default connectStyle('SuperLiga.GameScreen')(GameScreen);
export default GameScreen;