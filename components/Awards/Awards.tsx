import React, { useEffect, useRef, useState } from 'react';
import { View, Image, Alert, RefreshControl } from 'react-native';
import { Text, Button, Toast, Spinner, Content } from 'native-base'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Layout from '../../constants/Layout';
import Api from '../../api/Api';
// Recoil
import { useRecoilCallback, useRecoilState } from 'recoil';
import { authUserAtom } from '../../recoil/Auth.recoil';
import { awardsAtom, awardsSelector } from '../../recoil/Awards.recoil'
// Helpers
import AuthHelper from '../../helpers/Auth/Auth.helper';
// Style
import styles from './Awards.styles'
import BigTitle from '../Title/BigTitle';



function wp(percentage) {
    const value = (percentage * Layout.window.width) / 100;
    return Math.round(value);
}

//const slideWidth = wp(85);
const slideWidth = Layout.window.width;
const itemHorizontalMargin = wp(2);

const sliderWidth = Layout.window.width;
const itemWidth = slideWidth;



const Awards = () => {

    const api = new Api();
    const [authUser, setAuthUser] = useRecoilState(authUserAtom)
    const [awards, setAwards] = useRecoilState(awardsAtom)
    const authHelper = new AuthHelper();
    const carouselRef = useRef(null);
    // States
    const [activeSlide, setActiveSlide] = useState(0);
    // Refreshing
    const [refreshing, setRefreshing] = useState(false)
    // Update Awards
    const updateAwards = useRecoilCallback(({ snapshot }) => async () => {
        setRefreshing(true);
        const response = await snapshot.getPromise(awardsSelector);
        setAwards(response);
        setRefreshing(false);
    }, [setAwards, setRefreshing]);
    // Find When Mount
    useEffect(() => {
        updateAwards()
    }, [])

    const onRefresh = async () => {
        updateAwards()
    }
    // Pagination
    const pagination = (awards) => {
        return (
            <Pagination
                dotsLength={awards.length}
                activeDotIndex={activeSlide}
                containerStyle={{
                    backgroundColor: 'transparent', flex: 1, flexWrap: 'wrap',
                    paddingHorizontal: 0, paddingTop: 8
                }}
                dotStyle={{
                    width: 8,
                    height: 8,
                    borderRadius: 8,
                    marginHorizontal: 5,
                    marginVertical: 5,
                    backgroundColor: '#4becf6'
                }}
                inactiveDotStyle={{
                    // Define styles for inactive dots here
                    backgroundColor: '#fff'
                }}
                inactiveDotOpacity={1}
                inactiveDotScale={1}
            />
        );
    }

    const _awardRequest = async (item) => {
        const response = await api.changePoints(item.id);
        if (response.success) {
            Toast.show({
                text: 'Tu premio fue solicitado correctamente',
                buttonText: 'Aceptar',
                type: "success"

            });
            const response = await api.getUserInformation();
            const authUserFormatted = authHelper.formatAuthUser(response);
            // Set Atom User
            setAuthUser(authUserFormatted);
            // UsersActions.update();
        } else {
            Toast.show({
                text: 'No hemos podido canjear tu premio',
                buttonText: 'Aceptar',
                type: "danger"

            });
        }
    }
    const onChangeAward = (item) => {

        Alert.alert(
            '¿Estas seguro de usar tu puntos?',
            `Usarás ${item.points} para obtener ${item.name}`,
            [
                { text: 'Cancelar', onPress: () => { return; }, style: 'cancel' },
                { text: 'OK', onPress: () => _awardRequest(item) },
            ],
            { cancelable: false }
        )
    }

    const _renderItem = ({ item, index }) => {
        if (!authUser) {
            return <Spinner />;
        }
        let points = 0;
        if (authUser.point) {
            points = authUser.point.points;
        }

        return (
            <View style={styles.slide}>

                <View style={styles.avatarContainer}>
                    <Image source={{ uri: item.avatar }} style={styles.avatar} />
                </View>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.points}>{item.points} puntos</Text>
                <View style={styles.buttonContainer}>
                    <Button
                        onPress={() => { onChangeAward(item) }}
                        primary={points >= item.points}
                        disabled={points < item.points}
                        large
                        rounded
                        style={styles.button}>
                        <Text style={styles.buttonText}>
                            {points < item.points ? `PUNTOS INSUFICIENTES` : `CANJEAR AHORA`}
                        </Text>
                    </Button>
                </View>
            </View>
        );
    }

    return (
        <Content
            refreshControl={
                <RefreshControl
                    style={{ backgroundColor: '#transparent' }}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    tintColor="#fff" // Ios
                    colors={['#282828', '#fff']} //android
                    title={''}
                    progressBackgroundColor="#fff"
                />
            }
        >
            <BigTitle text={'CANJE DE  \n PREMIOS'} />
            <View style={styles.container}>
                {awards &&
                    <>
                        <Carousel
                            ref={carouselRef}
                            layout={'default'}
                            data={awards}
                            renderItem={_renderItem}
                            sliderWidth={sliderWidth}
                            itemWidth={itemWidth}
                            inactiveSlideScale={1}
                            inactiveSlideOpacity={0}
                            onSnapToItem={(index) => setActiveSlide(index)}
                        />
                        {pagination(awards)}
                    </>
                }
            </View>
        </Content>
    );

}


export default Awards;