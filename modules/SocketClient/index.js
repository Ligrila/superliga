var io = require('socket.io-client');

import io from 'socket.io-client'



import ActionDispatcher from '../../store/ActionDispatcher';
import Enviroment from '../../constants/Enviroment';



export default class SocketClient{

    constructor(USER_TOKEN,user){
        // TODO: send user data to socket we only need avatar and first_name
        this.dispatcher = new ActionDispatcher
        this.firstConnect = true;
        this.isReconnected = false;
        console.log("Socket.io start");
        this.client = new io(
            Enviroment.socketUrl,
            {
                //transports:['websocket'],
                query: {token: USER_TOKEN}
            })

        console.log("Socket.io on connect");
        this.client.on('connect',()=>{
            if(this.firstConnect){
                this.firstConnect = false;
            } else {
                this.isReconnected = true
            }
            console.log("connected")
            this.dispatcher.onConnect(this.isReconnected)
            this.bindEvents()

            

        })
        console.log("Socket.io on error");
        this.client.on('error',(e)=>{
            console.log('error',e)
        })
        console.log("Socket.io bind");

        console.log("Socket.io end");

        console.log("Socket.io start chat");
        /*this.chatClient = new io(
            Enviroment.chatSocketUrl,
            {
                //transports:['websocket'],
                query: {token: USER_TOKEN,name:user.first_name,avatar: user.avatar},
            })
        console.log("Socket.io start chat connect");
        this.chatClient.on('connect',()=>{
            console.log("Socket.io start chat bindings");
            this.chatClient.on('broadcast',this.dispatcher.onChatBroadcast)
            this.chatClient.on('connect',()=>this.dispatcher.onChatConnect(this.chatClient))
            this.chatClient.on('disconnect',this.dispatcher.onChatDisconnect)
            console.log("chat connected")

        })
        console.log("Socket.io start chat error");
        this.chatClient.on('error',(e)=>{

            console.log("chat connected error",e)

        })*/

    }
    
    bindEvents(){
        //ActionDispatcher.onUpdateConnectedUsers({});
        this.client.on('startTrivia',this.dispatcher.onStartTrivia)
        this.client.on('updateConnectedUsers',this.dispatcher.onUpdateConnectedUsers)
        this.client.on('newQuestion',this.dispatcher.onNewQuestion)
        this.client.on('finishHalfTime',this.dispatcher.onFinishHalfTime)
        this.client.on('startHalfTimePlay',this.dispatcher.onStartHalfTimePlay)
        this.client.on('startExtraPlay',this.dispatcher.onStartExtraPlay)
        this.client.on('startHalfTime',this.dispatcher.onStartHalfTime)
        this.client.on('finishGame',this.dispatcher.onFinishGame)
        this.client.on('finishTrivia',this.dispatcher.onFinishTrivia)

        this.client.on('showBanner',this.dispatcher.onShowBanner)
        this.client.on('finishedQuestion',this.dispatcher.onFinishedQuestion)


    }
}

