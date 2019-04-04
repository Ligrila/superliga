import React, { Component } from 'react'
import {  View } from 'react-native'
import {connectStyle, Button,Text} from 'native-base'
import Avatar from '../Avatar';


const trophyAvatarSrc = require('../../assets/images/championship/trophy-avatar.png')

class ChallengeItem extends Component {
 challenge = {

 }

 constructor(props){
     super(props)
     this.challenge = this.props.challenge
 }
 viewItem(challenge){
    this.props.navigation.navigate("ChallengeView",{challenge})
  }
  render() {
    const styles = this.props.style
    const challenge = this.props.challenge
    return (
        <View style={styles.container} >
        <View style={styles.teamsContainer} >
            <View style={styles.team}>
                <View  style={styles.avatar}>
                    <Avatar medium avatar={challenge.championship1.avatar ? {uri:challenge.championship1.avatar} : trophyAvatarSrc} />
                </View>
                <Text style={styles.text}>{challenge.championship1.name} </Text>
            </View>
            <View style={styles.vs}>
                <Text style={styles.vsText}>VS.</Text>
            </View>
            <View style={styles.team}>
                <View  style={styles.avatar}>
                    <Avatar medium alternateBorder avatar={challenge.championship2.avatar ? {uri:challenge.championship2.avatar} : trophyAvatarSrc} />
                </View>
                <Text style={styles.text}>{challenge.championship2.name} </Text>
            </View>
        </View>

          <View style={styles.buttonContainer}>
           <View style={styles.buttonLine} />
           <View style={styles.buttonWrapper}>
                <View>
                    <Button style={styles.button} onPress={()=>this.viewItem(challenge)}>
                        <Text style={styles.buttonText}>VER ESTADÍSTICAS</Text>
                    </Button>
                </View>
           </View>
           
          </View>

        </View>
    )
  }
}

export default connectStyle('SuperLiga.ChallengeItem')(ChallengeItem)