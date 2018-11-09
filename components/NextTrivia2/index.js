import React, { Component } from 'react'
import { View,TouchableOpacity,Image } from 'react-native'
import {connectStyle,Text} from 'native-base'

import CountDown from '../CountDown';
import TeamAvatar from '../TeamAvatar';
import BigTitle from '../Title/BigTitle';
import Notice from '../Notice';
import Trivia from '../Trivia';



class NextTrivia2 extends Component {
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
    if(!this.trivia){
      return (
        <BigTitle 
        text='Trivia en' 
        red='Vivo' 
        subtitle={'No hay próximas trivias. Prueba de nuevo más tarde'}/>
      )
    }

    let sdate = this.trivia.start_datetime_local.toDate();
    let until = ( sdate.getTime() - new Date().getTime()) / 1000;
    return(
      <View>
        <Trivia trivia={this.trivia} />
        <View style={styles.triviaDateTextContainer}>
          <Text style={styles.triviaDateText}>Próximo partido</Text>
          <Text style={styles.triviaDateText}>{this.trivia.start_datetime_local.format('LL')}</Text>
        </View>
        <View style={styles.triviaAwardContainer}>
          <Text style={styles.triviaAwardText}> Jugas por: </Text>
        </View>

      </View>

      
    );
  }
}

export default connectStyle('SuperLiga.NextTrivia2')(NextTrivia2);