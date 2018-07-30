import React from 'react';
import { StyleSheet } from 'react-native';
import { connectStyle,Container, Content, Footer,Spinner } from 'native-base'

import Wallpaper from '../components/Wallpaper';
import AppHeader from '../components/AppHeader/AppHeader';

import bgSrc from '../assets/images/bg.png';

import GameConnectedUsers from '../components/Game/GameConnectedUsers';
import GameAnswerResult from '../components/Game/GameAnswerResult';



class GameResultScreen extends React.Component {
  constructor(props){
    super(props);
  }
  async componentDidMount() {

  }
  renderResult(){
    const { navigation } = this.props;
    const win = navigation.getParam('win', false);
    const serverSuccess = navigation.getParam('serverSuccess', false);
    return (<GameAnswerResult win={win} serverSuccess={serverSuccess} navigation={this.props.navigation} />);    
  
  }

  render() {
    const styles = this.props.style;
    return (
      <Container>
        <Wallpaper source={bgSrc}>
        <AppHeader drawerOpen={() => {this.props.navigation.openDrawer()}} game={true} />
        <Content padder contentContainerStyle={styles.game}>
          {this.renderResult()}
        </Content>
        <Footer>
          <GameConnectedUsers />
        </Footer>
        </Wallpaper>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  game:{
    flex:1,
  }
});


export default connectStyle('SuperLiga.Screen')(GameResultScreen);