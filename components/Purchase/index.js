import React, { Component } from 'react'
import { View, ImageBackground,TouchableOpacity } from 'react-native'
import Reflux from 'reflux'

import {connectStyle,Text} from 'native-base'

import bgSrc from '../../assets/images/purchase-modal.png'
import { LivePacksStore, LivePacksActions } from '../../store/LivePacksStore';
import Api from '../../api/Api';
import Loader from '../Loader';



class Purchase extends Reflux.Component {
    api = new Api
    state = {
        loading: false,
    }
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
    this.setState({loading:true});
    const response = await this.api.purchase(item);
    const purchaseUrl = response.data.purchaseUrl;
    this.setState({loading:false});
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
                        <Text style={styles.itemText}>QUIERO COMPRAR {item.name.toUpperCase()}{"\n"}({item.price}$ ARS)</Text>
                    </TouchableOpacity>
                </View>
                )
            }
        )
        return items;
    }
  }
  onHide = () => {
      this.props.onHidePress();
  }
  render() {
    const styles = this.props.style;
    return (
      <View style={styles.container}>
        <Loader loading={this.state.loading} />
        <ImageBackground source={bgSrc} style={{...styles.background,display: this.state.loading ? 'none': 'flex'}}>
            <View style={styles.close}>
                <TouchableOpacity
                onPress={this.onHide}
                >
                    <Text style={styles.closeText}>X</Text>
                </TouchableOpacity>
            </View>
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