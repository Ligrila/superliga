import React from "react";
import {
    View
} from "react-native";

import { Text } from 'native-base'


import styles from './GameAnswerResult.styles'

interface GameAnswerResult {
    win: any
    serverSuccess: any
    lives: any
    canceled: any,
    points: any
}

const GameAnswerResult = (props: GameAnswerResult) => {


    const points = props.points;
    const lives = props.lives;
    const canceled = props.canceled;

    //<Button block info rounded onPress={this.backToGamePlay} style={styles.button}><Text style={styles.buttonText}>Quiero seguir jugando</Text></Button>
    if (canceled) {
        return (
            <View style={[styles.container]}>
                <Text style={styles.text}>{`Uhhh,\npregunta\nanulada!`}</Text>
            </View>
        )
    }
    if (props.win) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Sos un <Text style={styles.bigText}>crack!</Text></Text>
                <Text style={styles.subtext}>
                    {`SUMAS `}
                    <Text style={styles.subtextBold}>{`${points} PUNTOS`}</Text>
                </Text>
            </View>
        )
    }
    if (props.serverSuccess) {
        if (lives ===  0 ) {
            return (
                <View style={styles.container}>
                    <Text style={styles.text}>{`Estas,\nFuera!`}</Text>
                    <Text style={styles.subtext}>
                        {`TE DESCUENTA `}
                        <Text style={styles.subtextBold}>{`1 VIDA.`}</Text>
                    </Text>
                </View>
            )
        }
        if (lives > 1 ) {
            return (
                <View style={styles.container}>
                    <Text style={styles.text}>{`Uhhh,\nla pifiaste`}</Text>
                    <Text style={styles.subtext}>
                        {`PERDISTE `}
                        <Text style={styles.subtextBold}>{`${points} PUNTOS.`}</Text>
                    </Text>
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <Text style={styles.text}>Sono el Silbato!</Text>
                    <Text style={styles.subtext}>
                        {`PERDISTE `}
                        <Text style={styles.subtextBold}>{`${points} PUNTOS.`}</Text>
                    </Text>
                </View>
            );
        }

    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Sono el Silbato!</Text>
            <Text style={styles.subtext}>NO RESPONDISTE {"\n"} A TIEMPO</Text>
        </View>
    )

}


export default GameAnswerResult;
// export default connectStyle('SuperLiga.GameAnswerResult')(GameAnswerResult);
