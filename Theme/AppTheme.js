import Layout from '../constants/Layout';
import SuperLiga from './SuperLiga'

//size ratio
const s = (size) => {
    return size * Layout.window.ratio;
}
const h = (size) => {
     return size * Layout.window.heightRatio;
}

export const FooterStyle ={
    borderTopWidth:0,
    elevation:0

    //height: Layout.isIphoneX ? null: 'auto',

};



const styles =   {
    //'SuperLiga.NotificationBullet': require('./SuperLiga/NotificationBullet')(Layout),
    //'SuperLiga.NotificationBullet': SuperLiga.NotificationBullet,
    'SuperLiga.EditChampionshipUsers':{
        icon:{
            color: '#fe6c61'
        }
    },
    'SuperLiga.ChangeAvatar':{
        changeAvatarButton:{
            alignItems:'center',
            justifyContent: 'center'
        },
        changeAvatarButtonText:{
            fontFamily: 'OpenSansCondensed_light',
            textDecorationColor: '#fff',
            textDecorationStyle: 'dotted',
            textDecorationLine: 'underline',
            fontSize: s(40)
        },
    },
    'SuperLiga.Avatar':{
        container:{
            alignItems:'center',
            justifyContent: 'center',
        },

        avatarContainer:{
            borderColor: '#b3a0c6',
            borderWidth: 4,
            borderRadius: Math.floor(s(231)),
            overflow: 'hidden'
          },
          avatar: {
            height: Math.floor(s(231)),
            width: Math.floor(s(231)),
            resizeMode: 'cover'
          },
          avatarMiniContainer:{
            borderRadius: Math.floor(s(66)),
            overflow: 'hidden',
            backgroundColor: '#fff',
          },
          avatarMini:{
            height: Math.floor(s(66)),
            width: Math.floor(s(66)),
            resizeMode: 'cover'              
          },
          avatarMediumContainer:{
            backgroundColor: '#fff',
            borderColor: '#9458cb',
            borderWidth: 4,
            borderRadius: Math.floor(s(148)),
            overflow: 'hidden',
          },
          avatarMedium:{
            height: Math.floor(s(148)),
            width: Math.floor(s(148)),
            resizeMode: 'cover'              
          },

          alternateBorder:{
            borderColor: '#89aed9',
          },
    },
    'SuperLiga.ChallengeRequestScreen':{
        content:{
            marginTop: h(50),
            alignItems:'center',
            justifyContent:'center'
        },
        bg:{
            width: s(575),
            height: s(828)
        },
        close:{
            position:'absolute',
            top: 10,
            right: 10,
            zIndex:22,
        },
        closeTouchable:{
        },
        closeText:{
            fontFamily: 'Roboto',
            fontSize: s(44),
        },

        messageContainer:{
            paddingTop: s(100),
            paddingHorizontal: s(40),
            alignItems:'center',
            justifyContent:'center'
        },
        title:{
            fontFamily: 'edosz',
            fontSize: s(127),
        },
        buttonContainer:{
            marginTop: s(30),
            flexDirection: 'row'
        },
        lastButton:{
            marginLeft:s(20)
        },
        buttonText:{
            color: '#fff'
        },
        text:{
            fontFamily: 'OpenSansCondensed_bold',
            fontSize:s(40),
            textAlign: 'center'
        },

    },
    'SuperLiga.CreateChallenge':{
        pickerContainer:{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        picker:{
            width: s(547),
            backgroundColor: '#fff',
            marginBottom: h(95),
            marginTop: h(95),
            justifyContent:'center',
            height:40
        },
        pickerIcon: {
            color: '#282828',
            position: 'absolute',
            top: 5,
            right: 0,
            justifyContent: 'center',
            alignItems: 'center'
        },
        pickerText:{
            color: '#353535',
            fontFamily: 'OpenSansCondensed_bold',
            textAlign:'center',
            //width: '100%',
            fontSize: s(31)
        },
        pickerItemText:{
            color: '#000'
        },
        text:{
            color: '#fff',
            fontFamily: 'OpenSansCondensed_bold',
            fontSize:s(30),
            textAlign: 'center'
        },
        buttonText:{
            color: '#fff',
            fontFamily: 'OpenSansCondensed_bold',
            fontSize:s(25)

        },
        row:{
            flexDirection: 'row',
            flex:1,
            marginTop: h(10),
        },
        colh1:{
            flex:0.3,
        },
        colh2:{
            flex:0.2,
        },
        colh3:{
            flex:0.2,
        },
        col1:{
            flexDirection: 'column',
            flex:0.3,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            padding: s(20),
            alignItems: 'center',
            justifyContent: 'center'
        },
        col2:{
            flexDirection: 'column',
            flex:0.2,
            backgroundColor: '#264870',
            padding: s(20),
            alignItems: 'center',
            justifyContent: 'center',
            
            
        },
        col3:{
            marginLeft: s(5),
            flexDirection: 'column',
            flex:0.2,
            backgroundColor: '#153f72',
            padding: s(20),
            alignItems: 'center',
            justifyContent: 'center'
        },
        col4:{
            flexDirection: 'column',
            flex:0.3,
            backgroundColor: '#539ecd',
            padding: s(20),
            alignItems: 'center',
            justifyContent: 'center'
        }
    },
    'SuperLiga.NotificationItem':{
        container:{
            backgroundColor: '#fff',
            marginTop: 0,
            paddingVertical: h(40),
            paddingHorizontal: s(120),
            flexDirection: 'row'
        },
        colors:[
            
            'rgb(40,162,211)',
            'rgb(184,129,194)',
            'rgb(183,70,113)',

        ],
        dateText:{
            marginTop: h(20),
            textAlign: 'left',
            fontFamily: 'OpenSansCondensed_light',
            color: '#fff'
        },
        body:{
            flexDirection: 'column',
            width: '100%'
        },
        text: {
            fontSize: s(36),
            fontFamily: 'OpenSansCondensed_bold',
            color: '#fff'
        }
    },
    'SuperLiga.AboutScreen':{
        content:{
            flex:1,
            alignItems: 'center',
        },
        icon:{
            width: s(300),
            height: s(300)
        },
        buttonText: {
            color: '#fff'
        }
    },
    'SuperLiga.ChampionshipSubscribeScreen':{
        content:{
            alignItems: 'center'
        },
        messageView:{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center'

        },
        card:{
            backgroundColor: 'transparent'
        },
        cardItem:{
            backgroundColor: 'transparent'
        },
        buttonText:{
            color: '#fff'
        }
    },
    'SuperLiga.ChampionshipView':{
        container:{
            flex: 1,
            flexDirection: 'row'
        },
        shareButton:{
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
            bottom: 20,
            right: 20,
        },
        shareButtonIcon:{
            color: '#fff',
        },
        buttons:{
            flexDirection: 'row',
            alignItems: 'center',
            width: Layout.window.width,
        },
        titleContainer:{
            flexDirection: 'row',
            
            alignItems: 'center',
            justifyContent: 'center',
        },
        list:{
        },
        modal:{


        },
        modalContent:{
            flex: 1,
            zIndex:50,
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'space-around',
            backgroundColor: '#00000040'
        },
        modalBody:{
            backgroundColor: '#fff',
            width: "90%",
            padding: s(70),
            borderRadius: s(20),
            alignItems: 'center'
            
            },
            trophyCreatedImage:{
                width: s(184),
                height: s(184),
            },
        modalTitle:{
                fontFamily: 'OpenSansCondensed_bold',
                fontSize: s(70),
                marginBottom: h(-20),
                color: '#7b4294',
                textAlign: 'center'
            },
        modalText:{
            fontFamily: 'OpenSansCondensed_bold',
            fontSize: s(35),
            color: '#282828',
            textAlign: 'center'
        },
        modalButtons:{
            marginTop: s(80),
            flexDirection: 'row',
            alignItems: 'center'
        },
        modalShareButton:{
            width: s(125),
            height: s(125),
            borderRadius: s(125),
            alignItems: 'center',
            justifyContent: 'center',
        },
        modalShareButtonIcon:{
            color: '#fff',
            fontSize:s(50),
        },
        modalCloseButton:{
            position: 'absolute',
            top: 0,
            right: 0
        },
        modalCloseButtonIcon:{
            color: '#282828',
        },
        buttonText:{
            color: '#fff',
            fontSize: s(38),
        },
        listItem:{
            backgroundColor: '#fff',
            height: h(94),
            paddingHorizontal:0,
            marginHorizontal:0,
            width: "100%",
            borderWidth:0,
            marginTop:2
        },
        positionMargin:{
            width: s(18)
        },
        positionText:{
            fontSize: s(37),
            fontFamily: 'OpenSansCondensed_light',
            color: '#282828',
        },
        userNameText:{
            fontSize: s(30),
            fontFamily: 'OpenSansCondensed_bold',
        },
        pointsText:{
            fontSize: s(48),
            fontFamily: 'OpenSansCondensed_light',
        },

        trophyImage:{
            width: s(54),
            height: s(42),
        },

        medalImage:{
            position: 'absolute',
            top: 0,
            left: s(107),
            width: s(37),
            height: s(53),
        },

        listItemPosition:{

        },
        listItemLeft:{
            position: 'relative',
            backgroundColor: '#fff',
            width: s(135),
            height: '100%',
            textAlign:'center',
            alignItems: 'center',
            justifyContent: 'center'
        },
        listItemPositionLeft:{
            1:{
                width: s(187)
            },
            2:{
                width: s(172)
            },
            3: {
                width: s(163)
            }
        },
        listItemBody:{
            backgroundColor: '#245591',
            textAlign:'center',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center'
        },
        listItemPositionBody:{
            1: {
                backgroundColor: '#723e8e',
            },
            2:{
                backgroundColor: '#9461af',
            },
            3:{
                backgroundColor: '#b68acd',
            }
        },
        listItemRight:{
            backgroundColor: '#245591',
            textAlign:'center',
            alignItems: 'center',
            justifyContent: 'center'

        },
        listItemPositionRight:{
            1: {
                backgroundColor: '#723e8e',
            },
            2:{
                backgroundColor: '#9461af',
            },
            3:{
                backgroundColor: '#b68acd',
            }
        },
        buttonText: {
            color: '#fff',
            fontSize: s(30),
            fontFamily: 'OpenSansCondensed_bold',
            alignItems: 'center'
        }
    },
    'SuperLiga.ChampionshipList':{
        container:{
            flex: 1,
        },
        list:{
            
        },
        thumbnail:{
            backgroundColor: '#fff',
            width: s(102),
            height: s(96),
            borderRadius: s(102),
            alignItems: 'center',
            justifyContent: 'center'
        },
        thumbnailImg:{
            width: s(63),
            height: s(63),
        },
        listItemFirst:{
            borderTopWidth: 1,
          
        },
        listItem:{
            marginTop: 2,
            paddingHorizontal: s(10),
            backgroundColor: 'transparent', 
            borderBottomWidth: 1,
            borderColor: '#fff'
        },
        text:{
            color: '#fff',
            //fontFamily: 'OpenSans',
            fontSize: s(25),
        },
        championshipName:{
            color: '#fff',
            fontSize: s(48),
            fontFamily: 'OpenSansCondensed_bold',
        },

        icon:{
            color: '#fff',
        },
        statisticsContainer:{
            flexDirection: 'row'
        },
        statisticsText:{
            color: '#fff',
            fontFamily: 'OpenSansCondensed_light',
            fontSize: s(25),
            paddingLeft: s(5)
        },
        statisticsIcon:{
            color: '#fff',
            fontSize: s(25),
        }

    },
    'SuperLiga.CreateChampionship':{
        'placeholder':{
            fontSize: s(35),
            fontFamily: 'OpenSansCondensed_bold',
            color: '#282828',
        },
        'input':{
            borderRadius: s(10),
            textAlign: 'center',
            fontSize: s(35),
            fontFamily: 'OpenSansCondensed_bold',
            color: '#282828',
            backgroundColor: '#fff', 
            borderWidth: 0,
            height: h(120),
            alignItems: 'center',
            justifyContent: 'center',
        },
        'calendarContainer':{
            marginTop: h(30),
            borderRadius: s(10),
            textAlign: 'center',
            fontSize: s(35),
            fontFamily: 'OpenSansCondensed_bold',
            color: '#282828',
            backgroundColor: '#fff', 
            borderWidth: 0,
            height: h(120),
            alignItems: 'center',
            justifyContent: 'center',
        },
        'calendarIcon':{
            color: '#7b4294',
            fontSize: s(45),
        },
        'calendar':{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
        },
        'label':{
            fontSize: s(35),
            fontFamily: 'OpenSansCondensed_bold',
            color: '#282828',
        },
        'buttonContainer':{
            marginTop: h(30),
            width: '100%',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
        },
        'button':{
            width: s(126),
            height: s(126),
            borderRadius: s(126),
            alignItems: 'center',
            justifyContent: 'center'

        },
        'buttonIcon':{
            color: '#fff', 

        },
    },
    'SuperLiga.Championship':{
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
            bottom: h(30),
            right: 0,
        },
        createButtonIcon:{
            color: '#fff',
        }
    },
    'SuperLiga.ChampionshipScreen':{
        content:{
            flex: 1,
            marginBottom: Layout.h(110)
        },

    },
    'SuperLiga.RankingItem':{
        container:{
            display:'flex',
            flexDirection:'row',
            flex:1,
            alignItems:'center',
            justifyContent:'center',
            marginBottom:2,
        },
        number:{
            flex:1,
            backgroundColor: '#fff',
            height: h(93),
            alignItems:'center',
            justifyContent:'center',



        },
        numberText:{
            color: '#282828',
            fontFamily: 'OpenSansCondensed_bold',
            fontSize: s(37)
        },
        name:{
            display:'flex',
            flexDirection: 'row',
            flex:4,
            backgroundColor: '#282828',
            height: h(93),
            alignItems:'center',
            paddingHorizontal: s(60),
            justifyContent: 'space-between',
        },
        nameText:{
            fontFamily: 'OpenSansCondensed_bold',
            fontSize: s(30)
        },
        namePointsText:{
            fontFamily: 'OpenSansCondensed_light',
            fontSize: s(48)
        }
    },
    'SuperLiga.Ranking':{
        pickerContainer:{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        picker:{
            width: s(547),
            backgroundColor: '#fff',
            marginBottom: h(95),
            marginTop: h(95),
            justifyContent:'center',
            height:40
        },
        pickerIcon: {
            color: '#282828',
            position: 'absolute',
            top: 5,
            right: 0,
            justifyContent: 'center',
            alignItems: 'center'
        },
        pickerText:{
            color: '#353535',
            fontFamily: 'OpenSansCondensed_bold',
            textAlign:'center',
            //width: '100%',
            fontSize: s(31)
        },
        pickerItemText:{
            color: '#000'
        },
        bold:{
            fontFamily: 'OpenSansCondensed_bold',
            fontSize: s(50),
            textAlign: 'center'
        },
        light:{
            fontFamily: 'OpenSansCondensed_light',
            fontSize: s(50),
            textAlign: 'center',
            marginBottom: h(50)

        }
    },
    'SuperLiga.LivePacksScreen':{
        container:{
            flex:1,
            alignItems:'center',
            justifyContent: 'center'
        },
    },
    'SuperLiga.InBrowserScreen':{
        webview:{
            paddingHorizontal:20,
        },

        container:{
            backgroundColor: '#282828',
        },
        footer:{
            ...FooterStyle
        }
    },
    'SuperLiga.BrowserScreen':{
        webview:{
            paddingHorizontal:20
        },
        header:{
            paddingTop: 20,
            backgroundColor: '#7b3e96',
        },
        footer:{
            ...FooterStyle
        }
    },
    'SuperLiga.PurchaseScreen':{
        webview:{
        },
        header:{
            paddingTop: 20,
            backgroundColor: '#009ee3',
        },
        footer:{
            ...FooterStyle
        }
    },
    'SuperLiga.Purchase':{
        container:{
            flex:1,
            justifyContent:  'center',
            alignItems: 'center',     
            marginTop: -70
        },
        background: {
            width: s(575),
            height: s(939),
            maxHeight: h(939),
            position: 'relative',
        },
        close:{
            position:'absolute',
            top: 10,
            right: 10,
            zIndex:22,
        },
        closeTouchable:{
        },
        closeText:{
            fontFamily: 'Roboto',
            fontSize: s(44),
        },
        header:{
            height: s(939) / 2,
            justifyContent:  'center',
            alignItems: 'center',     

        },
        headerText:{
            fontFamily: 'OpenSansCondensed_light',
            color: '#fff',
            fontSize: s(80),
            textAlign: 'center',
      
        },
        item:{
            height: (s(939) / 2) / 3,
            justifyContent:  'center',
            alignItems: 'center',            
        },
        itemText:{
            color: '#282828',
            fontFamily: 'OpenSansCondensed_bold',
            fontSize: h(40),
            textAlign: 'center',
        }
    },
    'SuperLiga.Notice':{
        container:{
            flex:1,
            justifyContent:  'center',
            alignItems: 'center',            
        },
        background: {
            width: s(562),
            height: s(176),
            justifyContent:  'center',
            alignItems: 'center'
        },
        text:{
            textAlign: 'center',
            color: '#a6f3ff',
            fontFamily: 'OpenSansCondensed_bold',
            fontSize: s(40),

        }
    },
    'SuperLiga.CountDown': {
        container:{
        },
        timeCont: {
            flexDirection: 'row',
            justifyContent: 'center',
          },
          timeTxt: {
            color: 'white',
            backgroundColor: 'transparent',

          },
          timeInnerCont: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          },
          digitCont: {
            marginHorizontal: 2,
            alignItems: 'center',
            justifyContent: 'center',
          },
          doubleDigitCont: {
            justifyContent: 'center',
            alignItems: 'center',
          },
          digitTxt: {
            color: 'white',
            fontFamily: 'OpenSansCondensed_light',
            fontSize: s(90),
          },
    },
    'SuperLiga.HomeScreen':{
        content:{
            flex:1,
        },
        nextMatchLink:{
            alignItems: 'center'
        },
        nextMatchText:{
            textAlign: 'center',
            fontFamily: 'OpenSansCondensed_bold',
            fontSize: s(40),
        },
        nextMatchImage:{
            marginTop: h(27),
            marginBottom: h(27),
            width: s(32),
            height: s(40),
        },
        footer:{
            ...FooterStyle,
            height: 'auto'
        }
    },
    'SuperLiga.HomeScreen2':{
        content:{
            flex:1,
        },
        nextMatchLink:{
            alignItems: 'center',
        },
        nextTriviaIconsContainer:{
            position: 'relative',
            height: (Layout.window.height / 2) - (Layout.isIphoneX ? h(85) : Layout.isIphoneXR ? h(75) : h(60)  ) ,
        },
        nextMatchText:{
            textAlign: 'center',
            fontFamily: 'OpenSansCondensed_bold',
            fontSize: s(40),
        },

        nextMatchImage:{
            marginTop: h(27),
            marginBottom: h(27),
            width: s(32),
            height: s(40),
        },
        userStatisticsContainer:{
            alignItems:'center',
            justifyContent: 'center',
            flexDirection: 'row',
            marginTop: h(80)
        },
        userStatisticsItem:{

        },
        userStatisticsSeparator:{
            height: h(40),
            width: 2,
            backgroundColor: '#fff',
            marginHorizontal: s(30),
        },
        userStatisticsItemValue:{
            fontFamily: 'OpenSansCondensed_light',
            fontSize: h(80),
            textAlign: 'center'


        },
        userStatisticsItemText:{
            fontFamily: 'OpenSansCondensed_bold',
            fontSize: h(30),
            textAlign: 'center'
        },
        actionsContainer:{
            marginTop: h(50),
            alignItems:'center',
            justifyContent: 'center',
            flexDirection: 'row',
        },
        actionsItem:{
            paddingHorizontal: s(40),
            alignItems:'center',
            flexDirection: 'row',

        },
        actionsItemText:{
            color: '#7e599a',
            fontSize: h(73),
        },
        actionsIcon:{
            width: s(118),
            height: s(118)
        },
        footer:{
            ...FooterStyle,
            height: 'auto'
        }
    },

    'SuperLiga.NextTrivia2':{
        container:{
            flex:1,
            paddingTop: h(50)
        },
        triviaDateTextContainer:{
            alignItems: 'center'
        },
        triviaDateText:{
            fontFamily: 'OpenSansCondensed_bold',
            fontSize: h(40),
        },
        triviaAwardContainer:{
            alignItems: 'center',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right:0,
            width: "100%",
            height: h(250),
            alignItems: 'flex-start',
            justifyContent:'center',

        },
        triviaAwardText:{
            width: '100%',
            fontFamily: 'OpenSansCondensed_bold',
            fontSize: h(40),
            //transform: [{ rotate: '-15deg'}]
    
        },
        next:{
            zIndex:20,
            position:'absolute',
            right:0,
            top: '30%',
            width:s(99),
            height:s(274),
        },
        prev:{
            zIndex:20,
            position:'absolute',
            left:0,
            top: '30%',
            width:s(99),
            height:s(274),
        },
        prevImage:{
            width:s(99),
            height:s(274),
        },
        nextImage:{
            width:s(99),
            height:s(274),
        },
        vsText:{
            marginLeft: 8,
            marginRight: 8,
            fontFamily: 'OpenSansCondensed_bold',
            fontSize: s(40),
        },
        pagination:{
            marginTop:h(80),
            alignItems: 'center',
        }
    },
    'SuperLiga.TriviaCarouselMinimal':{
        container:{
            flex:1,
            paddingTop: h(50)
        },
        slide:{
            flex:1,
        },
        banner:{
            flex: 1,
          
        },
        triviaDateTextContainer:{
            alignItems: 'center'
        },
        triviaDateText:{
            fontFamily: 'OpenSansCondensed_bold',
            fontSize: h(40),
        },
        pointsMultiplierText:{
            textAlign: 'center',
            color: '#a6f3ff',
            fontFamily: 'OpenSansCondensed_bold',
            fontSize: s(30),

        },
        triviaAwardContainer:{
            alignItems: 'center',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right:0,
            width: "100%",
            height: h(112),
            alignItems: 'center',
            justifyContent:'center',
            backgroundColor: '#795394'
        },
        triviaAwardContainerTrivia:{
            backgroundColor: '#cc366b'
        },
        triviaAwardText:{
            width: '100%',
            textAlign:'center',
            fontFamily: 'OpenSansCondensed_bold',
            fontSize: s(35),
            //transform: [{ rotate: '-15deg'}]
    
        },
        next:{
            zIndex:20,
            position:'absolute',
            right:"5%",
            top: '15%',
            width:s(28),
            height:s(49),
        },
        prev:{
            zIndex:20,
            position:'absolute',
            left:"5%",
            top: '15%',
            width:s(28),
            height:s(49),
        },
        prevImage:{
            width:s(28),
            height:s(49),
        },
        nextImage:{
            width:s(28),
            height:s(49),
        },
        vsText:{
            marginLeft: 8,
            marginRight: 8,
            fontFamily: 'OpenSansCondensed_bold',
            fontSize: s(40),
        },
        pagination:{
            marginTop:h(80),
            alignItems: 'center',
        }
    },
    'SuperLiga.NextTrivia':{
        container:{
            flex:1,
        },
        avatarContainer:{
            flex:1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        next:{
            zIndex:20,
            position:'absolute',
            right:0,
            top: '30%',
            width:s(99),
            height:s(274),
        },
        prev:{
            zIndex:20,
            position:'absolute',
            left:0,
            top: '30%',
            width:s(99),
            height:s(274),
        },
        prevImage:{
            width:s(99),
            height:s(274),
        },
        nextImage:{
            width:s(99),
            height:s(274),
        },
        vsText:{
            marginLeft: 8,
            marginRight: 8,
            fontFamily: 'OpenSansCondensed_bold',
            fontSize: s(40),
        },
        pagination:{
            marginTop:h(80),
            alignItems: 'center',
        }
    },
    'SuperLiga.Trivia':{
        avatarContainer:{
            //flex:1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        vsText:{
            marginLeft: 8,
            marginRight: 8,
            fontFamily: 'OpenSansCondensed_bold',
            fontSize: s(40),
        },

    },
    'SuperLiga.TriviaMinimal':{
        avatarContainer:{
            //flex:1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        vsText:{
            marginLeft: 8,
            marginRight: 8,
            fontFamily: 'OpenSansCondensed_bold',
            fontSize: s(40),
        },
        programmedTriviaTextContainer:{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
        programmedTriviaText1:{
            fontFamily: 'AbadiMTCondensedExtraBold',
            fontSize: h(60),
            lineHeight: h(68),
            color: '#fff',
            textAlign:'center',
        },
        programmedTriviaText2:{
            fontFamily: 'AbadiMTCondensedExtraBold',
            color: '#fff',
            fontSize: h(100),
            lineHeight: h(120),
            textAlign:'center',
            marginBottom: h(-20)

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
    'SuperLiga.BigTitle':{ // general component
        container:{
            alignItems: 'center',
        },
        title: {
            textAlign: 'center',
            fontFamily: 'OpenSansCondensed_light',
            fontSize: s(50),
            marginBottom:0,
        },
        bigTitle:{
            textAlign: 'center',
            fontFamily: 'OpenSansCondensed_bold',
            fontSize: s(80),
            marginBottom:0,
        },
        red:{
            color: '#fe6c61',
            textAlign: 'center',
            fontFamily: 'OpenSansCondensed_bold',
            fontSize: s(80),
        },
        subtitle: {
            textAlign: 'center',
            fontFamily: 'OpenSansCondensed_bold',
            fontSize: s(40),
            marginTop:-8,
        },
        separator: {
            backgroundColor: 'white',
            height: h(68),
            width: 1,
            marginTop: h(27),
            marginBottom: h(27),

        },
    },
    'SuperLiga.Title':{ // general component
        container:{
            alignItems: 'center',
            marginBottom: h(27),
        },
        title: {
            textAlign: 'center',
            fontFamily: 'OpenSansCondensed_bold',
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
            marginTop: h(35),
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
            paddingTop: h(120),
            flex:1,
            alignItems:'center',
            justifyContent: 'flex-start'
        },
        bigTitle:{
            position: 'relative',
            zIndex: 100,
            marginBottom: h(-120)
        },
        profileWallpaper: {
            position: 'relative',
            marginBottom: h(50),
        },
        userTitle:{
            marginVertical: h(70),
            fontSize: s(48),
            fontFamily: 'OpenSansCondensed_light',
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
            marginTop: h(10),
        },
        bold:{
            fontFamily: 'OpenSansCondensed_bold',
            fontSize: s(40)
        },
        text:{
            fontFamily: 'OpenSansCondensed_light',
            fontSize: s(40)
        },
        changeAvatarButtonText:{
            fontFamily: 'OpenSansCondensed_light',
            textDecorationColor: '#fff',
            textDecorationStyle: 'dotted',
            textDecorationLine: 'underline',
            fontSize: s(40)
        },
        buttonsContainer:{
            flexDirection: 'row',
            width: '100%',
            paddingHorizontal: 20,
            justifyContent: 'space-between',
        }
    },
    'SuperLiga.TutorialScreen':{
        container: {
            backgroundColor: '#f3f3f3',
        },
        icon:{
            color: '#282828',
        },
        tutorialImg: {
            width: Layout.window.width,
            height: s(1636)
        },
        tutorialImg2: {
            width: Layout.window.width,
            height: s(1968)
        },
        tutorialImg3: {
            width: Layout.window.width,
            height: s(1644)
        },
    },
    'SuperLiga.GameStatistics':{
        statistics:{
          flex: 1,
        },
        ranking:{
            textAlign: 'center',
            fontSize: h(212),
            fontFamily: 'OpenSansCondensed_bold',

            color: '#e4c7fb'
        },

        title:{
            textAlign: 'center',
            fontSize: h(50),
            fontFamily: 'OpenSansCondensed_bold',
        },
        titleSeparatorContainer:{
            alignItems: 'center'
        },
        titleSeparator:{
            height: 1,
            width: s(100),
            backgroundColor: '#fff',
        },
        subtitle:{
            textAlign: 'center',
            fontSize: h(30),
            fontFamily: 'OpenSansCondensed_bold',
            marginBottom: h(10),
        },
        container:{
            flex:1,

        },
        statisticsContainer:{
            marginTop: h(20),
            flex:1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
        },
        rowContainer:{
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'center',
        },
        statisticsItem:{
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
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'center',
        },
        statisticsItem:{
        },
        shareContainer:{
            position: 'absolute',
            bottom:0,
            right:0
        },
        shareImg:{
            width: s(159),
            height: s(149)
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
            //fontFamily: 'OpenSans',
            fontSize: s(20),
            marginTop: s(10),
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
            height: 'auto', // null
            alignItems: "center",
            justifyContent: "center",
            paddingTop: ( Layout.isIphoneX || Layout.isIphoneXR) ? 30 : 0
          },
          content:{
          },
          headerBody:{
            paddingTop: Layout.isIphoneX ? 30 : 0,
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
          sidebarItemIcon:{
            marginLeft: s(80),
            marginRight: s(40),
            color: '#fff',
            fontSize: s(45)
        },
          sidebarItemImage:{
            marginLeft: s(80),
            width: s(35),
            height: s(35),
            marginRight: s(40)
        }
    },
    'SuperLiga.GameHalfTimePlayScreen':{
        textContainer: {
            marginTop: h(50),
            alignItems:'center',
            justifyContent: 'center',
        },
        textLine1: {
            fontFamily: 'OpenSansCondensed_bold',
            transform: [{ rotate: '-5deg'}],
            textAlign: 'center',
            fontSize: s(223),
            marginBottom: s(-80),
        },
        textLine2: {
            fontFamily: 'OpenSansCondensed_bold',
            transform: [{ rotate: '-5deg'}],
            textAlign: 'center',
            fontSize: s(223),
            marginHorizontal: s(-70),
            marginBottom: s(-80),
        },
        textLine3: {
            fontFamily: 'OpenSansCondensed_bold',
            transform: [{ rotate: '-5deg'}],
            textAlign: 'right',
            width:"100%",
            marginRight: s(-70),

            fontSize: s(223),
        }
    },
    'SuperLiga.GameExtraPlayScreen':{
        textContainer: {
            marginTop: h(50),
            alignItems:'center',
            justifyContent: 'center',
        },
        textLine1: {
            fontFamily: 'OpenSansCondensed_bold',
            transform: [{ rotate: '-5deg'}],
            textAlign: 'center',
            fontSize: s(261),
            marginBottom: s(-80),
            marginHorizontal: (-70)
        },
        textLine2: {
            fontFamily: 'OpenSansCondensed_bold',
            transform: [{ rotate: '-5deg'}],
            textAlign: 'center',
            fontSize: s(261),
            marginBottom: s(-80),
        },
        textLine3: {
            fontFamily: 'OpenSansCondensed_bold',
            transform: [{ rotate: '-5deg'}],
            textAlign: 'right',
            width:"100%",

            fontSize: s(85),
        }
    },
    'SuperLiga.GameScreen':{
        game:{
            flex:.7,

        },
        footer:{
            ...FooterStyle,
        },
        connectedUsers:{
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'center',
            paddingBottom: Layout.s(20),

        },
        noLifeText:{
            fontFamily: 'OpenSansCondensed_bold',
            color: '#2cd6f5',
            fontSize: s(35),
        }
        
    },
    'SuperLiga.LoginScreen':{
        login:{
            flex:1,
            minHeight:'100%',
            alignItems:'center', // horizontal
            justifyContent: 'center',
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
            marginTop: h(40),
        },
        submitButtonText:{
            color: '#fff',
            fontFamily: 'OpenSansCondensed_bold',
            fontSize: s(35)
        },
        registerTitle:{
            fontFamily: 'OpenSansCondensed_light',
            fontSize: s(40),
            marginTop: h(50),
        },
        registerSubTitle:{
            fontFamily: 'OpenSansCondensed_light',
            fontSize: s(35),
            textAlign: 'center',
            marginTop: h(10),
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
            marginTop: h(50),
            width: "100%",
            justifyContent: 'center',
            alignItems: 'center',
        },
        socialLoginTitle:{
            fontFamily: 'OpenSansCondensed_light',
            fontSize: s(40),
        },
        socialLoginIcons:{
            marginTop: h(30),
            alignItems:'center',
            justifyContent:'center',
            flexDirection: 'row'
        },
        socialIconSeparator:{
            width: 1,
            height: h(20),
            backgroundColor: '#fff',
            marginHorizontal: 10,
        },
        termsAndConditionsContainer:{
            marginTop: h(20),

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
        programmedTriviaContainer:{
            flexDirection: 'column',
        },
        programmedTriviaText1:{
            fontFamily: 'AbadiMTCondensedExtraBold',
            fontSize: h(35),
            lineHeight: h(65),
            color: '#fff',
            
            textAlign:'center',
            
        },
        programmedTriviaText2:{
            fontFamily: 'AbadiMTCondensedExtraBold',
            fontSize: h(65),
            lineHeight: h(65),
            color: '#fff',
            
            textAlign:'center',
        },
    },
    'SuperLiga.GameBall':{
        ballContainer:{
            alignItems: 'center'
        },
        ballImg:{
            width: s(140),
            height: s(140),
    
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
        container:{

        },
        text: {
            fontFamily: 'OpenSansCondensed_bold',
            fontSize: h(45),
            textAlign:'center'
          },
          subtitle: {
            fontFamily: 'OpenSansCondensed_bold',
            fontSize: h(30),
            textAlign:'center'
          },
        button:{
            marginTop: h(25),
            height: h(105),
            alignItems:'center',
            justifyContent: 'center',
            position:'relative',
        },
        buttonText: {
            fontFamily: 'OpenSansCondensed_bold',
            fontSize: h(35),
            textAlign:'center',
          },
        correctQuestionIcon:{
            color: '#00a651',
            fontSize: h(35),
            position: 'absolute',
            top: h(37),
            right: s(20),
        }
      },
      'SuperLiga.GameAnswerResult': {
        bigText: {
            fontFamily: 'edosz',
            fontSize: s(140),
            transform: [{ rotate: '-10deg'}],
            textAlign:'center',
            lineHeight: s(120),

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
            fontSize: s(140),
            transform: [{ rotate: '-10deg'}],
            textAlign:'center',
            lineHeight: s(120),
          },
        subtext:{
            fontSize: s(30),
            fontFamily: 'OpenSansCondensed_bold',
            textAlign:'center'
        },
        subtextBold:{
            fontSize: s(35),
            fontFamily: 'OpenSansCondensed_bold',
            textAlign:'center'
        }
      },
      'SuperLiga.GameMessage': {
        container:{
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%'
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
          image : {
              marginTop: h(-180),
              width: s(412),
              height: s(285),
              zIndex:0
          },
          text: {
            fontFamily: 'edosz',
            fontSize: s(100),
            marginTop: h(-80),

            transform: [{ rotate: '-10deg'}],
            textAlign:'center'
          },
          bigText: {
            fontFamily: 'edosz',
            fontSize: s(140),
            marginTop: h(-50),

            transform: [{ rotate: '-10deg'}],
            textAlign:'center'
          },
          awardText:{
              fontSize: s(45),
              fontFamily: 'OpenSansCondensed_bold',
              textAlign:'center',
              lineHeight: s(45)


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


export default {...styles,...SuperLiga}
