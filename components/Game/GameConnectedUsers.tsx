import React, { Component } from "react";
import { Text } from 'native-base'

import styles from './GameConnectedUser.styles'
import { useRecoilValue } from "recoil";
import { connectedUserAtom } from "../../recoil/ConnectedUsers.recoil";

const GameConnectedUsers = () => {

    const usersCount = useRecoilValue(connectedUserAtom);

    return (
        <Text style={styles.text}>
            {usersCount} participando
        </Text>
    )

}

export default GameConnectedUsers;
/// export default connectStyle('SuperLiga.GameConnectedUsers')(GameConnectedUsers);
