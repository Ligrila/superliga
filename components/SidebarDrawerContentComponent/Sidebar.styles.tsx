import { StyleSheet } from 'react-native';
import ThemeUtility from '../../utilities/Theme/Theme.utility';
import Layout from '../../constants/Layout';
import Variables from '../../styles/Variables';


export default StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
        // backgroundColor: Variables.blue,
    },
    mainContainer: {
        flex: 1,
        width: '100%',
        paddingTop : Layout.isAndroid ? 50 : 0
    },
    text: {
        color: "#fff",
    },
    header: {
        height: 'auto', // null
        alignItems: "center",
        justifyContent: "center",
        paddingTop: (Layout.isIphoneX || Layout.isIphoneXR) ? 30 : 0
    },
    content: {
    },
    headerBody: {
        paddingTop: Layout.isIphoneX ? 30 : 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    userText: {
        fontSize: ThemeUtility.s(40),
        fontFamily: 'OpenSansCondensed_light',
    },
    userPoints: {
        fontSize: ThemeUtility.s(40),
        fontFamily: 'OpenSansCondensed_bold',
    },
    userAvatar: {
        marginTop: ThemeUtility.h(20),
    },
    scrollContainer: {
        flex: 1,
        width: '70%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    sidebarItem: {
        borderBottomColor: '#fff',
        borderBottomWidth: 1,        
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: 20,
    },
    sidebarItemContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',

        width: '85%',
        paddingLeft: 50,
        position: 'relative'
    },
    sidebarItemLabel: {
        fontSize: ThemeUtility.s(35),
        fontFamily: 'OpenSansCondensed_light',
    },
  
    sidebarItemImageContainer: {
        width: 20,
        height: 20,
        position: 'absolute',
        left: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sidebarItemImage: {
        flex: 1,
        width: 20,
        height: 20,
        resizeMode: 'contain'
    
    },
    sidebarItemIcon: {
        fontSize: 20,
        color: Variables.white
    
    }


});

