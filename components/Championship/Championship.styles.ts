import { StyleSheet } from 'react-native';
import ThemeUtility from '../../utilities/Theme/Theme.utility'

export default StyleSheet.create({
    container:{
        flex: 1,
    },
    createButton:{
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
        bottom: ThemeUtility.h(30),
        right: 0,
    },
    createButtonIcon:{
        color: '#fff',
    }

});