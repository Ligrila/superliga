import React, { Component } from 'react'
import { View,Image,TouchableOpacity } from 'react-native'
import Reflux from 'reflux'
import {connectStyle,Text, Spinner} from 'native-base'
import Carousel, { Pagination } from 'react-native-snap-carousel';

import BigTitle from '../Title/BigTitle';
import TriviaMinimal from '../Trivia/TriviaMinimal';

import { TriviaStore, TriviaActions } from '../../store/TriviaStore';

import Notice from '../Notice';


import AnimatedProgressBar from '../AnimatedProgressBar';


import carouselNext from '../../assets/images/trivia-carousel-minimal-next.png';
import carouselPrev from '../../assets/images/trivia-carousel-minimal-prev.png';


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



class TriviaCarouselMinimal extends Reflux.Component {
   completedUnsuscribe = null;
   constructor(props){
      super(props);
      this.state = { loading:true,title:'',subtitle:'',activeSlide: 0,didMount: false };
      this.store = TriviaStore;
   
  }

  componentDidMount(){
    TriviaActions.index();
    this.completedUnsuscribe = TriviaActions.index.completed.listen((trivias)=>{
      this.setTitle(trivias.data[0]);
      this.props.onItem(trivias.data[0]);

    });
    this.setState({loading:false});
    this.setState({didMount:true});

  }
  componentWillUnmount(){
    super.componentWillUnmount();
    this.setState({didMount:false});
    if(this.completedUnsuscribe){
      //console.log("unsuscribe");
      this.completedUnsuscribe();


    }

  }
  setTitle(item){
    this.setState({ title:  item.date.name});
    this.setState({ subtitle:  item.start_datetime_local.format('LL')});
  }
  onSnapToItem = (index)=>{
    const item = this.state.Trivia.Trivias[index];
    this.props.onItem(item)
    this.setTitle(item);
    this.setState({ activeSlide: index });

  }

  pagination = () => {
    const { activeSlide,Trivia,loading } = this.state;
    if(loading){
      return;
    }
    if(!this.state.Trivia.Trivias){
      return;
    }
    const maxSlide = this.state.Trivia.Trivias.length;
    if(maxSlide<=0){
      return;
    }
    const value = ((activeSlide+1) * 100) / maxSlide;
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

getNotice = (item) => {
    if(item.points_multiplier>1){
          const styles = this.props.style;

        if(item.points_multiplier==2){
            return (<Text style={styles.pointsMultiplierText}>Tus puntos se duplican!</Text>)
        } else{
            return (<Text style={styles.pointsMultiplierText}>Tus puntos valen x{item.points_multiplier}!</Text>)
        }
    }

    return null;
  }
_renderItem = ({item, index}) => {
    const styles = this.props.style;
    if(!this.state.Trivia.hasData){
      return;
    }
    const winnerText = item.award.length > 0 ? item.award  : ''
    
    return (
        <View style={styles.slide}>
          <TriviaMinimal trivia={item} />
          <View style={styles.triviaDateTextContainer}>
            <Text style={styles.triviaDateText}></Text>
            <Text style={styles.triviaDateText}>{item.start_datetime_local.format('LL')}</Text>
            <Text style={styles.triviaDateText}>{item.start_datetime_local.format('HH:mm')}hs</Text>
            {this.getNotice(item)}
          </View>
          <View style={styles.triviaAwardContainer}>
            <Text style={styles.triviaAwardText}> {winnerText}</Text>
          </View>
        </View>
    );
}

nextItem = () =>{
  this._carousel.snapToNext(); 
}

prevItem = () =>{
  this._carousel.snapToPrev(); 
}

renderCarousel(){
  if(!this.state.didMount){
    return;
  }
  return (
    <Carousel
            ref={(c) => { this._carousel = c; }}
            data={this.state.Trivia.Trivias}
            renderItem={this._renderItem}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            onSnapToItem={this.onSnapToItem}
            />
  )
}
  
  render() {
    const styles = this.props.style;
    if(!this.state.Trivia.hasData){
      return <Spinner />;
    }

    if(this.state.Trivia.Trivias.length==0){
      return (
        <BigTitle 
        text='Próximas' 
        red='trivias' 
        subtitle={'No hay próximas trivias. Prueba de nuevo más tarde'}/>
      )
    }

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
            {this.renderCarousel()}
        
      </View>

      
    );
  }
}

export default connectStyle('SuperLiga.TriviaCarouselMinimal')(TriviaCarouselMinimal);