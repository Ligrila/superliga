import React from 'react';
import Reflux from 'reflux';
import {
  Image,
  TouchableOpacity,
  ActivityIndicator,
  View,
  Share
} from 'react-native';

import { connectStyle,Text,Container,Content, Spinner, Footer, Icon } from 'native-base';


import Wallpaper from '../components/Wallpaper';
import AppHeader from '../components/AppHeader/AppHeader';



import {NextTriviaStore,NextTriviaActions} from '../store/NextTriviaStore';



import bgSrc from '../assets/images/home_bg.png';
import helpSrc from '../assets/images/home/help.png';
import shareSrc from '../assets/images/home/share.png';
import shopSrc from '../assets/images/home/shop.png';
import NextTrivia2 from '../components/NextTrivia2';
import { UsersStore } from '../store/UserStore';
import { StatisticsStore, StatisticsActions } from '../store/StatisticsStore';
import TriviaCarouselMinimal from '../components/Trivia/TriviaCarouselMinimal';



class HomeScreen2 extends Reflux.Component {

	constructor(props) {
    super(props);
		this.stores = [NextTriviaStore,UsersStore,StatisticsStore];
	}
  async componentDidMount() {
    StatisticsActions.update();
    await NextTriviaActions.get();

  }


  renderNextTrivia(){
    if(!this.state.NextTrivia.hasData) return <Spinner />;
    return (<TriviaCarouselMinimal></TriviaCarouselMinimal>)
    return (
      <NextTrivia2 trivia={this.state.NextTrivia.Trivia}/>
    );
  }
  _showTriviasScreen = () => {
    this.props.navigation.navigate('TriviasScreen');
  }
  componentDidUpdate(){
    if (this.state.CurrentTrivia.hasData) {
      this.props.navigation.navigate('StartFirstTime');
    }
  }

  goToTutorial = () => {
    this.props.navigation.navigate('Tutorial');

  }
  goToPurchase = () => {
    this.props.navigation.navigate('LivePacks');

  }
  share = () =>{
    Share.share(
      {
        title: 'Jugada Super Liga',
        message: "Hola estoy jugando a Jugada Super Liga. Usa mi código '"+this.state.user.username+"' para registrate. https://www.jugadasuperliga.com/get"
      }
    );
  }
  render() {
    const styles = this.props.style;
    let points = 0;
    let lives = 0;
    if(this.state.hasInformation){
        if(this.state.user.life){
            lives = this.state.user.life.lives;
        }
        if(this.state.user.infinite_lives && this.state.user.infinite_lives[0]){
            lives = '∞';
        }
        if(this.state.user.point){
            points = this.state.user.point.points;
        }
    }

    return (
          <Container>
            <Wallpaper source={bgSrc}>
            <AppHeader drawerOpen={() => {this.props.navigation.openDrawer()}} />
            <Content>
                 <View style={styles.nextTriviaIconsContainer}>
                  {this.renderNextTrivia()}
                 </View>
                 <View style={styles.userStatisticsContainer}>
                    <View style={styles.userStatisticsItem}>
                      <Text style={styles.userStatisticsItemValue}>{points}</Text>
                      <Text style={styles.userStatisticsItemVText}>PUNTOS</Text>
                    </View>
                    <View style={styles.userStatisticsItem}>
                      <View style={styles.userStatisticsSeparator}></View>
                    </View>
                    <View style={styles.userStatisticsItem}>
                      <Text style={styles.userStatisticsItemValue}>{this.state.Statistics.ranking}</Text>
                      <Text style={styles.userStatisticsItemVText}>RANKING</Text>
                    </View>
                    <View style={styles.userStatisticsItem}>
                      <View style={styles.userStatisticsSeparator}></View>
                    </View>
                    <View style={styles.userStatisticsItem}>
                      <Text style={styles.userStatisticsItemValue}>{lives}</Text>
                      <Text style={styles.userStatisticsItemVText}>VIDAS</Text>
                    </View>
                 </View>
                 <View style={styles.actionsContainer}>
                    <View style={styles.actionsItem}>
                      <TouchableOpacity
                        onPress={this.goToTutorial}
                      >
                        <Image source={helpSrc} style={styles.actionsIcon}/>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.actionsItem}>
                      <TouchableOpacity
                        onPress={this.goToPurchase}

                      >
                        <Image source={shopSrc} style={styles.actionsIcon}/>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.actionsItem}>
                      <TouchableOpacity
                            onPress={this.share}

                      >
                        <Image source={shareSrc} style={styles.actionsIcon}/>
                      </TouchableOpacity>
                    </View>
                 </View>

            </Content>

            </Wallpaper>
          </Container>
    );
  }


}

export default connectStyle('SuperLiga.HomeScreen2')(HomeScreen2);