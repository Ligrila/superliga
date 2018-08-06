import React from 'react';
import { View } from 'react-native';
import {connectStyle,Container,Content} from 'native-base'

import Wallpaper from '../components/Wallpaper';
import StatisticItem from '../components/StatisticItem';
import AppHeader from '../components/AppHeader/AppHeader';

const bgSrc = require('../assets/images/bg.png');

class StatisticsScreen extends React.Component {
  static navigationOptions = {
    title: 'Comprar partidas',
  };

  render() {
    const styles = this.props.style;
    return (
      <Container>
      <Wallpaper source={bgSrc}>
      <AppHeader drawerOpen={() => {this.props.navigation.openDrawer()}} game={false} />
        <Content padder contentContainerStyle={styles.statistics}>
          <View style={styles.container}>
              <View style={styles.rowContainer}>
                <StatisticItem fill={40} text="puntos" fillText="7750"/>
                <StatisticItem fill={70} text={"aciertos totales\n vs media"} fillText="25%"/>
                <StatisticItem fill={170} text={"respuestas\n correctas"} fillText="157"/>
              </View>
              <View style={styles.rowContainer}>
                <StatisticItem fill={170} text={"respuestas\n incorrectas"} fillText="157"/>
                <StatisticItem fill={12} text={"aciertos por\n incidencia"} fillText="12%"/>
                <StatisticItem fill={170} text={"vidas\n utilizadas"} fillText="157"/>
              </View>
              <View style={styles.rowContainer}>
                <StatisticItem fill={59} text={"puesto\n general"} fillText="59"/>
              </View>
           </View>
        </Content>
       </Wallpaper>
      </Container>
    );
  }

}

export default connectStyle('SuperLiga.StatisticsScreen')(StatisticsScreen);