import React, { Component } from 'react'
import { Image, View } from 'react-native'
import { AdMobBanner } from 'expo-ads-admob'
import Layout from '../../constants/Layout';
import Constants from 'expo-constants'



getAdMobID = ()=>{
    const isAndroid = Layout.isAndroid
    if(Constants.appOwnership=='expo'){
        return isAndroid ? "ca-app-pub-4248217184030056/8252070242": "ca-app-pub-4248217184030056/9157957802"
    }

    return isAndroid ? "ca-app-pub-4248217184030056/5356467688": "ca-app-pub-4248217184030056/8228019517"

}




export default class AdBanner extends Component {
  bannerError=(e)=>{
    console.log(e);
  }
  renderImageBanner(){
    return (
      <Image resizeMode='cover' source={{uri:this.props.item.bannerUri}} style={{width:Layout.window.width,height:Layout.window.height}}>

      </Image>
    )
  }


  renderBanner(){
    if(this.props.item.bannerType=='admod'){
      return (
        <AdMobBanner
        bannerSize="smartBannerPortrait"
        adUnitID={getAdMobID()}
        testDeviceID="EMULATOR"

        onDidFailToReceiveAdWithError={this.bannerError} />
      )
    }
    if(this.props.item.bannerType=='image'){
      return this.renderImageBanner()
    }
    return null;
  }
  render() {
    return (
      <View style={{flex:1}}>
        {this.renderBanner()}

      </View>
    )
  }
}