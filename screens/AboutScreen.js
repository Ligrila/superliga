import React from 'react';
import {Image} from 'react-native'
import {connectStyle,Container, Content, Text, Button } from 'native-base'
import Wallpaper from '../components/Wallpaper';
import AppHeader from '../components/AppHeader/AppHeader';

import bgSrc from '../assets/images/championship/bg.png';
import iconSrc from '../assets/images/icon.png';
import { Constants } from 'expo';
import Title from '../components/Title';

import {Updates} from 'expo'
import Loader from '../components/Loader';

class AboutScreen extends React.Component {
  state = {
    loading : false,
    updateAvailable: false,
  }
  constructor(){
    super();

  }
  async componentDidMount(){
    try {
      const update = await Expo.Updates.checkForUpdateAsync();
      this.setState({updateAvailable:update.isAvailable})
    } catch (e) {
      // handle or log error
      console.log(e)
      
    }
  }
  checkForUpdates = async () => {
    try {
      this.setState({loading:true})
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        // ... notify user of update ...
        Updates.reloadFromCache();
      }
      this.setState({loading:false})
    } catch (e) {
      // handle or log error
      console.log(e)
      this.setState({loading:false})
    }
  }
  render() {
    const styles = this.props.style;
    return (
      <Container>
        <Wallpaper source={bgSrc}>
        <AppHeader navigation={this.props.navigation} drawerOpen={() => {this.props.navigation.openDrawer()}} />
        <Content contentContainerStyle={styles.content} padder>
          <Loader loading={this.state.loading}></Loader>
          <Title text={"ACERCA DE \n JUGADA SUPERLIGA"} />
          <Image style={styles.icon} source={iconSrc}></Image>
          <Text>Version: {Constants.manifest.version}</Text>
          <Text>Fecha: {Constants.manifest.publishedTime}</Text>
          <Text>{this.state.updateAvailable ? 'Hay una versión nueva disponible':'Tienes la útlima versión'}</Text>
          <Text />
          <Button primary block onPress={this.checkForUpdates}>
            <Text style={styles.buttonText}>Buscar actualizaciones</Text>
          </Button>
        </Content>
        </Wallpaper>
      </Container>
    );
  }
}

export default connectStyle('SuperLiga.AboutScreen')(AboutScreen);