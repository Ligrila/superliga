import Layout from '../constants/Layout';

//size ratio
const s = (size) => {
    return size * Layout.window.ratio;
}

export default {
    'SuperLiga.Screen':{
        game:{
            flex:1,
        },
        
    },
    'SuperLiga.LoginScreen':{
        login:{
            flex:1,
            alignItems:'center',
            justifyContent: 'center'
        },
        container:{
            flex:1,
            width: '80%',
            alignItems:'center',
            justifyContent: 'center'

        },
        title:{
            fontFamily: 'OpenSansCondensed_bold',
            fontSize: s(40)
        },
        item:{
            width: '100%',
        },
        input:{
            fontSize: s(40),
            width: '100%',
            fontFamily: 'OpenSansCondensed_light',
        },
        submitButton:{
            backgroundColor: '#7b4294',
            marginTop: s(40),
        },
        submitButtonText:{
            color: '#fff',
            fontFamily: 'OpenSansCondensed_bold',
            fontSize: s(35)
        },
        registerTitle:{
            fontFamily: 'OpenSansCondensed_light',
            fontSize: s(40),
            marginTop: s(50),
        },
        registerButton:{
            marginTop:s(30),
        },
        registerButtonText:{
            color: '#282828',
            fontFamily: 'OpenSansCondensed_bold',
            fontSize: s(35)
        },
        socialButton:{
            width: s(80),
            height: s(80),
            paddingHorizontal: 0,
            borderWidth:0,
            borderRadius: s(80),
            justifyContent: 'center',
        },
        socialButtonIcon:{
            fontSize: s(40),
            marginHorizontal:0,
        },
        socialLoginContainer:{
            marginTop: s(50),
            width: "100%",
            justifyContent: 'center',
            alignItems: 'center',
        },
        socialLoginTitle:{
            fontFamily: 'OpenSansCondensed_light',
            fontSize: s(40),
        },
        socialLoginIcons:{
            marginTop: s(30),
        },
    },
    'SuperLiga.Game':{
        container:{
            flex:1,
        },
        avatarContainer:{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-start',
        },
        mainContainer:{
            flex:1,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            width: "100%",
        },
        vsText:{
            marginLeft: 8,
            marginRight: 8
        },
    },
    'SuperLiga.GameBall':{
        ballContainer:{
            alignItems: 'center'
        },
        ballImg:{
            width:150 * Layout.window.ratio,
            height: 150 * Layout.window.ratio,
    
        },
    },
    'SuperLiga.GamePlay':{
        container: {
            width: "100%",
        },
        ballContainer:{
            alignItems: 'center'
        },
    },
    'SuperLiga.GameQuestion': {
        text: {
            fontFamily: 'OpenSansCondensed_bold',
            fontSize: s(60),
            textAlign:'center'
          },
        button:{
            marginTop: s(36),
            height: s(115),
        },
        buttonText: {
            fontFamily: 'OpenSansCondensed_bold',
            fontSize: s(35),
            textAlign:'center'
          }
      },
      'SuperLiga.GameAnswerResult': {
        bigText: {
            fontFamily: 'edosz',
            fontSize: s(184),
            transform: [{ rotate: '-10deg'}],
            textAlign:'center'
          },
          button:{
            marginTop: s(36),
            height: s(115),
            },
        buttonText: {
            fontFamily: 'OpenSansCondensed_bold',
            fontSize: s(35),
            textAlign:'center'
            },
          text: {
            fontFamily: 'edosz',
            fontSize: s(130),
            transform: [{ rotate: '-10deg'}],
            textAlign:'center'
          },
        subtext:{
            fontSize: s(40),
            fontFamily: 'OpenSansCondensed_bold',
            textAlign:'center'
        }
      },
    'SuperLiga.GameWait': {
        text: {
            fontFamily: 'OpenSansCondensed_bold',
            fontSize: s(60),
            textAlign:'center'
          },
      },
      
    'SuperLiga.GameConnectedUsers': {
        text: {
            fontFamily: 'OpenSansCondensed_light',
            fontSize: s(40),
            textAlign:'center'
          }
      },
  };
