import Layout from "../../constants/Layout";

const Chat = {
    container:{
        position: 'absolute',
        bottom:0,
        left:0,
        right:0,
        width: Layout.window.width,
        height: Layout.s(412)
    },
    gradient:{
        width: Layout.window.width,
        height: Layout.s(412)
    },
    messageContainer:{
        flex:1
    },
    formTrigger:{
        position: 'absolute',
        bottom:Layout.s(80),
        right:Layout.s(20), 
    },
    formMessageTriggerIcon:{
        color: '#fff'
    }
}
export default {
    'SuperLiga.Chat':Chat,
    
}