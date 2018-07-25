import React, { Component } from "react";
import { connectStyle, Text } from 'native-base'
import Reflux from 'reflux';

import {ConnectedUsersStore} from '../../store/ConnectedUsersStore';

/**
 * 
 */

class GameConnectedUsers extends Reflux.Component {
    constructor(props){
        super(props);
        this.store = ConnectedUsersStore;
    }
    render(){
        const styles = this.props.style;
        return(
                <Text style={styles.text}>
                {this.state.usersCount} participando
                </Text>
        )
    }
}


export default connectStyle('SuperLiga.GameConnectedUsers')(GameConnectedUsers);
