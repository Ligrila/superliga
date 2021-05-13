import React, { useCallback, useEffect, useState } from "react";
import {
    View,
    Image,
} from "react-native";

import { Text } from 'native-base'
// Recoil
import { useRecoilValue } from "recoil";
import { authUserAtom } from "../../recoil/Auth.recoil";
// Styles
import styles from './UserInfo.styles';

const ballImg = require('../../assets/images/ball.png');

const UserInfo = () => {
 
    const authUser = useRecoilValue(authUserAtom);

    const [lives, setLives] = useState('0');
    const [points, setPoints] = useState('0');

    const fetchData = useCallback(() => {
        if (authUser.life) {
            setLives(`${authUser.life.lives}`);
        }
        if (authUser.infinite_lives && authUser.infinite_lives[0]) {
            setLives('∞');
        }
        if (authUser.point) {
            setPoints(`${authUser.point.points}`);
        }

    }, [authUser]);

    useEffect(() => {
        if (authUser) {
            fetchData();
        }
    }, [authUser, fetchData])
    return (
        <View style={styles.container}>
            <View style={styles.liveContainer}>
                <Image source={ballImg} style={styles.ballImg} />
                <Text style={styles.livesText}>{lives}</Text>
            </View>
            <Text style={styles.pointsText}>PUNTOS</Text>
            <Text style={styles.pointsValueText}>{points}</Text>

        </View>
    )

}



export default UserInfo;
// export default connectStyle('SuperLiga.UserInfo')(UserInfo);