import React from 'react';
import { Container, Content, Button, Icon } from 'native-base'
import Wallpaper from '../../components/Wallpaper/Wallpaper';
import AppHeader from '../../components/AppHeader/AppHeader';
import CreateChampionship from '../../components/Championship/CreateChampionship';
import { useNavigation } from '@react-navigation/native';
// Styles
import styles from './ChampionshipScreen.styles';
const bgSrc = require('../../assets/images/championship/bg_champion.png');


const ChampionshipEditScreen = ({ route }) => {
  // Params
  const { championship } = route.params || { championship: null };
  // Navigation
  const navigation = useNavigation();
  // Back
  const returnButton = (<Button transparent onPress={() => {
    navigation.navigate("ChampionshipHome")
  }}><Icon name='ios-arrow-back' /></Button>)
  // Render
  return (
    <Container>
      <Wallpaper source={bgSrc}>
        <AppHeader return={returnButton} />
        <Content contentContainerStyle={styles.content} padder>
          <CreateChampionship championship={championship}/>
        </Content>
      </Wallpaper>
    </Container>
  );
}


export default ChampionshipEditScreen;