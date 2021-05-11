import React, { useCallback, useEffect, useRef, useState } from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import { Text, Spinner } from 'native-base'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import BigTitle from '../Title/BigTitle';
import TriviaMinimal from './TriviaMinimal';
import AnimatedProgressBar from '../AnimatedProgressBar';
// Recoil
import { useRecoilValue } from 'recoil';
import { homeBannerAtom } from '../../recoil/HomeBanner.recoil'
// Styles
import styles from './TriviaCarouselMinimal.styles';
import { useNavigation } from '@react-navigation/native';
import Layout from '../../constants/Layout';
import Notice from '../Notice/Notice';
import Wallpaper from '../Wallpaper/Wallpaper';
import { AntDesign } from '@expo/vector-icons';


const navigationBg = require('../../assets/images/carousel_navigation_bg.png');
const navigationInvestedBg = require('../../assets/images/carousel_navigation_invested_bg.png');





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
    const homeBanner = useRecoilValue(homeBannerAtom)
    // States
    const [activeSlide, setActiveSlide] = useState(0);
    const [assetsLoaded, setAssetsLoaded] = useState(true);
    // Carousel
    const _carousel = useRef<Carousel>(null)
    // Navigation
    const navigation = useNavigation();
    // Load Assets
    const loadAssets = useCallback(async () => {
        if (homeBanner.data) {
            if (assetsLoaded) {
                return;
            }
            setAssetsLoaded(true)
            const serverImages = homeBanner.data.map(
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
        if (homeBanner && homeBanner.data && homeBanner.data.length > 0) {
            loadAssets();
        }
    }, [homeBanner, loadAssets])



    const onSnapToItem = (index) => {
        const item = homeBanner.data[index];
        onItem(item)
        setActiveSlide(index);
    }

    const renderPagination = () => {

        const maxSlide = homeBanner.data.length;
        if (maxSlide <= 0) {
            return;
        }
        const value = ((activeSlide + 1) * 100) / maxSlide;

        return (
            <View style={styles.progressBarContainer}>
                <AnimatedProgressBar
                    width={Layout.window.width * 0.5}
                    height={5}
                    backgroundColor='#fff'
                    containerBackgroundColor='#50aedf'
                    maxValue={100}
                    borderWidth={0}
                    value={value}
                />
            </View>
        );

    }

    const getNotice = (item) => {
        if (item.points_multiplier > 1) {
            if (item.points_multiplier == 2) {
                return (<Notice text={`Tus puntos se duplican!`} />)
            } else {
                return (<Notice text={`Tus puntos valen x ${item.points_multiplier}!`} />)
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
    // Award
    // const renderAward = (item) => {
    //     if (item.award.length <= 0) {
    //         return null;
    //     }
    //     const awardContainerStyle = item.type == 'trivia' ? { ...styles.triviaAwardContainer, ...styles.triviaAwardContainerTrivia } : styles.triviaAwardContainer;
    //     const winnerText = item.award.length > 0 ? item.award : ''
    //     return (
    //         <View style={awardContainerStyle}>
    //             <Text style={styles.triviaAwardText}> {winnerText}</Text>
    //         </View>
    //     )
    // }

    const _itemDate = (item) => {
        const dateFormatted = `${item.start_datetime_local.format('D')} de ${item.start_datetime_local.format('MMMM')} ${item.start_datetime_local.format('HH:mm')} hs`
        return dateFormatted;
    }
    const _renderItem = ({ item, index }) => {
        if (item.type == 'banner') {
            return <TouchableOpacity style={styles.banner} onPress={() => onBannerPress(item)} />;
        }
        const itemTitle = item.type == 'trivia' ? item.award : item.date.name;
        
        return (
            <View style={styles.slide} key={index}>
                <View style={styles.triviaDateTextContainer}>
                    <Text style={styles.triviaTitle}>{itemTitle}</Text>
                    <Text style={styles.triviaDateText}>{_itemDate(item)}</Text>
                </View>
                <TriviaMinimal trivia={item} avatarWidth={220} avatarHeight={230} />
                {/* Notice */}
                {getNotice(item)}
            </View>
        );
    }

    const nextItem = () => {
        _carousel.current.snapToNext();
    }

    const prevItem = () => {
        _carousel.current.snapToPrev();
    }
    const renderNavigation = () => {
        return (<>
            <TouchableOpacity
                onPress={() => prevItem()}
                activeOpacity={0.7}
                style={[styles.navigationButtons, styles.prev]}>
                <Wallpaper source={navigationBg} styles={styles.navigationButtonsWallpaper}>
                    <AntDesign name="left" size={30} color="#fff" style={{ marginRight: 20 }} />
                </Wallpaper>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => nextItem()}
                activeOpacity={0.7}
                style={[styles.navigationButtons, styles.next]} >
                <Wallpaper source={navigationInvestedBg} styles={styles.navigationButtonsWallpaper}>
                    <AntDesign name="right" size={30} color="#fff" style={{ marginLeft: 20 }} />
                </Wallpaper>
            </TouchableOpacity>

        </>)
    }
    const renderCarousel = (data) => {
        return (
            <>
                {renderNavigation()}
                <Carousel
                    ref={_carousel}
                    data={data}
                    renderItem={_renderItem}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    loop={true}
                    autoplay={true}
                    autoplayInterval={8000}
                    onSnapToItem={onSnapToItem}
                />
                {renderPagination()}
            </>
        )
    }



    if (!homeBanner.data) {
        return <Spinner />;
    }
    if (homeBanner.data) {
        if (homeBanner.data.length == 0) {
            return (
                <View style={styles.noTriviaContent}>
                    <BigTitle
                        hideSeparator={true}
                        titleBold={true}
                        text='Próximas'
                        red='trivias'
                        subtitle={'No hay próximas trivias.\nPrueba de nuevo más tarde'} />
                </View>
            )
        }
        return (
            <View style={styles.container}>
                {renderCarousel(homeBanner.data)}
            </View>
        );
    }
    return null
}

export default TriviaCarouselMinimal;