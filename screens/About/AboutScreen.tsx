import React, { useCallback, useState } from 'react';
import { Image } from 'react-native'
import { Container, Content, Text, Button } from 'native-base'
import Wallpaper from '../../components/Wallpaper/Wallpaper';
import AppHeader from '../../components/AppHeader/AppHeader';


import Constants from 'expo-constants'
import Title from '../../components/Title/Title';

// Updates
import * as Updates from "expo-updates";
import Loader from '../../components/Loader/Loader';

// Styles
import styles from './AboutScreen.styles'
import { useFocusEffect } from '@react-navigation/native';
const bgSrc = require('../../assets/images/championship/bg.png');
const iconSrc = require('../../assets/images/app_logo.png');

const AboutScreen = () => {
  // state = {
  //   loading: false,
  //   updateAvailable: false,
  // }
  // constructor() {
  //   super();

  // }
  const [updateAvailable, setupdateAvailable] = useState(false);
  const [loading, setLoading] = useState(false);
  const fetchUpdates = useCallback(async () => {
    try {
      const update = await Updates.checkForUpdateAsync();
      setupdateAvailable(update.isAvailable);
    } catch (e) {
      // handle or log error
      console.log(e)
    }
  }, [])
  const checkForUpdates = useCallback(async () => {
    try {
      setLoading(true);
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        // ... notify user of update ...
        // Updates.reloadFromCache();
      }
      setLoading(false);
    } catch (e) {
      // handle or log error
      console.log(e)
      setLoading(false);
    }
  }, [])

  useFocusEffect(
    useCallback(() => {
      fetchUpdates()
    }, [])
  )

  return (
    <Container>
      <Wallpaper source={bgSrc}>
        <AppHeader logo={false} />
        <Content contentContainerStyle={styles.content} padder>
          <Loader loading={loading}></Loader>
          <Title text={"ACERCA DE \n JUGADA SUPERLIGA"} />
          <Image 
              resizeMode="contain"
              style={styles.icon} source={iconSrc}></Image>
          <Text style={styles.text}>Version: {Constants.manifest.version}</Text>
          <Text style={styles.text}>Fecha: {Constants.manifest.publishedTime}</Text>
          <Text style={styles.text}>{updateAvailable ? 'Hay una versión nueva disponible' : 'Tienes la útlima versión'}</Text>
          <Text />
          <Button primary block onPress={checkForUpdates}>
            <Text style={styles.buttonText}>Buscar actualizaciones</Text>
          </Button>
        </Content>
      </Wallpaper>
    </Container >
  );

}

export default AboutScreen;