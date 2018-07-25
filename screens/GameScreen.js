import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Container, Content, Text, Button } from 'native-base'

import Wallpaper from '../components/Wallpaper';
import AppHeader from '../components/AppHeader/AppHeader';

import getTheme from '../native-base-theme/components';

import bgSrc from '../assets/images/bg.png';

export default class GameScreen extends React.Component {
  render() {
    return (
      <Container>
        <Wallpaper source={bgSrc}>
        <AppHeader drawerOpen={() => {this.props.navigation.openDrawer()}} game={true} />
        <Content padder>
             <Text>test</Text>
             <Button block>
              <Text>Click Me!</Text>
            </Button>
   
        </Content>
        </Wallpaper>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
