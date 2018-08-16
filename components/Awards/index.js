import React, { Component } from 'react';
import Reflux from 'reflux';
import { View,Image } from 'react-native';
import {connectStyle,Text} from 'native-base'
import Carousel, { Pagination } from 'react-native-snap-carousel';

import { AwardsStore, AwardsActions } from '../../store/AwardsStore';
import Title from '../Title';
import Layout from '../../constants/Layout';


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
    this.store = AwardsStore;
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

  _renderItem = ({item, index}) => {
    const styles = this.props.style;
    return (
        <View style={styles.slide}>
            <View style={styles.absoluteBg}>
            </View>
            <Image source={{uri:item.avatar}} style={styles.avatar} />
            <Text style={styles.title}>{ item.name }</Text>
            <Text style={styles.description}>{ item.description }</Text>
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