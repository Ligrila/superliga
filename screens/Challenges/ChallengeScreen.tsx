import React, { useEffect, useState } from 'react';
import { RefreshControl } from 'react-native'
import { Container, Content } from 'native-base'
import Wallpaper from '../../components/Wallpaper/Wallpaper';
import AppHeader from '../../components/AppHeader/AppHeader';


import Challenge from '../../components/Challenge/Challenge';
import { challengesAtom, challengesSelector } from '../../recoil/Challenge.recoil';
import { useRecoilCallback, useRecoilState } from 'recoil';



const bgSrc = require('../../assets/images/championship/bg2.png');

const ChallengeScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [, setChallenges] = useRecoilState(challengesAtom);
  const updateChallenges = useRecoilCallback(({ snapshot }) => async () => {
    const response = await snapshot.getPromise(challengesSelector);
    setChallenges({...response});
  }, []);
  const onRefresh = async () => {
    setRefreshing(true);
    await updateChallenges()
    setRefreshing(false);
  }

  useEffect(() => {
    onRefresh();
  }, [])

  return (
    <Container>
      <Wallpaper source={bgSrc}>
        <AppHeader logo={true} />
        <Content contentContainerStyle={{ flex: 1 }} padder
          refreshControl={
            <RefreshControl
              style={{ backgroundColor: '#transparent' }}
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#fff" // Ios
              colors={['#282828', '#fff']} //android
              title={''}
              progressBackgroundColor="#fff"
            />
          }
        >
           <Challenge /> 
        </Content>
      </Wallpaper>
    </Container>
  );

}

export default ChallengeScreen;