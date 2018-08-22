import React, { Component } from 'react'
import { View } from 'react-native'
import Reflux from 'reflux'
import {connectStyle,Text} from 'native-base'
import Carousel, { Pagination } from 'react-native-snap-carousel';

import BigTitle from '../Title/BigTitle';
import Trivia from '../Trivia';

import { TriviaStore, TriviaActions } from '../../store/TriviaStore';

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



class TriviaCarousel extends Reflux.Component {
   constructor(props){
      super(props);
      this.state = { activeSlide: 0 };
      this.store = TriviaStore;
   
  }

  componentDidMount(){
    TriviaActions.index();
  }

  onSnapToItem = (index)=>{
    this.setState({ activeSlide: index });
    this.setState({ title:  item.date.name});
    this.setState({ subtitle:  item.start_datetime.format('')});
  }

  pagination = () => {
    const { activeSlide,Trivia } = this.state;
    return (
        <Pagination
          dotsLength={Trivia.Trivias.length}
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
    if(!this.state.Trivia.hasData){
      return;
    }

    return (
        <View style={styles.slide}>
          <Trivia trivia={item} />
        </View>
    );
}
  
  render() {
    const styles = this.props.style;
    return(
      <View>
        <BigTitle 
            text={this.state.title}
            subtitle='5 de septiembre'/>
        <Carousel
            ref={(c) => { this._carousel = c; }}
            data={this.state.Trivia.Trivias}
            renderItem={this._renderItem}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            onSnapToItem={this.onSnapToItem}
            />
            {this.pagination()}
        
      </View>

      
    );
  }
}

export default connectStyle('SuperLiga.NextTrivia')(TriviaCarousel);