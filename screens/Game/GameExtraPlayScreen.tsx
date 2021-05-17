import React, { useCallback } from 'react';
import { View } from 'react-native'
import { Text, Container, Content } from 'native-base'

import Wallpaper from '../../components/Wallpaper/Wallpaper';
import AppHeader from '../../components/AppHeader/AppHeader';


import { useFocusEffect, useNavigation } from '@react-navigation/native';

import styles from './GameExtraPlayScreen.styles'
const bgSrc = require('../../assets/images/halfTimePlayBg.png');


const GameExtraPlayScreen = () => {

  const navigation = useNavigation();
  useFocusEffect(
    useCallback(() => {
      const timer = setTimeout(() => {
        navigation.navigate("GamePlay")
      },
        6000
      );
      return () => {
        clearTimeout(timer);
      };
    }, []))
  return (
    <Container>
      <Wallpaper source={bgSrc}>
        <AppHeader game={false} logo={true} logoDisablePress={true} />
        <Content padder contentContainerStyle={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.textLine1}>JUGADA</Text>
            <Text style={styles.textLine2}>EXTRA</Text>
            <Text style={styles.textLine3}>BONUS TRACK</Text>
          </View>
        </Content>
      </Wallpaper>
    </Container>
  );


}

export default GameExtraPlayScreen;