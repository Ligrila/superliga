import Layout from '../constants/Layout';

//size ratio
const s = (size) => {
    return size * Layout.window.ratio;
}

export default {
    'SuperLiga.Screen':{
        game:{
            flex:1,
        }
    },
    'SuperLiga.Game':{
        container:{
            flex:1,
        },
        avatarContainer:{
            flex: .4,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-start',
        },
        mainContainer:{
            flex:1,
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'column',
        },

        vsText:{
            marginLeft: 8,
            marginRight: 8
        },
        ballContainer:{
            alignItems: 'center'
        },
        ballImg:{
            width:140 * Layout.window.ratio,
            height: 140 * Layout.window.ratio,
    
        },
    },
    'SuperLiga.GameWait': {
        text: {
            fontFamily: 'OpenSansCondensed_bold',
            fontSize: s(60),
            textAlign:'center'
          }
      },
    'SuperLiga.GameConnectedUsers': {
        text: {
            fontFamily: 'OpenSansCondensed_light',
            fontSize: s(40),
            textAlign:'center'
          }
      },
  };
