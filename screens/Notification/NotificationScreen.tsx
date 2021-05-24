import React, { useEffect, useState } from 'react';

import { Container, Content } from 'native-base'
import { RefreshControl } from 'react-native'

import Wallpaper from '../../components/Wallpaper/Wallpaper';
import AppHeader from '../../components/AppHeader/AppHeader';


import Notification from '../../components/Notification/Notifications';
import { useRecoilCallback, useRecoilState } from 'recoil';
import { notificationsAtom, notificationsSelector } from '../../recoil/Notifications.recoil';
import { authUserAtom, authUserSelector } from '../../recoil/Auth.recoil';
// import { NotificationsActions } from '../store/NotificationsStore';

const bgSrc = require('../../assets/images/championship/bg2.png');

const NotificationScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [, setNotifications] = useRecoilState(notificationsAtom);
  const [, setAuhtUser] = useRecoilState(authUserAtom);
  const updateNotifictions = useRecoilCallback(({ snapshot }) => async () => {
    // Notifications
    const response = await snapshot.getPromise(notificationsSelector);
    setNotifications(Object.assign({}, response));
    // Update User Data
    const authUserResponse = await snapshot.getPromise(authUserSelector)
    setAuhtUser({ ...authUserResponse })
  }, []);
  const onRefresh = async () => {
    setRefreshing(true);
    await updateNotifictions()
    setRefreshing(false);
  }

  useEffect(() => {
    onRefresh();
  }, [])

  return (
    <Container>
      <Wallpaper source={bgSrc}>
        <AppHeader logo={true} />
        <Content
          contentContainerStyle={{ flex: 1 }}
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
          }>
          <Notification />
        </Content>
      </Wallpaper>
    </Container>
  );

}

export default NotificationScreen;
 // connectStyle('SuperLiga.NotificationScreen')(NotificationScreen);