import Layout from "../../constants/Layout";

import { StyleSheet } from 'react-native';
import ThemeUtility from '../../utilities/Theme/Theme.utility'
import { Variables } from "../../styles";


const styles = StyleSheet.create({
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
        fontFamily: Variables.openSansCondensedBold,
        fontSize: Layout.s(25),
        textAlign: 'center',
    },
    vs:{
        width: Layout.s(100),
        justifyContent: 'center',
        alignItems: 'center',
    },
    vsText:{
        textAlign: 'center',
        fontFamily: Variables.openSansCondensedBold,
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
        backgroundColor: Variables.championshipItemBg
    },
    buttonText:{
        color: '#fff',
        fontFamily: Variables.openSansCondensedBold,
        fontSize: Layout.s(22),
    },
    team:{
        flex: 1,
    },
    avatar:{
        
    }
});

export default styles; 
