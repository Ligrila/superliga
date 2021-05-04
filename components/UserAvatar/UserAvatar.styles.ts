import { StyleSheet } from 'react-native';
import ThemeUtility from '../../Theme/utilities/ThemeUtility';

export default StyleSheet.create({
    avatarContainer: {
        borderColor: '#b3a0c6',
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
