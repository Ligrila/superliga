import React, { Component } from 'react'
import { View,TouchableOpacity,Image } from 'react-native'
import {connectStyle,Text} from 'native-base'

import CountDown from '../CountDown';
import TeamAvatar from '../TeamAvatar';
import BigTitle from '../Title/BigTitle';
import Notice from '../Notice';



class NextTrivia extends Component {
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
    return(
      <View>
        <BigTitle 
            text='Trivia en' 
            red='Vivo' 
            subtitle={this.trivia.local_team.name + ' VS ' + this.trivia.visit_team.name}/>
        <CountDown until={until} />

        <View style={styles.avatarContainer}>
            <TeamAvatar source={this.trivia.local_team.avatar} width={212} height={238} />
            <Text style={styles.vsText}>vs</Text>
            <TeamAvatar source={this.trivia.visit_team.avatar}  width={212} height={238} />
        </View>
        {this.getNotice()}
      </View>

      
    );
  }
}

export default connectStyle('SuperLiga.NextTrivia')(NextTrivia);