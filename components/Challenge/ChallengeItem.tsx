import React from 'react'
import { View } from 'react-native'
import { Button, Text } from 'native-base'
import Avatar from '../Avatar';

import styles from './ChallengeItem.styles'
import { useNavigation } from '@react-navigation/native';
const trophyAvatarSrc = require('../../assets/images/championship/trophy-avatar.png')

const ChallengeItem = ({ challenge }) => {

    const navigation = useNavigation();

    const viewItem = (challenge) => {
        navigation.navigate("ChallengeView", { challenge })
    }



    return (
        <View style={styles.container} >
            <View style={styles.teamsContainer} >
                <View style={styles.team}>
                    <View style={styles.avatar}>
                        <Avatar medium avatar={challenge.championship1.avatar ? { uri: challenge.championship1.avatar } : trophyAvatarSrc} />
                    </View>
                    <Text style={styles.text}>{challenge.championship1.name} </Text>
                </View>
                <View style={styles.vs}>
                    <Text style={styles.vsText}>VS.</Text>
                </View>
                <View style={styles.team}>
                    <View style={styles.avatar}>
                        <Avatar medium alternateBorder avatar={challenge.championship2.avatar ? { uri: challenge.championship2.avatar } : trophyAvatarSrc} />
                    </View>
                    <Text style={styles.text}>{challenge.championship2.name} </Text>
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <View style={styles.buttonLine} />
                <View style={styles.buttonWrapper}>
                    <View>
                        <Button style={styles.button} onPress={() => viewItem(challenge)}>
                            <Text style={styles.buttonText}>VER ESTADÍSTICAS</Text>
                        </Button>
                    </View>
                </View>

            </View>

        </View>
    )

}

export default ChallengeItem;