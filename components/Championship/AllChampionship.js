import React, { Component } from 'react';
import Reflux from 'reflux';
import { View } from 'react-native';
import {connectStyle, Icon, Button} from 'native-base'




import AllChampionshipList from './AllChampionshipList';


class AllChampionship extends React.Component {

  constructor(props) {
    super(props);

  }

  componentDidMount(){

  }


  renderWidget(){
    return (<AllChampionshipList navigation={this.props.navigation}/>)

  }

  render() {
    const styles = this.props.style;
    return (
      <View style={styles.container} >
        {this.renderWidget()}


      </View>
    );
  }
}


export default connectStyle('SuperLiga.Championship')(AllChampionship);