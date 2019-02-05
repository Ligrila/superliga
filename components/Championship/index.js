import React, { Component } from 'react';
import Reflux from 'reflux';
import { View } from 'react-native';
import {connectStyle, Icon, Button} from 'native-base'




import CreateChampionship from './CreateChampionship';
import ChampionshipList from './ChampionshipList';
import { CreateChampionshipActions } from '../../store/CreateChampionshipStore';
import { ChampionshipsActions } from '../../store/ChampionshipsStore';


class Championship extends React.Component {

  constructor(props) {
    super(props);

  }

  componentDidMount(){
      CreateChampionshipActions.created.listen((championship)=>{
          ChampionshipsActions.list();

      })
  }

  onCreatePress = ()=>{
    this.props.navigation.navigate('ChampionshipCreate')
  }
  renderWidget(){
    return (<ChampionshipList navigation={this.props.navigation}/>)

  }

  render() {
    const styles = this.props.style;
    return (
      <View style={styles.container} >
        {this.renderWidget()}

            <Button style={styles.createButton} onPress={this.onCreatePress}>
                <Icon name="md-add" type="Ionicons" style={styles.createButtonIcon} />
            </Button>
      </View>
    );
  }
}


export default connectStyle('SuperLiga.Championship')(Championship);