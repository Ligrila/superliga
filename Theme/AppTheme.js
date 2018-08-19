import Layout from '../constants/Layout';

//size ratio
const s = (size) => {
    return size * Layout.window.ratio;
}
const h = (size) => {
    console.log('h',size * Layout.window.heightRatio);
    return size * Layout.window.heightRatio;
}

export default {
    'SuperLiga.NextTrivia':{
        avatarContainer:{
            flex:1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        vsText:{
            marginLeft: 8,
            marginRight: 8
        },
    },
    'SuperLiga.Awards':{
        slide:{
            flex:1,
            alignItems: 'center',
            justifyContent: 'center'
        },
        carousel:{
            
        },
        absoluteBg:{
            top: 50,
            bottom: 30,
            left:0,
            right:0,
            position:'absolute',
            backgroundColor: 'white',

        },
        avatar:{
            width: Layout.window.height / 5,
            height: Layout.window.height / 5
        },
        title:{
            color: '#282828',
            fontFamily: 'OpenSansCondensed_bold',
            fontSize: s(40),
            width: s(540),
            textAlign: 'center',
        },
        description:{
            color: '#282828',
            fontFamily: 'OpenSansCondensed_light',
            fontSize: s(35),
            width: s(540),
            textAlign: 'center',
        },
        points:{
            marginTop: h(32),
            marginBottom: h(32),
            color: '#7b4295',
            fontFamily: 'OpenSansCondensed_bold',
            fontSize: s(35),
            textAlign: 'center',
        },
        buttonContainer:{
            alignItems: 'center',
            justifyContent: 'center',
        },

        button:{
            alignItems: 'center',
            justifyContent: 'center',
            width: s(540),
        },


        buttonText:{
            color: '#fff',
            fontFamily: 'OpenSansCondensed_bold',
            fontSize: s(35)
        },
    },
    'SuperLiga.Title':{ // general component
        container:{
            alignItems: 'center',
            marginBottom: h(27),
        },
        title: {
            textAlign: 'center',
            fontFamily: 'OpenSansCondensed_light',
            fontSize: s(50),
        },
        separator: {
            backgroundColor: 'white',
            height: h(68),
            width: 1,
            marginTop: h(27),
            marginBottom: h(27),

        },
    },
    'SuperLiga.Calendar':{
        title: {
            textAlign: 'center',
        },
    },
    'SuperLiga.CalendarItem':{
        title:{
            color: '#99e0ff',
            fontFamily: 'OpenSansCondensed_bold',
            fontSize: s(40),
            textAlign: 'center',
        },
        allTrivias:{
            marginTop: h(40),
        },
        triviaContainer:{
            flex:1,
            flexDirection: 'row',
            borderTopColor: '#b0b0af',
            borderBottomColor: '#b0b0af',
            borderBottomWidth: 1,
            borderTopWidth:1,
            paddingVertical: h(35),
        },
        avatarContainer:{
            flex:1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        vsText:{
            marginLeft: 8,
            marginRight: 8
        },
        textContainer:{
            flex:1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
        },
        teamsText:{
            fontFamily: 'OpenSansCondensed_bold',
            fontSize: s(40),
        },
        dateText:{
            fontFamily: 'OpenSansCondensed_light',
            fontSize: s(40),
        }
    },
    'SuperLiga.UserInfo':{
        container:{
            alignItems: 'center',
        },
         liveContainer:{
            borderBottomColor: '#b0b0af',
            borderBottomWidth: 1,
            alignItems: 'center',
            flexDirection: 'row',
         },
         ballImg: {
            marginRight: s(10),
            width: s(31),
            height: s(31),
         },
         livesText:{
             fontSize: s(28),
             fontFamily: 'OpenSansCondensed_bold',
         },
         pointsText:{
             fontSize: s(40),
            fontFamily: 'OpenSansCondensed_light',
         },
         pointsValueText:{
            fontSize: s(48),
            fontFamily: 'OpenSansCondensed_bold',
         },
    },
    'SuperLiga.ProfileScreen':{
        profileContainer:{
            flex:1,
            alignItems:'center',
            justifyContent: 'center'
        },
        profileWallpaper: {
            marginBottom: s(50),
        },
        icon:{
            color: '#fff',
            alignItems:'center',
            justifyContent: 'center'

        },
        changeAvatarButton:{
            alignItems:'center',
            justifyContent: 'center'
        },
        profile:{
            flex:1,
            marginTop: s(80),
        },
    },
    'SuperLiga.StatisticsScreen':{
        statistics:{
          flex: 1,
        },
        container:{
            flex:1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        },
        rowContainer:{
            flex:3,
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'center',
        },
        statisticsItem:{
        },
    },
    'SuperLiga.StatisticItem':{
        container:{
            justifyContent: 'center',
            alignItems: 'center',
            flex:1,
        },
        fill:{
            flex:1,
            backgroundColor: '#fff',
            width:150 * Layout.window.ratio,
            height: 150 * Layout.window.ratio,
            borderRadius: 150 * Layout.window.ratio,
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: 'black',
        },
        fillText:{
            color: '#000',
            fontFamily: 'OpenSans_bold',
            fontSize: s(40),
            textAlign:'center',
        },
        text:{
            fontFamily: 'OpenSans',
            fontSize: s(20),
            marginTop: 10,
            textAlign:'center',
        }
    },
    'SuperLiga.UserAvatar':{
        avatarContainer:{
            borderColor: '#b3a0c6',
            borderWidth: 4,
            borderRadius: s(231),
            overflow: 'hidden'
          },
          avatar: {
            height: s(231),
            width: s(231),
            resizeMode: 'cover'
          },
    },
    'SuperLiga.Sidebar': {
        container: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          },
          scrollContainer: {
          },
          text:{
            color: "#fff",
          },
          header: {
            height: null,
            alignItems: "center",
            justifyContent: "center",
          },
          content:{
          },
          headerBody:{
            alignItems:'center',
            justifyContent: 'center',
          },
          userText:{
              fontSize: s(40),
              fontFamily: 'OpenSansCondensed_light',
          },
          userPoints:{
            fontSize: s(40),
            fontFamily: 'OpenSansCondensed_bold',
        },
        userAvatar:{
            marginTop: h(20),
        },
          itemsContainer:{
            flex:1,
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            paddingTop: 0,
            marginTop:0,
          },
          drawerItems:{
              marginTop:0,

          },
          sidebarItem:{
              width: "100%",
              alignItems:'center',
              justifyContent: 'center'
          },
          sidebarItemStyle:{
            borderBottomColor:'#d4ccde',
            borderBottomWidth:1,
            width: "85%",
            alignItems:'center',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            padding: h(35),
        },
          sidebarItemLabel:{
              textAlign: 'center',
              fontSize: s(35),
              fontFamily: 'OpenSansCondensed_light',
          },
          sidebarItemImage:{
            marginLeft: s(80),
            width: s(35),
            height: s(35),
            marginRight: s(40)
        }
    },
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
            alignItems:'center',
            justifyContent:'center',
            flexDirection: 'row'
        },
        socialIconSeparator:{
            width: 1,
            height: s(20),
            backgroundColor: '#fff',
            marginHorizontal: 10,
        }
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
