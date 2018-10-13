import React, { Component } from 'react'
import { View } from 'react-native'
import {connectStyle,Text} from 'native-base'


class RankingItem extends Component {
  render() {
    const styles = this.props.style
    let currentStyle = {}
    if(this.props.number%2===0){
        currentStyle = {backgroundColor: '#353535'}
    }
    const altrowStyle = {...styles.name,...currentStyle}
    return (
      <View style={styles.container}>
        <View style={styles.number}>
            <Text style={styles.numberText}> {this.props.number}º </Text>
        </View>
        <View style={altrowStyle}>
            <View>
            <Text style={styles.nameText}> {this.props.item.user.first_name} {this.props.item.user.last_name}</Text>
            </View>
            <View>
            <Text style={styles.namePointsText}> {this.props.item.total_points}p.</Text>
            </View>
        </View>
      </View>
    )
  }
}

export default connectStyle("SuperLiga.RankingItem")(RankingItem)