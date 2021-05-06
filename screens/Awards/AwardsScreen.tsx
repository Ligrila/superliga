import React from 'react';

import {Container } from 'native-base'
import Wallpaper from '../../components/Wallpaper/Wallpaper';
import AppHeader from '../../components/AppHeader/AppHeader';
import Awards from '../../components/Awards/Awards';
import BigTitle from '../../components/Title/BigTitle';

// Bg
const bgSrc = require('../../assets/images/home_bg.png');

const AwardsScreen = ()  => {
    
    return (
      <Container>
        <Wallpaper source={bgSrc}>
        <AppHeader  />
        <BigTitle text={'CANJE DE  \n PREMIOS'} />
        
          <Awards />
        
        </Wallpaper>
      </Container>
    );
}

export default AwardsScreen;