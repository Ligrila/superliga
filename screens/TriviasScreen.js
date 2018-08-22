
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
import TriviaCarousel from '../components/Trivia/TriviaCarousel';


class TriviasScreen extends Reflux.Component {

	constructor(props) {
    super(props);
		this.store = NextTriviaStore;
	}
  async componentDidMount() {
    await NextTriviaActions.get();
  }


  renderTrivias(){
    if(!this.state.NextTrivia.hasData) return null;
    return (
        <TriviaCarousel></TriviaCarousel>
    );
  }
  render() {
    const styles = this.props.style;
    if (!this.state.NextTrivia.hasData) {
      return <View><ActivityIndicator></ActivityIndicator></View>;
    }
    return (
          <Container style={styles.content}>
            <Wallpaper source={bgSrc}>
            <AppHeader drawerOpen={() => {this.props.navigation.openDrawer()}} />
            <Content style={styles.content}>
                 {this.renderTrivias()}
            </Content>

            </Wallpaper>
          </Container>
    );
  }


}

export default connectStyle('SuperLiga.HomeScreen')(TriviasScreen);