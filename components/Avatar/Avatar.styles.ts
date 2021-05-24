

import { StyleSheet } from 'react-native';
import ThemeUtility from '../../utilities/Theme/Theme.utility';
import Layout from '../../constants/Layout';
import { Variables } from '../../styles';

export default StyleSheet.create({
    container:{
        alignItems:'center',
        justifyContent: 'center',
    },

    avatarContainer:{
        borderColor: Variables.championshipItemBg,
        borderWidth: 4,
        borderRadius: Math.floor(ThemeUtility.s(231)),
        overflow: 'hidden'
      },
      avatar: {
        height: Math.floor(ThemeUtility.s(231)),
        width: Math.floor(ThemeUtility.s(231)),
        resizeMode: 'cover'
      },
      avatarMiniContainer:{
        borderRadius: Math.floor(ThemeUtility.s(66)),
        overflow: 'hidden',
        backgroundColor: '#fff',
      },
      avatarMini:{
        height: Math.floor(ThemeUtility.s(66)),
        width: Math.floor(ThemeUtility.s(66)),
        resizeMode: 'cover'              
      },
      avatarMediumContainer:{
        backgroundColor: '#fff',
        borderColor: Variables.championshipItemBg,
        borderWidth: 4,
        borderRadius: Math.floor(ThemeUtility.s(148)),
        overflow: 'hidden',
      },
      avatarMedium:{
        height: Math.floor(ThemeUtility.s(148)),
        width: Math.floor(ThemeUtility.s(148)),
        resizeMode: 'cover'              
      },

      alternateBorder:{
        borderColor: Variables.championshipItemVariantBg,
      },
});