import { StyleSheet } from 'react-native';
import ThemeUtility from '../../Theme/utilities/ThemeUtility';
import  Layout  from '../../constants/Layout';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",        
    },
    scrollContainer: {
        flex: 1,
        width: '100%',
        
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
    itemsContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingTop: 0,
        marginTop: 0,
    },
    drawerItems: {
        marginTop: 0,

    },
    sidebarItem: {
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center'
    },
    sidebarItemStyle: {
        borderBottomColor: '#d4ccde',
        borderBottomWidth: 1,
        width: "85%",
        // alignItems: 'center',
        flexDirection: 'column',
        // justifyContent: 'flex-start',
        padding: ThemeUtility.h(35),
    },
    sidebarItemLabel: {
        textAlign: 'left',
        fontSize: ThemeUtility.s(35),
        fontFamily: 'OpenSansCondensed_light',
    },
    sidebarItemIcon: {
        marginLeft: ThemeUtility.s(80),
        marginRight: ThemeUtility.s(40),
        color: '#fff',
        fontSize: ThemeUtility.s(45)
    },
    sidebarItemImage: {
        marginLeft: ThemeUtility.s(80),
        width: ThemeUtility.s(35),
        height: ThemeUtility.s(35),
        marginRight: ThemeUtility.s(40)
    }

});