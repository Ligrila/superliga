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
import { useFocusEffect } from "@react-navigation/native";

const ballImg = require('../../assets/images/ball_min.png');

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
    useFocusEffect(
        useCallback(() => {
            if (authUser) {
                // console.log('authUser', authUser);
                fetchData();
            }
            return () => {

            };
        }, [authUser])
    )

    return (
        <View style={styles.container}>
            <View style={[styles.liveContainer, parseInt(lives) === 0 ? { opacity: 0.5 } : null]}>
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