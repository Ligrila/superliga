import { StyleSheet } from 'react-native';
import ThemeUtility from '../../utilities/Theme/Theme.utility';


export default StyleSheet.create({
    container:{
        flex:1,
        paddingTop: ThemeUtility.h(50)
    },
    slide:{
        flex:1,
    },
    banner:{
        flex: 1,
      
    },
    triviaDateTextContainer:{
        alignItems: 'center'
    },
    triviaDateText:{
        fontFamily: 'OpenSansCondensed_bold',
        fontSize: ThemeUtility.h(40),
    },
    pointsMultiplierText:{
        textAlign: 'center',
        color: '#a6f3ff',
        fontFamily: 'OpenSansCondensed_bold',
        fontSize: ThemeUtility.s(30),

    },
    triviaAwardContainer:{
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right:0,
        width: "100%",
        height: ThemeUtility.h(112),
        justifyContent:'center',
        backgroundColor: '#795394'
    },
    triviaAwardContainerTrivia:{
        backgroundColor: '#cc366b'
    },
    triviaAwardText:{
        width: '100%',
        textAlign:'center',
        fontFamily: 'OpenSansCondensed_bold',
        fontSize: ThemeUtility.s(35),
        //transform: [{ rotate: '-15deg'}]

    },
    next:{
        zIndex:20,
        position:'absolute',
        right:"5%",
        top: '15%',
        width:ThemeUtility.s(28),
        height:ThemeUtility.s(49),
    },
    prev:{
        zIndex:20,
        position:'absolute',
        left:"5%",
        top: '15%',
        width:ThemeUtility.s(28),
        height:ThemeUtility.s(49),
    },
    prevImage:{
        width:ThemeUtility.s(28),
        height:ThemeUtility.s(49),
    },
    nextImage:{
        width:ThemeUtility.s(28),
        height:ThemeUtility.s(49),
    },
    vsText:{
        marginLeft: 8,
        marginRight: 8,
        fontFamily: 'OpenSansCondensed_bold',
        fontSize: ThemeUtility.s(40),
    },
    pagination:{
        marginTop:ThemeUtility.h(80),
        alignItems: 'center',
    }
    

});

