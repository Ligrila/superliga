import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Layout from '../../constants/Layout';

import {
  AdMobBanner,
  Constants
} from 'expo';

const IOS_EXPO_ID='ca-app-pub-4248217184030056/2469387806'

export default class BottomBanner extends Component {
  bannerError(error){
    console.log({error},"banner Error")
  }
  getId(){
    return IOS_EXPO_ID
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