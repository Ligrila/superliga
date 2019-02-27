import React, { Component } from 'react';
import Reflux from 'reflux';
import { View } from 'react-native';
import {connectStyle, Icon, Button} from 'native-base'





import ChallengeChampionshipList from './ChallengeChampionshipList';

import { AllChampionshipsActions } from '../../store/AllChampionshipsStore';


class Challenges extends React.Component {

  constructor(props) {
    super(props);

  }

  componentDidMount(){
    
    
  }


  
  renderWidget(){
    return (<ChallengeChampionshipList navigation={this.props.navigation}/>)

  }

  render() {
    const styles = this.props.style;
    return (
      <View style={styles.container} >
        {this.renderWidget()}

      </View>
    );
  }
}


export default connectStyle('SuperLiga.Challenges')(Challenges);