import React from 'react';
import { View } from 'react-native';
import { Icon, Button } from 'native-base'
import ChampionshipList from './ChampionshipList';


import styles from './Championship.styles';
import { useNavigation } from '@react-navigation/native';

const Championship = ({championships}) => {

    const navigation = useNavigation();

    const onCreatePress = () => {
        navigation.navigate('ChampionshipCreate')
    }

    return (
        <View style={styles.container} >
            <ChampionshipList  championships={championships}/>
            <Button style={styles.createButton} onPress={onCreatePress}>
                <Icon name="md-add" type="Ionicons" style={styles.createButtonIcon} />
            </Button>
        </View>
    );

}


export default Championship;