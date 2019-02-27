import React from 'react';
import {View} from 'react-native'
import {connectStyle,Container, Content ,  Button , Text } from 'native-base'
import Wallpaper from '../components/Wallpaper';
import AppHeader from '../components/AppHeader/AppHeader';

import bgSrc from '../assets/images/championship/bg.png';
import Loader from '../components/Loader';
import Title from '../components/Title';
import Api from '../api/Api';
import Notice from '../components/Notice';




class ChampionshipSubscribeScreen extends React.Component {
  championship = {
    id: null
  }
  state = {
    loading: true,
    response: null
  }
  constructor(props){
    super(props);
    this.championship = this.props.navigation.getParam('championship', this.championship);
    this.api = new Api;

  }
  async componentDidMount(){
    const response = await this.api.subscribeChampionship(this.championship.id)
    console.log({response})
    this.setState({loading:false,response:response})

  }
  viewChampionship = (championship) => {
    this.props.navigation.navigate('ChampionshipView',{championship})
  }
  renderMessage(){
    if(this.state.loading){
      return null;
    }
    const styles = this.props.style;

    let message = `Ya te has inscripto al torneo o la solicitud es inválida`;
    let button = null
    if(this.state.response && this.state.response.success){
      const name = this.state.response.data.name
      message = `¡Felicitaciones! Ya estás participando del torneo de amigos "${name}"`;
      button = (<Button block
      onPress={()=>this.viewChampionship(this.state.response.data)}
      primary><Text style={styles.buttonText}>Ver torneo</Text></Button>)
    }
    
    return(
      <View style={styles.messageView}>
          <Notice text={message} />
          <Text />
          {button}
    </View>
    )
  }
  render() {
    const styles = this.props.style;
    return (
      <Container>
        <Wallpaper source={bgSrc}>
        <AppHeader drawerOpen={() => {this.props.navigation.openDrawer()}} />
        <Content contentContainerStyle={styles.game} padder>
          <Loader loading={this.state.loading} />
          <Title text={'INSCRIPCIÓN TORNEO \n SUPERLIGA'}></Title>
            {this.renderMessage()}
        </Content>
        </Wallpaper>
      </Container>
    );
  }
}

export default connectStyle('SuperLiga.ChampionshipSubscribeScreen')(ChampionshipSubscribeScreen);