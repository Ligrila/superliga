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
    //console.log("purchase",response);
    if(!response || !response.success){
        this.setState({loading:false});
        return;    
    }
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
                        <Text style={styles.itemText}>COMPRAR {item.name.toUpperCase()}{item.infinite ? " " : "\n"}({item.price}$ ARS)</Text>
                    </TouchableOpacity>
                </View>
                )
            }
        )
        return items;
    }
  }
  onHide = () => {
      //console.log("ONHIDE");
      this.props.onHidePress();
  }
  renderHide(){
    const hasHide = typeof(this.props.onHidePress)=='function';

    if(!hasHide){
        return null;
    }
    const styles = this.props.style;
    return(
        <View style={styles.close}>
        <TouchableOpacity
        style={styles.closeTouchable}
        onPress={this.onHide}
        >
            <Text style={styles.closeText}>X</Text>
        </TouchableOpacity>
        </View>
    )
  }
  render() {
    const styles = this.props.style;

    return (
      <View style={styles.container}>
        <Loader loading={this.state.loading} />
        <ImageBackground source={bgSrc} style={{...styles.background,display: this.state.loading ? 'none': 'flex'}}>
            {this.renderHide()}
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