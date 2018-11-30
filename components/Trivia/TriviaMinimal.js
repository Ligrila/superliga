import React, { Component } from 'react'
import { View,TouchableOpacity,Image } from 'react-native'
import {connectStyle,Text} from 'native-base'

import TeamAvatar from '../TeamAvatar';
import Notice from '../Notice';
import Layout from '../../constants/Layout';



class TriviaMinimal extends Component {
   constructor(props){
      super(props);
      this.trivia = this.props.trivia;
   
  }


  render() {
    const styles = this.props.style;

    let sdate = this.trivia.start_datetime_local.toDate();
    let until = ( sdate.getTime() - new Date().getTime()) / 1000;
    const width = this.props.avatarWidth || 212 * Layout.window.ratio;
    const height = this.props.avatarHeight || 238 * Layout.window.ratio;
    if(this.trivia.type=='trivia'){
                  return (
                      <View style={styles.avatarContainer}>
                        <View style={styles.programmedTriviaTextContainer}>
                          <Text style={styles.programmedTriviaText1}>TRIVIA</Text>
                          <Text style={styles.programmedTriviaText2}>SEMANAL</Text>
                        </View>

                      </View>
                 )
    }
    return(
      <View>
        <View style={styles.avatarContainer}>
            <TeamAvatar source={this.trivia.local_team.avatar} width={width} height={height} />
            <Text style={styles.vsText}>vs</Text>
            <TeamAvatar source={this.trivia.visit_team.avatar}  width={width} height={height} />
        </View>
      </View>

      
    );
  }
}

export default connectStyle('SuperLiga.TriviaMinimal')(TriviaMinimal);