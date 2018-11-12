import React from 'react';
import { TouchableHighlight, TouchableOpacity,Modal,View } from 'react-native';
import { connectStyle,Container, Content, Footer,Text,Spinner } from 'native-base'
import { StackActions,NavigationActions } from 'react-navigation';


import Wallpaper from '../components/Wallpaper';
import AppHeader from '../components/AppHeader/AppHeader';

import gameBgSrc from '../assets/images/game/bg.png';
import gameDisabledBgSrc from '../assets/images/result/wrong_bg.png';
import Api from '../api/Api';

import Game from '../components/Game';
import GameConnectedUsers from '../components/Game/GameConnectedUsers';

import Reflux from 'reflux';
import { NextTriviaStore,NextTriviaActions } from '../store/NextTriviaStore';
import { UsersStore, UsersActions } from '../store/UserStore';
import Purchase from '../components/Purchase';
import { PurchaseModalStore } from '../store/PurchaseModalStore';

class GameScreen extends Reflux.Component {
  api = new Api;
  static modalVisible = false;
  state = {
    modalVisible : false
  }
  constructor(props){
    super(props);
    /*this.state = {
      isLoadingComplete: false
    }*/
    this.stores = [NextTriviaStore,UsersStore,PurchaseModalStore]; // TODO: use Trivia Store
  }

  async componentDidMount() {
    if(!this.state.hasData){
      NextTriviaActions.current();
    }
    if(!this.state.hasInformation){
      UsersActions.update();
    }

    //NextTriviaActions.finish.listen(()=>{
 

      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'GameEnd' })],
      });
      this.props.navigation.dispatch(resetAction);

    //});
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
      return (
        <Game currentTrivia={this.state.CurrentTrivia.Trivia} navigation={this.props.navigation} onNoLife={()=>this.setModalVisible(true)} setModalVisibleProp={this.setModalVisibleProp}>
        </Game>
      );
    } else{
      return(<Spinner />);
    }
  }
  render() {
    const styles = this.props.style;
    let bgSrc = gameBgSrc;
    if(this.state.hasInformation){
      bgSrc =  this.state.user.lives <= 0 ? gameDisabledBgSrc : gameBgSrc
    }

    return (
      <Container>
        <Wallpaper source={bgSrc}>
        <AppHeader drawerOpen={() => {this.props.navigation.openDrawer()}} game={true} />
        <Content padder contentContainerStyle={styles.game}>
          {this.renderModal()}
          {this.renderGame()}
        </Content>
        <Footer style={styles.footer}>
          {this.renderFooter()}
        </Footer>
        </Wallpaper>
      </Container>
    );
  }
}




export default connectStyle('SuperLiga.GameScreen')(GameScreen);