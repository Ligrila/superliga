import React, { useCallback, useEffect } from 'react'
import { Image, View } from 'react-native'
import { AdMobBanner } from 'expo-ads-admob'
import Layout from '../../constants/Layout';
import Constants from 'expo-constants'



const getAdMobID = () => {
  const isAndroid = Layout.isAndroid
  if (Constants.appOwnership == 'expo') {
    return isAndroid ? "ca-app-pub-4248217184030056/8252070242" : "ca-app-pub-4248217184030056/9157957802"
  }

  return isAndroid ? "ca-app-pub-4248217184030056/5356467688" : "ca-app-pub-4248217184030056/8228019517"
}


const AdBanner = ({ item }) => {


  
  const bannerError = (e) => {
    console.log(e);
  }
  const renderImageBanner = () => {
    return (
      <Image resizeMode='cover' source={{ uri: item.bannerUri }}
        style={{ width: Layout.window.width, height: Layout.window.height }}>

      </Image>
    )
  }


  const renderBanner = () => {
    if (item.bannerType == 'admod') {
      return (
        <AdMobBanner
          bannerSize="smartBannerPortrait"
          adUnitID={getAdMobID()}
          onDidFailToReceiveAdWithError={bannerError} />
      )
    }
    if (item.bannerType == 'image') {
      return renderImageBanner()
    }
    return null;
  }
  return (

    <View style={{ flex: 1 }}>
      {renderBanner()}

    </View>
  )
}
export default AdBanner;