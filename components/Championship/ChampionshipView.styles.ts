import { StyleSheet } from 'react-native';
import ThemeUtility from '../../utilities/Theme/Theme.utility'
import Layout from '../../constants/Layout'
import Variables from '../../styles/Variables'

export default StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative'
    },
    title: {
        marginVertical: 15,
        paddingHorizontal: 30
    },
    shareButton: {
        height: 56,
        width: 56,
        borderRadius: 28,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        justifyContent: "center",
        alignItems: "center",
        shadowRadius: 2,
        position: "absolute",
        bottom: 20,
        right: 20,
    },
    shareButtonIcon: {
        color: '#fff',
    },
    buttons: {
        flexDirection: 'row',
        alignItems: 'center',
         width: Layout.window.width,
        
    },
    button: {
        flex: 1,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    list: {

    },
    modal: {
    },
    modalContent: {
        flex: 1,
        zIndex: 50,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
    },
    modalBody: {
        backgroundColor: '#fff',
        width: "90%",
        padding: ThemeUtility.s(70),
        borderRadius: ThemeUtility.s(20),
        alignItems: 'center'

    },
    trophyCreatedImage: {
        width: ThemeUtility.s(184),
        height: ThemeUtility.s(184),
    },
    modalTitle: {
        fontFamily: 'OpenSansCondensed_bold',
        fontSize: ThemeUtility.s(70),
        marginVertical: ThemeUtility.h(20),
        color: Variables.brandPrimary,
        textAlign: 'center'
    },
    modalSubtitle: {
        fontSize: ThemeUtility.s(40),
        marginBottom: ThemeUtility.h(20),
    },
    modalText: {
        fontFamily: 'OpenSansCondensed_bold',
        fontSize: ThemeUtility.s(35),
        color: '#282828',
        textAlign: 'center'
    },
    modalButtons: {
        marginTop: ThemeUtility.s(80),
        flexDirection: 'row',
        alignItems: 'center'
    },
    modalShareButton: {
        width: ThemeUtility.s(125),
        height: ThemeUtility.s(125),
        borderRadius: ThemeUtility.s(125),
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalShareButtonIcon: {
        color: '#fff',
        fontSize: ThemeUtility.s(50),
    },
    modalCloseButton: {
        position: 'absolute',
        top: 0,
        right: 0
    },
    modalCloseButtonIcon: {
        color: '#282828',
    },
    listItem: {
        marginLeft: 0,
        backgroundColor: '#fff',
        height: ThemeUtility.h(94),
        paddingHorizontal: 0,
        marginHorizontal: 0,
        width: "100%",
        borderWidth: 0,
        marginTop: 1,
    },
    positionText: {
        fontSize: ThemeUtility.s(37),
        fontFamily: 'OpenSansCondensed_light',
        color: '#282828',
    },
    userNameText: {
        fontSize: ThemeUtility.s(30),
        fontFamily: 'OpenSansCondensed_bold',
    },
    pointsText: {
        fontSize: ThemeUtility.s(48),
        fontFamily: 'OpenSansCondensed_light',
    },

    trophyImage: {
        width: ThemeUtility.s(54),
        height: ThemeUtility.s(42),
        marginLeft: ThemeUtility.s(15)
    },

    medalImage: {
        width: ThemeUtility.s(37),
        height: ThemeUtility.s(54),
        marginLeft: ThemeUtility.s(25),
        marginTop: ((ThemeUtility.h(94) - ThemeUtility.s(54))) * -1
    },

    listItemPosition: {

    },
    listItemLeft: {
        margin: 0,
        backgroundColor: '#fff',
        position: 'relative',
         width: ThemeUtility.s(120),
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    listItemPositionLeft1: {
        width: ThemeUtility.s(170),
        
    },
    listItemPositionLeft2: {
        width: ThemeUtility.s(160),
        
    },
    listItemPositionLeft3: {
        width: ThemeUtility.s(150),
    },
    listItemBody: {
        backgroundColor: Variables.championshipItemBg,
        textAlign: 'center',
        height: '100%',
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginLeft: 0,
        borderBottomWidth: 0,
        paddingLeft: 55
    },
    listItemBody1: {
        paddingLeft: 30
    },
    listItemBody2: {
        paddingLeft: 35
    },
    listItemBody3: {
        paddingLeft: 40
    },
    listItemBodyVariant: {
        backgroundColor: Variables.championshipItemVariantBg,
    },
    // listItemPositionBody: {
    //     1: {
    //         backgroundColor: '#723e8e',
    //     },
    //     2: {
    //         backgroundColor: '#9461af',
    //     },
    //     3: {
    //         backgroundColor: '#b68acd',
    //     }
    // },
    listItemRight: {
        backgroundColor: Variables.championshipItemBg,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 0,
        paddingRight: 30

    },
    // listItemPositionRight: {
    //     1: {
    //         backgroundColor: '#723e8e',
    //     },
    //     2: {
    //         backgroundColor: '#9461af',
    //     },
    //     3: {
    //         backgroundColor: '#b68acd',
    //     }
    // },
    buttonText: {
        color: '#fff',
        fontSize: ThemeUtility.s(27),
        fontFamily: 'OpenSansCondensed_bold',
        alignItems: 'center'
    },
    separator: {
        backgroundColor: 'white',
        height: ThemeUtility.h(30),
        width: 1,
    },
});