import Layout from '../constants/Layout';

//size ratio
const s = (size) => {
    return size * Layout.window.ratio;
}

export default {
    'SuperLiga.Screen':{
        game:{
            flex:1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-beetween',
            backgroundColor:'red',
        }
    },
    'SuperLiga.Game':{
        container:{
            flex:1,
        },
        mainContainer:{
            flex:1,
            alignItems: 'center',
            flexDirection: 'column'
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
        avatarContainer:{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        }
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
