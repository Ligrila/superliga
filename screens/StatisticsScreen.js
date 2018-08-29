import React from 'react';
import Reflux from 'reflux';
import { View } from 'react-native';
import {connectStyle,Container,Content} from 'native-base'

import Wallpaper from '../components/Wallpaper';
import StatisticItem from '../components/StatisticItem';
import AppHeader from '../components/AppHeader/AppHeader';
import { StatisticsStore, StatisticsActions } from '../store/StatisticsStore';
import BigTitle from '../components/Title/BigTitle';

const bgSrc = require('../assets/images/bg.png');

class StatisticsScreen extends Reflux.Component {
  static navigationOptions = {
    title: 'Comprar partidas',
  };

  constructor(props) {
    super(props)
    this.store = StatisticsStore;
  };

  componentDidMount(){
    StatisticsActions.update();
  }
  
  render() {
    const styles = this.props.style;
    return (
      <Container>
      <Wallpaper source={bgSrc}>
      <AppHeader drawerOpen={() => {this.props.navigation.openDrawer()}} game={false} />
        <Content padder contentContainerStyle={styles.statistics}>
          <BigTitle text={"ESTADISTICAS DE JUEGO"}></BigTitle>
          <View style={styles.container}>
              <View style={styles.rowContainer}>
                <StatisticItem fill={this.state.Statistics.points} text="puntos" fillText={this.state.Statistics.points}/>
                <StatisticItem fill={this.state.Statistics.mediaHits} text={"aciertos totales\n vs media"} fillText={this.state.Statistics.mediaHits + "%"}/>
                <StatisticItem fill={this.state.Statistics.correctAnswers} text={"respuestas\n correctas"} fillText={this.state.Statistics.correctAnswers}/>
              </View>
              <View style={styles.rowContainer}>
                <StatisticItem fill={this.state.Statistics.wrongAnswers} text={"respuestas\n incorrectas"} fillText={this.state.Statistics.wrongAnswers}/>
                <StatisticItem fill={this.state.Statistics.triviaHits} text={"aciertos por\n incidencia"} fillText={this.state.Statistics.triviaHits + "%"}/>
                <StatisticItem fill={this.state.Statistics.usedLives} text={"vidas\n utilizadas"} fillText={this.state.Statistics.usedLives}/>
              </View>
              <View style={styles.rowContainer}>
                <StatisticItem fill={this.state.Statistics.ranking} text={"puesto\n general"} fillText={this.state.Statistics.ranking}/>
              </View>
           </View>
        </Content>
       </Wallpaper>
      </Container>
    );
  }

}

export default connectStyle('SuperLiga.StatisticsScreen')(StatisticsScreen);