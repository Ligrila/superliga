import React, { useCallback, useState } from 'react';
import { Container, Content, Button, Icon } from 'native-base'
import Wallpaper from '../../components/Wallpaper/Wallpaper';
import AppHeader from '../../components/AppHeader/AppHeader';
// Edit
import EditChampionshipUsers from '../../components/Championship/EditChampionshipUsers';
// Styles
import styles from './ChampionshipScreen.styles';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Api from '../../api/Api';
import { useRecoilState } from 'recoil';
import { championshipUsersAtom } from '../../recoil/Championship.recoil';
import { RefreshControl } from 'react-native';
const bgSrc = require('../../assets/images/championship/bg_champion.png');


const ChampionshipEditUsersScreen = ({ route }) => {
    const api = new Api();
    const navigation = useNavigation();
    const { championship: championshipParam } = route.params || { championship: {} };
    const [championship, setChampionship] = useState<any>(championshipUsersAtom)
    const [refreshing, setRefreshing] = useState(false)

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchData();
        setRefreshing(false);
    }
    const fetchData = useCallback(async () => {
        let response = await api.championshipUsers(championshipParam.id);
        if (response.success) {
            setChampionship({...response.data});
        }else{
            setChampionship(null)
        }

    }, [championshipParam])

    useFocusEffect(
        useCallback(() => {
            if (championshipParam) {
                fetchData();
            }
        }, [championshipParam])
    )

    const returnButton = (<Button transparent onPress={() => {
        navigation.navigate("ChampionshipHome")
    }}><Icon name='ios-arrow-back' /></Button>)

    return (
        <Container>
            <Wallpaper source={bgSrc}>
                <AppHeader return={returnButton} />
                <Content
                    contentContainerStyle={styles.content} 
                    padder
                    refreshControl={
                        <RefreshControl
                            style={{ backgroundColor: '#transparent' }}
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            tintColor="#fff" // Ios
                            colors={['#282828', '#fff']} //android
                            title={''}
                            progressBackgroundColor="#fff"
                        />}>
                        <EditChampionshipUsers
                            championship={championship}
                        />
                </Content>
            </Wallpaper>
        </Container>
    );

}
export default ChampionshipEditUsersScreen;