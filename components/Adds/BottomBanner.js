import React, { Component } from 'react'
import { Text, View,Alert } from 'react-native'
import Layout from '../../constants/Layout';

import { AdMobBanner } from 'expo-ads-admob'
import Constants from 'expo-constants'

const IOS_EXPO_ID='ca-app-pub-4248217184030056/2469387806'
const ANDROID_EXPO_ID='ca-app-pub-4248217184030056/5871933425'
const ANDROID_ID='ca-app-pub-4248217184030056/2622598332'
const IOS_ID='ca-app-pub-4248217184030056/9160086527'

export default class BottomBanner extends Component {
  bannerError(error){
    console.log({error},"banner Error")
    //Alert.alert("banner",error)


  }
  getId(){

    const isAndroid = Layout.isAndroid
    if(Constants.appOwnership=='expo'){
        return isAndroid ? ANDROID_EXPO_ID: IOS_EXPO_ID
    }

    return isAndroid ? ANDROID_ID: IOS_ID
  }
  render() {
    return (
      <View style={{
        paddingTop:10,
        alignItems:'center'
      }}>
          <AdMobBanner
            bannerSize="largeBanner"
            adUnitID={this.getId()}
            testDeviceID="EMULATOR"
            onDidFailToReceiveAdWithError={this.bannerError} />
        </View>
    )
  }
}