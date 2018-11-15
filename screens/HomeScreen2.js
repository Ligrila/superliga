import React from 'react';
import Reflux from 'reflux';
import {
  Image,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from 'react-native';

import { connectStyle,Text,Container,Content, Spinner, Footer, Icon } from 'native-base';


import Wallpaper from '../components/Wallpaper';
import AppHeader from '../components/AppHeader/AppHeader';



import {NextTriviaStore,NextTriviaActions} from '../store/NextTriviaStore';



import bgSrc from '../assets/images/home_bg.png';
import NextTrivia2 from '../components/NextTrivia2';
import { UsersStore } from '../store/UserStore';
import { StatisticsStore, StatisticsActions } from '../store/StatisticsStore';



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
    return (
      <NextTrivia2 trivia={this.state.NextTrivia.Trivia}/>
    );
  }
  _showTriviasScreen = () => {
    this.props.navigation.navigate('TriviasScreen');
  }
  componentDidUpdate(){
    if (this.state.CurrentTrivia.hasData) {
      this.props.navigation.navigate('GamePlay');
    }
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
                      <Text style={styles.userStatisticsItemVText}>Puntos</Text>
                    </View>
                    <View style={styles.userStatisticsItem}>
                      <View style={styles.userStatisticsSeparator}></View>
                    </View>
                    <View style={styles.userStatisticsItem}>
                      <Text style={styles.userStatisticsItemValue}>{this.state.Statistics.ranking}</Text>
                      <Text style={styles.userStatisticsItemVText}>Ranking</Text>
                    </View>
                    <View style={styles.userStatisticsItem}>
                      <View style={styles.userStatisticsSeparator}></View>
                    </View>
                    <View style={styles.userStatisticsItem}>
                      <Text style={styles.userStatisticsItemValue}>{lives}</Text>
                      <Text style={styles.userStatisticsItemVText}>Vidas</Text>
                    </View>
                 </View>
                 <View style={styles.actionsContainer}>
                    <View style={styles.actionsItem}>
                      <TouchableOpacity>
                        <Icon style={styles.actionsItemText} name='help'  type="Entypo"></Icon>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.actionsItem}>
                      <TouchableOpacity>
                        <Icon style={styles.actionsItemText} name='shopping-cart' type="Entypo"></Icon>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.actionsItem}>
                      <TouchableOpacity>
                        <Icon style={styles.actionsItemText} name='user-plus' type="FontAwesome"></Icon>
                      </TouchableOpacity>
                    </View>
                 </View>

            </Content>
            <Footer style={styles.footer}>
                <TouchableOpacity
                 style={styles.nextMatchLink}
                 onPress={this._showTriviasScreen}
                >
                    <Text style={styles.nextMatchText}>ver siguientes partidos</Text>
                    <Image style={styles.nextMatchImage} source={require('../assets/images/nextArrow.png')}></Image>
                </TouchableOpacity>
            </Footer>
            </Wallpaper>
          </Container>
    );
  }


}

export default connectStyle('SuperLiga.HomeScreen2')(HomeScreen2);