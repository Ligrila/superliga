import React from 'react';
import { Container } from 'native-base'
import Wallpaper from '../../components/Wallpaper/Wallpaper';
import AppHeader from '../../components/AppHeader/AppHeader';
import AllChampionshipList from '../../components/Championship/AllChampionshipList';


// Styles
const bgSrc = require('../../assets/images/championship/bg2.png');


const AllChampionshipScreen = () => {
  return (
    <Container>
      <Wallpaper source={bgSrc}>
        <AppHeader logo={true} />
        <AllChampionshipList />
      </Wallpaper>
    </Container>
  );
}

export default AllChampionshipScreen;