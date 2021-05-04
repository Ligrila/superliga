import { StyleSheet } from 'react-native'
import Variables from './Variables';
// 116 * 35
export default StyleSheet.create({
    label: {
        color: Variables.dark
    },
    textError: {
        color: Variables.brandDanger,
        marginTop: 10
    },
    justifyContentCenter:{
        justifyContent:'center'
    },
    alignItemsCenter:{
        alignItems:'center'
    },
    marginTop10:{
        marginTop: 10
    },
    marginTop20:{
        marginTop: 20
    },
    tabs:{
        elevation:0,
        backgroundColor:Variables.brandPrimary

    },
    scrolleableTab:{
        elevation:0,
        backgroundColor:'red'
    },
    tabsText:{
        fontFamily: Variables.robotoMedium,
        color: Variables.white
    },
    
    tabsUnderlineStyle:{
        backgroundColor:Variables.brandSecondary
    },
    tabHeading:{
        fontFamily: Variables.robotoMedium,
        color: Variables.white,
        backgroundColor: Variables.brandPrimary,
        
    },
    defaultBtnContainer:{
        marginTop: 15,
    },
    headerBtnRounded:{
        marginBottom:10, width:50, height:50, paddingLeft:0, paddingRight:0
    }

});