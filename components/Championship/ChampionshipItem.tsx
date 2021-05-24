import React from 'react';
import { View } from 'react-native';
import { Text, Button, Icon } from 'native-base'
import Avatar from '../Avatar/Avatart';
// Styles
import styles from './ChampionshipItem.styles';
const trophyAvatarSrc = require('../../assets/images/championship/trophy-avatar.png')
const flagSrc = require('../../assets/images/flag.png')

interface ChampionshipItemProps {
  onChallenge?: () => void;
  altrow?: boolean;
  championship: any;

}

const ChampionshipItem = (props: ChampionshipItemProps) => {
  
  const renderChallege = () => {
    if (props.onChallenge) {
      return (
        <Button transparent onPress={props.onChallenge} style={styles.flagButton}>
          <Icon name="handshake-o" type='FontAwesome' style={styles.flagIcon}></Icon>
        </Button>)
    }
  }



  const nameContainerStyles = props.altrow ? { ...styles.nameContainer, ...styles.nameContainerAltRow } : styles.nameContainer
  const avatar = props.championship.avatar ? { uri: props.championship.avatar } : trophyAvatarSrc
  return (
    <View style={styles.container}>
      <View style={styles.position}>
        <Text style={styles.positionText}>
          {props.championship.position}º</Text>
      </View>
      <View style={nameContainerStyles}>
        <View style={styles.name}>
          <Text style={styles.nameText}>
            {props.championship.name} {"\n"}
            {props.championship.users_count} 
                    </Text>

        </View>
        
        <View style={styles.points}>
          <Text style={styles.pointsText}>{props.championship.points}p</Text>

        </View>
        <View style={styles.challenge}>
          {renderChallege()}
        </View>

      </View>
      <View style={styles.avatar}>
        <Avatar mini avatar={avatar}></Avatar>
      </View>

    </View>
  );

}


export default ChampionshipItem;