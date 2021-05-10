import React from 'react';
import { Container, Content, Button, Icon } from 'native-base'
import Wallpaper from '../../components/Wallpaper/Wallpaper';
import AppHeader from '../../components/AppHeader/AppHeader';
// Edit
import EditChampionshipUsers from '../../components/Championship/EditChampionshipUsers';
// Styles
import styles from './ChampionshipScreen.styles';
import { useNavigation } from '@react-navigation/native';
const bgSrc = require('../../assets/images/championship/bg_champion.png');


const ChampionshipEditUsersScreen = ({ route }) => {
    const navigation = useNavigation();

    const { championship } = route.params || { championship: {}};

    const returnButton = (<Button transparent onPress={() => {
        navigation.navigate("ChampionshipHome")
    }}><Icon name='ios-arrow-back' /></Button>)

    return (
        <Container>
            <Wallpaper source={bgSrc}>
                <AppHeader return={returnButton} />
                <Content contentContainerStyle={styles.content} padder>
                    <EditChampionshipUsers
                        championship={championship}
                        />
                </Content>
            </Wallpaper>
        </Container>
    );

}
export default ChampionshipEditUsersScreen;