import { StyleSheet } from 'react-native';
import ThemeUtility from '../../Theme/utilities/ThemeUtility';
import Variables from '../../styles/Variables';

export default StyleSheet.create({
    avatarContainer: {
        borderColor: Variables.green,
        borderWidth: 4,
        borderRadius: ThemeUtility.s(231),
        overflow: 'hidden'
    },
    avatar: {
        height: ThemeUtility.s(231),
        width: ThemeUtility.s(231),
        resizeMode: 'cover'
    },

});
