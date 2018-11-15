import React, { Component } from 'react'
import { View,TouchableOpacity,Image } from 'react-native'
import {connectStyle,Text} from 'native-base'

import TeamAvatar from '../TeamAvatar';
import Notice from '../Notice';
import Layout from '../../constants/Layout';



class Trivia extends Component {
   constructor(props){
      super(props);
      this.trivia = this.props.trivia;
   
  }

  getNotice = () => {
    if(this.trivia.points_multiplier>1){
        if(this.trivia.points_multiplier==2){
            return <Notice text={'x cada acierto \n tus puntos se duplican!'} />
        } else{
            return <Notice text={'x cada acierto \n tus puntos valen '+this.trivia.points_multiplier+' veces más!'} />
        }
    }

    return null;
  }

  render() {
    const styles = this.props.style;

    let sdate = this.trivia.start_datetime_local.toDate();
    let until = ( sdate.getTime() - new Date().getTime()) / 1000;
    const width = this.props.avatarWidth || 212 * Layout.window.ratio;
    const height = this.props.avatarHeight || 238 * Layout.window.ratio;
    return(
      <View>
        <View style={styles.avatarContainer}>
            <TeamAvatar source={this.trivia.local_team.avatar} width={width} height={height} />
            <Text style={styles.vsText}>vs</Text>
            <TeamAvatar source={this.trivia.visit_team.avatar}  width={width} height={height} />
        </View>
        {this.getNotice()}
      </View>

      
    );
  }
}

export default connectStyle('SuperLiga.Trivia')(Trivia);