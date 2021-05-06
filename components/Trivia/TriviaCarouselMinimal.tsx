import React, { useCallback, useEffect, useRef, useState } from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import { Text, Spinner } from 'native-base'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import BigTitle from '../Title/BigTitle';
import TriviaMinimal from './TriviaMinimal';
import AnimatedProgressBar from '../AnimatedProgressBar';
// Recoil
import { useRecoilValueLoadable } from 'recoil';
import { homeBannerSelector } from '../../recoil/HomeBanner.recoil'
// Styles
import styles from './TriviaCarouselMinimal.styles';
import { useNavigation } from '@react-navigation/native';
import Layout from '../../constants/Layout';
const carouselNext = require('../../assets/images/trivia-carousel-minimal-next.png');
const carouselPrev = require('../../assets/images/trivia-carousel-minimal-prev.png');


function wp(percentage) {
    const value = (percentage * Layout.window.width) / 100;
    return Math.round(value);
}

//const slideWidth = wp(85);
const slideWidth = Layout.window.width;
const itemHorizontalMargin = wp(2);

const sliderWidth = Layout.window.width;
const itemWidth = slideWidth;



function cacheImages(images) {
    const serverAssets = images.map(image => {
        if (typeof image == 'string') {
            return Image.prefetch(image);
        }
    });
    Promise.all(serverAssets);
}


const TriviaCarouselMinimal = ({ onItem }) => {
    // Recoil
    const homeBanner = useRecoilValueLoadable(homeBannerSelector)
    // States
    const [title, setTitle] = useState('')
    const [subtitle, setSubtitle] = useState('')
    const [activeSlide, setActiveSlide] = useState(0);
    const [assetsLoaded, setAssetsLoaded] = useState(true);
    // Carousel
    const _carousel = useRef<Carousel>(null)
    // Navigation
    const navigation = useNavigation();
    // Load Assets
    const loadAssets = useCallback(async () => {
        if (homeBanner.state === 'hasValue') {
            if (assetsLoaded) {
                return;
            }
            setAssetsLoaded(true)
            const serverImages = homeBanner.contents.data.map(
                (item) => {
                    if (item.type == 'banner') {
                        return item.banner
                    }
                    return false
                }
            )
            cacheImages(serverImages)
        }
    }, [homeBanner])

    useEffect(() => {
        loadAssets();
    }, [homeBanner, loadAssets])


    // On Set Title
    const onSetTitle = (item) => {
        if (item.type == 'banner') {
            setTitle('');
            setSubtitle('')
            return;
        }
        setTitle(item.date.name);
        setTitle(item.start_datetime_local.format('LL'));
    }
    const onSnapToItem = (index) => {
        const item = homeBanner[index];
        onItem(item)
        onSetTitle(item);
        setActiveSlide(index);
    }

    const pagination = () => {
        if (homeBanner.state === 'hasValue') {

            if (!homeBanner.contents.data) {
                return;
            }
            const maxSlide = homeBanner.contents.data.length;
            if (maxSlide <= 0) {
                return;
            }
            const value = ((activeSlide + 1) * 100) / maxSlide;

            return (
                <AnimatedProgressBar
                    width={Layout.window.width * 0.5}
                    height={5}
                    backgroundColor='#fff'
                    containerBackgroundColor='#50aedf'
                    maxValue={100}
                    value={value}
                />
            );
        }
        return null;
    }

    const getNotice = (item) => {
        if (item.points_multiplier > 1) {
            if (item.points_multiplier == 2) {
                return (<Text style={styles.pointsMultiplierText}>Tus puntos se duplican!</Text>)
            } else {
                return (<Text style={styles.pointsMultiplierText}>Tus puntos valen x{item.points_multiplier}!</Text>)
            }
        }
        return null;
    }
    const onBannerPress = (item) => {
        if (item.action == 'navigate') {
            navigation.navigate(item.action_target, {});
            return;
        }
        if (item.action == 'link') {
            navigation.navigate('InAppBrowser', { url: item.action_target_url, return: 'Home' });
        }
    }
    const _renderItem = ({ item, index }) => {
        if (item.type == 'banner') {
            return <TouchableOpacity style={styles.banner} onPress={() => onBannerPress(item)} />;
        }
        const renderAward = () => {
            if (item.award.length <= 0) {
                return null;
            }
            const winnerText = item.award.length > 0 ? item.award : ''
            return (
                <View style={awardContainerStyle}>
                    <Text style={styles.triviaAwardText}> {winnerText}</Text>
                </View>
            )
        }

        const awardContainerStyle = item.type == 'trivia' ? { ...styles.triviaAwardContainer, ...styles.triviaAwardContainerTrivia } : styles.triviaAwardContainer;
        return (
            <View style={styles.slide}>
                <TriviaMinimal trivia={item} />
                <View style={styles.triviaDateTextContainer}>
                    <Text style={styles.triviaDateText}></Text>
                    <Text style={styles.triviaDateText}>{item.start_datetime_local.format('LL')}</Text>
                    <Text style={styles.triviaDateText}>{item.start_datetime_local.format('HH:mm')}hs</Text>
                    {getNotice(item)}
                </View>
                {renderAward()}
            </View>
        );
    }

    const nextItem = () => {
        _carousel.current.snapToNext();
    }

    const prevItem = () => {
        _carousel.current.snapToPrev();
    }




    const renderCarousel = (data) => {
        return (
            <Carousel
                ref={_carousel}
                data={data}
                renderItem={_renderItem}
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
                loop={true}
                autoplay={true}
                autoplayInterval={4000}
                onSnapToItem={onSnapToItem}
            />
        )
    }



    if (homeBanner.state === 'loading') {
        return <Spinner />;
    }
    if (homeBanner.state === 'hasValue') {
        if (homeBanner.contents.data.length == 0) {
            return (
                <BigTitle
                    text='Próximas'
                    red='trivias'
                    subtitle={'No hay próximas trivias. Prueba de nuevo más tarde'} />
            )
        }

        return (
            <View style={styles.container}>
                {renderCarousel(homeBanner.contents.data)}
            </View>
        );
    }
    return null
}

export default TriviaCarouselMinimal;