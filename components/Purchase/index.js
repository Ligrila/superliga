import React, { Component } from 'react'
import { View, ImageBackground,TouchableOpacity } from 'react-native'
import Reflux from 'reflux'

import {connectStyle,Text} from 'native-base'

import bgSrc from '../../assets/images/purchase-modal.png'
import { LivePacksStore, LivePacksActions } from '../../store/LivePacksStore';
import Api from '../../api/Api';

class Purchase extends Reflux.Component {
    api = new Api
    constructor(props){
        super(props);
        this.store = LivePacksStore
    }

  componentDidMount(){
      if(!this.state.LivePacks.hasData){
        LivePacksActions.index();
      }
  }
  _callPurchase = async (item) =>{
    const response = await this.api.purchase(item);
    const purchaseUrl = response.data.purchaseUrl;
    this.props.navigation.navigate('Purchase',{purchaseUrl});
  }
  renderPacks(){
    if(this.state.LivePacks.hasData){
        const styles = this.props.style
        const items = this.state.LivePacks.data.map(
            (item) => {
                return (
                <View key={item.id} style={styles.item}>
                    <TouchableOpacity onPress={()=>this._callPurchase(item)}>
                        <Text style={styles.itemText}>{item.name}</Text>
                    </TouchableOpacity>
                </View>
                )
            }
        )
        return items;
    }
  }

  render() {
    const styles = this.props.style;
    return (
      <View style={styles.container}>
        <ImageBackground source={bgSrc} style={styles.background}>
            <View style={styles.header}>
                <Text style={styles.headerText}>
                    {'COMPRA VIDAS\n Y SEGUI\n JUGANDO'}
                </Text>
            </View>
            {this.renderPacks()}
        </ImageBackground>

      </View>
    )
  }
}

export default connectStyle('SuperLiga.Purchase')(Purchase);