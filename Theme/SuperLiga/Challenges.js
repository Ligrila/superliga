import Layout from "../../constants/Layout";

const ChallengeItem = {
    container:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    teamsContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text:{
        fontFamily: 'OpenSansCondensed_Bold',
        fontSize: Layout.s(25),
        textAlign: 'center',
    },
    vs:{
        width: Layout.s(100),
        justifyContent: 'center',
        alignItems: 'center'
    },
    vsText:{
        textAlign: 'center',
        fontFamily: 'OpenSansCondensed_Bold',
        fontSize: Layout.s(34),
    },
    buttonContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        height: Layout.h(100)
    },
    buttonLine:{
        width: Layout.window.width,
        height: 1,
        backgroundColor: '#fff'
    },
    buttonWrapper:{
        position:'absolute',
        left:0,
        right:0,
        top:0,
        justifyContent: 'center',
        alignItems: 'center',
        height: Layout.h(100),
        width: Layout.window.width,
        flex:1,
    },
    button:{
        backgroundColor:'#539ecd'
    },
    buttonText:{
        color: '#fff',
        fontFamily: 'OpenSansCondensed_Bold',
        fontSize: Layout.s(22),
    }
}

export default {
    'SuperLiga.ChallengeItem':ChallengeItem,
    
}