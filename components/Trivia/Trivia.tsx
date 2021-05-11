import React, { Component } from 'react'
import { View,TouchableOpacity,Image } from 'react-native'
import {Text} from 'native-base'

import TeamAvatar from '../TeamAvatar';
import Notice from '../Notice/Notice';
import Layout from '../../constants/Layout';


import styles from './Trivia.styles'


interface TriviaProps{
    trivia: any,
    avatarWidth?: number,
    avatarHeight?: number,
  }
  
const  Trivia = ({ trivia, avatarWidth, avatarHeight }:TriviaProps) =>{


  const getNotice = () => {
    if(trivia.points_multiplier>1){
        if(trivia.points_multiplier==2){
            return <Notice text={'x cada acierto \n tus puntos se duplican!'} />
        } else{
            return <Notice text={'x cada acierto \n tus puntos valen '+trivia.points_multiplier+' veces más!'} />
        }
    }

    return null;
  }


    const width =  avatarWidth || 212 * Layout.window.ratio;
    const height = avatarHeight || 238 * Layout.window.ratio;

    return(
      <View>
        <View style={styles.avatarContainer}>
            <TeamAvatar source={trivia.local_team.avatar} width={width} height={height} />
            <Text style={styles.vsText}>vs</Text>
            <TeamAvatar source={trivia.visit_team.avatar}  width={width} height={height} />
        </View>
        <View>
            {getNotice()}
        </View>
        
      </View>

      
    );
  
}

export default Trivia;
