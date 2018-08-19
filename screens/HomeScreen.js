import React from 'react';
import Reflux from 'reflux';
import {
  Image,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from 'react-native';

import { connectStyle,Text,Container,Content, Footer } from 'native-base';


import Wallpaper from '../components/Wallpaper';
import AppHeader from '../components/AppHeader/AppHeader';



import {NextTriviaStore,NextTriviaActions} from '../store/NextTriviaStore';



import bgSrc from '../assets/images/bg.png';
import NextTrivia from '../components/NextTrivia';


class HomeScreen extends Reflux.Component {

	constructor(props) {
    super(props);
		this.store = NextTriviaStore;
	}
  async componentDidMount() {
    await NextTriviaActions.get();
  }


  renderNextTrivia(){
    if(!this.state.NextTrivia.hasData) return null;
    return (
      <NextTrivia trivia={this.state.NextTrivia.Trivia}/>
    );
  }
  render() {
    const styles = this.props.style;
    if (!this.state.NextTrivia.hasData) {
      return <View><ActivityIndicator></ActivityIndicator></View>;
    }
    return (
          <Container>
            <Wallpaper source={bgSrc}>
            <AppHeader drawerOpen={() => {this.props.navigation.openDrawer()}} />
            <Content>
                 {this.renderNextTrivia()}
            </Content>
            <Footer style={styles.footer}>
                <TouchableOpacity style={styles.nextMatchLink}>
                    <Text style={styles.nextMatchText}>ver siguientes partidos</Text>
                    <Image style={styles.nextMatchImage} source={require('../assets/images/nextArrow.png')}></Image>
                </TouchableOpacity>
            </Footer>
            </Wallpaper>
          </Container>
    );
  }


}

export default connectStyle('SuperLiga.HomeScreen')(HomeScreen);