import { StyleSheet } from "react-native";
import ThemeUtility from '../../utilities/Theme/Theme.utility'
export default StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    liveContainer: {
        borderBottomColor: '#b0b0af',
        borderBottomWidth: 1,
        alignItems: 'center',
        flexDirection: 'row',
    },
    ballImg: {
        marginRight: ThemeUtility.s(10),
        width: ThemeUtility.s(31),
        height: ThemeUtility.s(31),
    },
    livesText: {
        fontSize: ThemeUtility.s(28),
        fontFamily: 'OpenSansCondensed_bold',
    },
    pointsText: {
        fontSize: ThemeUtility.s(40),
        fontFamily: 'OpenSansCondensed_light',
    },
    pointsValueText: {
        fontSize: ThemeUtility.s(48),
        fontFamily: 'OpenSansCondensed_bold',
    },
});
