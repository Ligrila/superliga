import React, { useCallback } from 'react';
import { Container, Content, Text } from 'native-base'
import { View } from 'react-native'
import Wallpaper from '../../components/Wallpaper/Wallpaper';
import AppHeader from '../../components/AppHeader/AppHeader';


import styles from './GameHalfTimePlayScreen.styles'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
const bgSrc = require('../../assets/images/halfTimePlayBg.png');


const GameHalfTimePlayScreen = () => {
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
        <AppHeader logo={true} logoDisablePress={true} game={false} />
        <Content padder contentContainerStyle={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.textLine1}>JUGADA</Text>
            <Text style={styles.textLine2}>DE ENTRE</Text>
            <Text style={styles.textLine3}>TIEMPO</Text>
          </View>
        </Content>
      </Wallpaper>
    </Container>
  );


}
export default GameHalfTimePlayScreen;
