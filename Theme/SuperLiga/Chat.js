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
        flex:1,
        paddingHorizontal:Layout.s(20),
        marginBottom: Layout.s(120)
    },
    formTrigger:{
        position: 'absolute',
        bottom:Layout.s(20),
        right:Layout.s(20), 
        zIndex:1000
    },
    formMessageTriggerIcon:{
        color: '#fff'
    },
    form:{
        paddingBottom: Layout.s(10),
        position:'absolute',
        bottom:Layout.s(0),
        left:Layout.s(20),
        right:Layout.s(20)
    }
    
}

const FullChat = {
    container:{
        position: 'relative',
        width: Layout.window.width -70,
        height: Layout.window.height
    },
    gradient:{

         width: Layout.window.width -70,
         height: Layout.window.height
     },

     messageContainer:{
        flex:1,
        paddingHorizontal:Layout.s(20),
        marginBottom: Layout.s(120),
        backgroundColor: 'gray',
    },

    formMessageTriggerIcon:{
        color: '#fff'
    },
    form:{
        paddingBottom: Layout.s(10),
        position:'absolute',
        bottom:Layout.s(0),
        left:Layout.s(20),
        right:Layout.s(20),
      
    },
    formInput:{
        backgroundColor: '#fff',
        color: "#282828",
        
    },
    formInputText:{
        color: "#282828"
    }
}

const Message ={
    container:{
        flexDirection:'row'
    },
    text:{

    },
    avatar:{
        width: 20,
        height: 20

    }
}
export default {
    'SuperLiga.Chat':Chat,
    'SuperLiga.FullChat':FullChat,
    'SuperLiga.ChatMessage': Message
    
}