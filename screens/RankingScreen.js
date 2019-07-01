import React from 'react';
import {
  ActivityIndicator,
  View,
} from 'react-native';

import { connectStyle,Container,Content } from 'native-base';


import Wallpaper from '../components/Wallpaper';
import AppHeader from '../components/AppHeader/AppHeader';



import bgSrc from '../assets/images/bg.png';
import Ranking from '../components/Ranking';



class RankingScreen extends React.Component {

	constructor(props) {
    super(props);
	}
  async componentDidMount() {
  }

  render() {
    const styles = this.props.style;

    return (
          <Container style={styles.content}>
            <Wallpaper source={bgSrc}>
            <AppHeader navigation={this.props.navigation} drawerOpen={() => {this.props.navigation.openDrawer()}} />
            <Content style={styles.content}>
              <Ranking />
            </Content>

            </Wallpaper>
          </Container>
    );
  }


}

export default connectStyle('SuperLiga.RankingScreen')(RankingScreen);