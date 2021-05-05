import React, { useCallback, useEffect, useRef, useState } from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import { Text, Spinner } from 'native-base'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import BigTitle from '../Title/BigTitle';
import TriviaMinimal from './TriviaMinimal';
import AnimatedProgressBar from '../AnimatedProgressBar';
// Recoil
import { useRecoilValue } from 'recoil';
import { homeBannerSelector } from '../../recoil/selectors/HomeBanner.selector'
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
    const homeBanner = useRecoilValue(homeBannerSelector)
    // States
    const [title, setTitle] = useState('')
    const [subtitle, setSubtitle] = useState('')
    const [activeSlide, setActiveSlide] = useState(0);
    const [loading, setLoading] = useState(true);
    const [assetsLoaded, setAssetsLoaded] = useState(true);
    // Carousel
    const _carousel = useRef<Carousel>(null)
    // Navigation
    const navigation = useNavigation();
    // Load Assets
    const loadAssets = async () => {
        if (assetsLoaded) {
            return;
        }
        setAssetsLoaded(true)
        const serverImages = homeBanner.data.map(
            (item) => {
                if (item.type == 'banner') {
                    //       console.log(Image.queryCache(item.banner).then((data)=>console.log(data))
                    return item.banner
                }
                return false
            }
        )

        cacheImages(serverImages)
    }
    // Loading Complete
    const loadingComplete = useCallback(() => {
        setLoading(false);
        loadAssets();
    }, [setLoading, loadAssets])
    useEffect(() => {
        if (homeBanner.hasData) {
            loadingComplete();
        }
    }, [homeBanner, loadingComplete])


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

        if (loading) {
            return;
        }
        if (!homeBanner.data) {
            return;
        }
        const maxSlide = homeBanner.data.length;
        if (maxSlide <= 0) {
            return;
        }
        const value = ((activeSlide + 1) * 100) / maxSlide;
        /*console.log('value',value);
        console.log('value',maxSlide);
        console.log('value',activeSlide);*/
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
        if (!homeBanner.hasData) {
            return;
        }
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




    const renderCarousel = () => {


        return (
            <Carousel
                ref={_carousel}
                data={homeBanner.data}
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



    if (!homeBanner.hasData) {
        return <Spinner />;
    }

    if (homeBanner.data.length == 0) {
        return (
            <BigTitle
                text='Próximas'
                red='trivias'
                subtitle={'No hay próximas trivias. Prueba de nuevo más tarde'} />
        )
    }

    return (
        <View style={styles.container}>
            {renderCarousel()}
        </View>
    );
}

export default TriviaCarouselMinimal;