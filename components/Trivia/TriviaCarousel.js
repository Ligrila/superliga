import React, { Component } from 'react'
import { View,Image,TouchableOpacity } from 'react-native'
import Reflux from 'reflux'
import {connectStyle,Text} from 'native-base'
import Carousel, { Pagination } from 'react-native-snap-carousel';

import BigTitle from '../Title/BigTitle';
import Trivia from '../Trivia';

import { TriviaStore, TriviaActions } from '../../store/TriviaStore';

import AnimatedProgressBar from '..//AnimatedProgressBar';


import carouselNext from '../../assets/images/carousel-next.png';
import carouselPrev from '../../assets/images/carousel-prev.png';


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
      this.state = { title:'',subtitle:'',activeSlide: 0 };
      this.store = TriviaStore;
   
  }

  componentDidMount(){
    TriviaActions.index();
    TriviaActions.index.completed.listen((trivias)=>{
      this.setTitle(trivias.data[0]);
    });

  }
  setTitle(item){
    console.log('setTitle');
    this.setState({ title:  item.date.name});
    this.setState({ subtitle:  item.start_datetime_local.format('LL')});
  }
  onSnapToItem = (index)=>{
    const item = this.state.Trivia.Trivias[index];
    this.setTitle(item);
    this.setState({ activeSlide: index });

  }

  pagination = () => {
    const { activeSlide,Trivia } = this.state;
    const maxSlide = this.state.Trivia.Trivias.length;
    if(maxSlide<=0){
      return;
    }
    const value = ((activeSlide+1) * 100) / maxSlide;
    console.log(value);
    console.log(activeSlide);
    /*console.log('value',value);
    console.log('value',maxSlide);
    console.log('value',activeSlide);*/
    return (
      <AnimatedProgressBar
      width={Layout.window.width * 0.5}
      height={5}
      backgroundColor='#fff'
      containerBackgroundColor='#50aedf'
      maxValue={100}
      value={value}
    />
       /* <Pagination
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
        />*/
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

nextItem = () =>{
  this._carousel.snapToNext(); 
}

prevItem = () =>{
  this._carousel.snapToPrev(); 
}
  
  render() {
    const styles = this.props.style;

    return(
      <View style={styles.container}>
        <View style={styles.prev}>
          <TouchableOpacity onPress={this.prevItem}>
            <Image source={carouselPrev} style={styles.prevImage} />
            </TouchableOpacity>
        </View>
        <View style={styles.next}>
          <TouchableOpacity onPress={this.nextItem}>
            <Image source={carouselNext} style={styles.nextImage} />
            </TouchableOpacity>
        </View>
        <BigTitle 
            text={this.state.title}
            subtitle={this.state.subtitle} />
        <Carousel
            ref={(c) => { this._carousel = c; }}
            data={this.state.Trivia.Trivias}
            renderItem={this._renderItem}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            onSnapToItem={this.onSnapToItem}
            />
            <View style={styles.pagination}>
            {this.pagination()}
            </View>
        
      </View>

      
    );
  }
}

export default connectStyle('SuperLiga.NextTrivia')(TriviaCarousel);