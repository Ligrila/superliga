import React, { Component } from 'react';
import Reflux from 'reflux';
import { View,Image, Alert } from 'react-native';
import {connectStyle,Text, Button, Toast, Spinner} from 'native-base'
import Carousel, { Pagination } from 'react-native-snap-carousel';

import { AwardsStore, AwardsActions } from '../../store/AwardsStore';
import Title from '../Title';
import Layout from '../../constants/Layout';
import Api from '../../api/Api';
import { UsersStore, UsersActions } from '../../store/UserStore';


function wp (percentage) {
  const value = (percentage * Layout.window.width) / 100;
  return Math.round(value);
}

//const slideWidth = wp(85);
const slideWidth = Layout.window.width;
const itemHorizontalMargin = wp(2);

const sliderWidth = Layout.window.width;
const itemWidth = slideWidth;



class Awards extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = { activeSlide: 0 };
    this.stores = [AwardsStore,UsersStore];
    this.api  = new Api;
  }

  componentDidMount(){
    AwardsActions.index();
  }

  pagination = () => {
    const { activeSlide,Awards } = this.state;
    return (
        <Pagination
          dotsLength={Awards.length}
          activeDotIndex={activeSlide}
          containerStyle={{ backgroundColor: 'transparent' }}
          dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 8,
              backgroundColor: 'rgba(255, 255, 255, 0.92)'
          }}
          inactiveDotStyle={{
              // Define styles for inactive dots here
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
    );
}

  _awardRequest = async (item) => {
    const response = await this.api.changePoints(item.id);
    if(response.success){
      Toast.show({
        text: 'Tu premio fue solicitado correctamente',
        buttonText: 'Aceptar',
        type: "success"

      });
      UsersActions.update();
    } else{
      Toast.show({
        text: 'No hemos podido canjear tu premio',
        buttonText: 'Aceptar',
        type: "danger"

      });
    }
    console.log(response);
  }
  onChangeAward = (item) => {
    Alert
    Alert.alert(
      '¿Estas seguro de usar tu puntos?',
      `Usarás ${item.points} para obtener ${item.name}`,
      [
        {text: 'Cancelar', onPress: () => {return;}, style: 'cancel'},
        {text: 'OK', onPress: () => this._awardRequest(item)},
      ],
      { cancelable: false }
    )
  }

  _renderItem = ({item, index}) => {
    const styles = this.props.style;
    if(!this.state.hasInformation){
      return <Spinner />;
    }
    let points = 0;
    if(this.state.user.point){
         points = this.state.user.point.points;
    }

    return (
        <View style={styles.slide}>
            <View style={styles.absoluteBg}>
            </View>
            <Image source={{uri:item.avatar}} style={styles.avatar} />
            <Text style={styles.title}>{ item.name }</Text>
            <Text style={styles.description}>{ item.description }</Text>
            <Text style={styles.points}>{ item.points } puntos</Text>
            <View style={styles.buttonContainer}>
              <Button 
                          onPress={()=>{this.onChangeAward(item)}}
                          dark={points>=item.points}
                          disabled={points<item.points}
                          large
                          rounded style={styles.button}>
                          <Text style={styles.buttonText}>CANJEAR AHORA</Text>
              </Button>
            </View>
        </View>
    );
}
  render() {
    const styles = this.props.style;
    return (
      <View style={styles.container}>
        <Title text={'CANJE DE  \n PREMIOS'}></Title>
        <Carousel
              ref={(c) => { this._carousel = c; }}
              data={this.state.Awards}
              renderItem={this._renderItem}
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
              onSnapToItem={(index) => this.setState({ activeSlide: index }) 
            }
            />
            {this.pagination()}
      </View>
    );
  }
}


export default connectStyle('SuperLiga.Awards')(Awards);