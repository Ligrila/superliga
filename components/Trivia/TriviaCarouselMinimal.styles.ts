import { StyleSheet } from 'react-native';
import ThemeUtility from '../../utilities/Theme/Theme.utility';
import Variables from '../../styles/Variables';
import { FlingGestureHandler } from 'react-native-gesture-handler';


export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        
    },
    slide: {
        flex: 1,   
    },
    banner: {
        flex: 1,
    },
    triviaDateTextContainer: {
        alignItems: 'center',
        marginTop: ThemeUtility.s(80),
        marginBottom: ThemeUtility.s(80)
    },
    triviaTitle: {
        textAlign: 'center',
        fontFamily: Variables.openSansCondensedLight,
        fontSize: ThemeUtility.s(80),
    },
    triviaDateText: {
        fontFamily: 'OpenSansCondensed_bold',
        fontSize: ThemeUtility.s(40),
    },
    pointsMultiplierText: {
        textAlign: 'center',
        color: '#a6f3ff',
        fontFamily: 'OpenSansCondensed_bold',
        fontSize: ThemeUtility.s(30),

    },
    triviaAwardContainer: {
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        width: "100%",
        height: ThemeUtility.h(112),
        justifyContent: 'center',
        backgroundColor: '#795394'
    },
    triviaAwardContainerTrivia: {
        backgroundColor: '#cc366b'
    },
    triviaAwardText: {
        width: '100%',
        textAlign: 'center',
        fontFamily: 'OpenSansCondensed_bold',
        fontSize: ThemeUtility.s(35),
        //transform: [{ rotate: '-15deg'}]

    },
    navigationButtons: {
        zIndex: 20,
        position: 'absolute',
        width: ThemeUtility.s(107),
        height: ThemeUtility.s(283),
        // title + 
        top: ThemeUtility.s(80) * 3 + ThemeUtility.s(283) / 2,
    },
    navigationButtonsWallpaper: {
        flexDirection: 'column',
        justifyContent:'center',
        alignItems: 'center',
    },
    next: {
        right: "0%",
    },
    prev: {
        left: "0%",
    },
    prevImage: {
        width: ThemeUtility.s(28),
        height: ThemeUtility.s(49),
    },
    nextImage: {
        width: ThemeUtility.s(28),
        height: ThemeUtility.s(49),
    },
    vsText: {
        marginLeft: 8,
        marginRight: 8,
        fontFamily: 'OpenSansCondensed_bold',
        fontSize: ThemeUtility.s(40),
    },
    pagination: {
        marginTop: ThemeUtility.h(80),
        alignItems: 'center',
    },
    noTriviaContent: {
        paddingHorizontal: 20
    },
    progressBarContainer:{
        position: 'absolute',
        flex: 1,
        bottom: 40
    }


});

