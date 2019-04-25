import React from 'react';
import { TouchableHighlight, TouchableOpacity,Modal,View } from 'react-native';
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

import Game from '../components/Game';
import GameConnectedUsers from '../components/Game/GameConnectedUsers';

import Reflux from 'reflux';
import { NextTriviaStore,NextTriviaActions } from '../store/NextTriviaStore';
import { UsersStore, UsersActions } from '../store/UserStore';
import Purchase from '../components/Purchase';
import { PurchaseModalStore } from '../store/PurchaseModalStore';
import { TriviaQuestionActions,TriviaQuestion } from '../store/TriviaQuestion';
import MakeItRain from '../components/MakeItRain';

class GameScreen extends Reflux.Component {
  api = new Api;
  static modalVisible = false;
  state = {
    modalVisible : false,
    genericQuestion: false
  }
  constructor(props){
    super(props);
    /*this.state = {
      isLoadingComplete: false
    }*/
    this.stores = [TriviaQuestion,NextTriviaStore,UsersStore,PurchaseModalStore]; // TODO: use Trivia Store
    this._bootstrap();

  }

  _bootstrap(){

  }


  async componentDidMount() {
    if(!this.state.hasData){
      NextTriviaActions.current();
    }
    if(!this.state.hasInformation){
      UsersActions.update();
    }
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

   


    NextTriviaActions.finish.listen((trivia)=>{
      const currentTriviaId = trivia.id;
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'GameEnd' , params: {currentTriviaId,trivia}})],
      });
      this.props.navigation.dispatch(resetAction);

   });

    NextTriviaActions.halfTime.listen((b)=>{
      this.props.navigation.navigate('HalfTime')
    })
    NextTriviaActions.halfTimeStarted.listen((b)=>{
      this.props.navigation.navigate('HalfTimeStart')
    })

    NextTriviaActions.halfTimePlay.listen(()=>{
      this.props.navigation.navigate('GameHalfTimePlay')
    })
    NextTriviaActions.showBannerStarted.listen((payload)=>{
      this.props.navigation.navigate('Banner',{payload})
    })
    NextTriviaActions.extraPlay.listen(()=>{
      this.props.navigation.navigate('GameExtraPlay')
    })

    NextTriviaActions.halfTimeStarted.listen((b)=>{
      this.props.navigation.navigate('HalfTimeStart')
    })
    UsersActions.me.listen(()=>{
      if(this.state.user.lives <= 0 ){
      }
    });
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
    if(this.state.hasInformation){
      const hasLives =  this.state.user.lives >= 1;
      if(hasLives){
        return (<GameConnectedUsers />);
      } else{
        const styles = this.props.style;
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
    const styles = this.props.style;
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
        <AppHeader drawerOpen={() => {this.props.navigation.openDrawer()}} game={true} />
        <Content padder contentContainerStyle={styles.game}>
          {this.renderModal()}
          {this.renderGame()}
        </Content>
        <Footer style={styles.footer} transparent>
          {this.renderFooter()}
        </Footer>
        </Wallpaper>
      </Container>
    );
  }
}




export default connectStyle('SuperLiga.GameScreen')(GameScreen);