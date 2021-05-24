import { StyleSheet } from 'react-native';
import ThemeUtility from '../../utilities/Theme/Theme.utility'

export default StyleSheet.create({
    container:{
        flex: 1,
    },
    scrollContainer:{
        flex: 1,
        
    },
    list:{
        paddingBottom: 80
    },
    thumbnail:{
        backgroundColor: '#fff',
        width: ThemeUtility.s(102),
        height: ThemeUtility.s(96),
        borderRadius: ThemeUtility.s(102),
        alignItems: 'center',
        justifyContent: 'center'
    },
    thumbnailImg:{
        width: ThemeUtility.s(63),
        height: ThemeUtility.s(63),
    },

    listItem:{
        marginLeft: 0,
        marginTop: 2,
        paddingHorizontal: ThemeUtility.s(30),
        backgroundColor: 'transparent', 
        borderTopWidth:  1,
        borderColor: '#fff'
    },
    listItemBody:{
        borderBottomWidth: 0
    },
    listItemRight:{
        justifyContent:'center',
        alignItems: 'center',
        textAlign: 'center',
        alignContent: 'center',
        flexDirection: 'column',
        paddingHorizontal: 0,
        paddingRight: 0,
        paddingLeft: 0,
        borderBottomWidth: 0
        
    },
    text:{
        color: '#fff',
        //fontFamily: 'OpenSans',
        fontSize: ThemeUtility.s(25),
    },
    championshipName:{
        color: '#fff',
        fontSize: ThemeUtility.s(48),
        fontFamily: 'OpenSansCondensed_bold',
    },
    icon:{
        color: '#fff',
    },
    statisticsContainer:{
        flexDirection: 'row'
    },
    statisticsText:{
        color: '#fff',
        fontFamily: 'OpenSansCondensed_light',
        fontSize: ThemeUtility.s(25),
        paddingLeft: ThemeUtility.s(5)
    },
    statisticsIcon:{
        color: '#fff',
        fontSize: ThemeUtility.s(25),
    }
});