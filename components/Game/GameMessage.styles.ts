import { StyleSheet } from 'react-native';
import ThemeUtility from '../../utilities/Theme/Theme.utility';

export default StyleSheet.create({
    container:{
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    },

      button:{
        marginTop: ThemeUtility.s(36),
        height: ThemeUtility.s(115),
        },
    buttonText: {
        fontFamily: 'OpenSansCondensed_bold',
        fontSize: ThemeUtility.s(35),
        textAlign:'center'
        },
      image : {
          marginTop: ThemeUtility.h(-180),
          width: ThemeUtility.s(412),
          height: ThemeUtility.s(285),
          zIndex:0
      },
      text: {
        fontFamily: 'edosz',
        fontSize: ThemeUtility.s(100),
        marginTop: ThemeUtility.h(-80),

        transform: [{ rotate: '-10deg'}],
        textAlign:'center'
      },
      bigText: {
        fontFamily: 'edosz',
        fontSize: ThemeUtility.s(140),
        marginTop: ThemeUtility.h(-50),

        transform: [{ rotate: '-10deg'}],
        textAlign:'center'
      },
      awardText:{
          fontSize: ThemeUtility.s(45),
          fontFamily: 'OpenSansCondensed_bold',
          textAlign:'center',
          lineHeight: ThemeUtility.s(45)


      }
});

