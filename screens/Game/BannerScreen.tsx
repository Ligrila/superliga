import React, { useCallback } from 'react';
import { Container, Content } from 'native-base'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AdBanner from '../../components/AdBanner/AddBanner';


const BannerScreen = ({ route }) => {

  const navigation = useNavigation();
  const { payload } = route.params || { payload: { 'bannerType': 'admod' } };

  useFocusEffect(
    useCallback(() => {
      const timer = setTimeout(() => {
        navigation.navigate("GamePlay")
      },
        6000 // TODO: 7s alex 
      );
      return () => {
        clearTimeout(timer);
      };
    }, []))

  return (
    <Container>
      <Content padder={false} contentContainerStyle={{ flex: 1 }}>
        <AdBanner item={payload} />
      </Content>
    </Container>
  );

}
export default BannerScreen;
// export default connectStyle('SuperLiga.GameExtraPlayScreen')(BannerScreen);