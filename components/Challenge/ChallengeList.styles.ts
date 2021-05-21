import { StyleSheet } from 'react-native';
import ThemeUtility from '../../utilities/Theme/Theme.utility'


const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    list:{
        
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
    listItemFirst:{
        borderTopWidth: 1,
      
    },
    listItem:{
        marginTop: 2,
        paddingHorizontal: ThemeUtility.s(10),
        backgroundColor: 'transparent', 
        borderBottomWidth: 1,
        borderColor: '#fff'
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

export default styles; 
