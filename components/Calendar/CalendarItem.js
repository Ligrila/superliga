import React, { Component } from 'react';
import { View } from 'react-native';
import {connectStyle,Text} from 'native-base'
import TeamAvatar from '../TeamAvatar';

class CalendarItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  renderTrivia = (trivia) => {
    styles = this.props.style;
    return (
      <View key={trivia.id} style={styles.triviaContainer}>
              <View style={styles.avatarContainer}>
                            <TeamAvatar source={trivia.local_team.avatar} width={86} height={90} />
                            <Text style={styles.vsText}>vs</Text>
                            <TeamAvatar source={trivia.visit_team.avatar}  width={86} height={90} />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.teamsText}>{trivia.local_team.name} vs. {trivia.visit_team.name}</Text>
                <Text style={styles.dateText}>{typeof(trivia.start_datetime_local)=='object' ? trivia.start_datetime_local.format("DD/MM/YYYY HH:mm") : trivia.start_datetime}</Text>
              </View>
      </View>
    );
  }
  render() {
    const trivias = this.props.item.trivias.map(
      trivia => {
        return this.renderTrivia(trivia)
      }
    )
    const styles = this.props.style;
    return (
      <View>
        <Text style={styles.title}>{this.props.item.name}</Text>
        <View style={styles.allTrivias}>
          {trivias}
        </View>
      </View>
    );
  }
}

export default connectStyle('SuperLiga.CalendarItem')(CalendarItem)