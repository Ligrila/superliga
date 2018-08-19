import React, { Component } from 'react'
import { View } from 'react-native'
import {connectStyle,Text} from 'native-base'

import CountDown from '../CountDown';
import TeamAvatar from '../TeamAvatar';
import DateUtil from '../../DateUtil';


class NextTrivia extends Component {
  constructor(props){
      super(props);
      this.trivia = this.props.trivia;
  }
  render() {
    const styles = this.props.style;

    const date = new Date(this.trivia.start_datetime);
    var until = ( date.getTime() - new Date().getTime()) / 1000;
    let dateUtil = new DateUtil;
    console.log("serverDate",this.trivia.start_datetime);
    console.log("offset",dateUtil.timeZoneOffset);
    console.log('until',until);
    return(
      <View>
        <CountDown until={until} />
        <View style={styles.avatarContainer}>
            <TeamAvatar source={this.trivia.local_team.avatar} width={212} height={238} />
            <Text style={styles.vsText}>vs</Text>
            <TeamAvatar source={this.trivia.visit_team.avatar}  width={212} height={238} />
        </View>
        <Text>{this.trivia.local_team.name} VS {this.trivia.visit_team.name}</Text>
      </View>
      
    );
  }
}

export default connectStyle('SuperLiga.NextTrivia')(NextTrivia);