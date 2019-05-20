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
        this.client = new io(
            Enviroment.socketUrl,
            {
                transports:['websocket'],
                query: {token: USER_TOKEN}
            })

        this.chatClient = new io(
            Enviroment.chatSocketUrl,
            {
                transports:['websocket'],
                query: {token: USER_TOKEN,name:user.first_name,avatar: user.avatar},
            })
        this.client.on('connect',()=>{
            if(this.firstConnect){
                this.firstConnect = false;
            } else {
                this.isReconnected = true
            }
            console.log("reconnected")
            this.dispatcher.onConnect(this.isReconnected)

            

        })
        this.client.on('error',(e)=>{
            console.log('error',e)
        })

        this.bindEvents()

    }
    
    bindEvents(){
        //ActionDispatcher.onUpdateConnectedUsers({});
        this.client.on('updateConnectedUsers',this.dispatcher.onUpdateConnectedUsers)
        this.client.on('newQuestion',this.dispatcher.onNewQuestion)
        this.client.on('finishHalfTime',this.dispatcher.onFinishHalfTime)
        this.client.on('startHalfTimePlay',this.dispatcher.onStartHalfTimePlay)
        this.client.on('startExtraPlay',this.dispatcher.onStartExtraPlay)
        this.client.on('startHalfTime',this.dispatcher.onStartHalfTime)
        this.client.on('finishGame',this.dispatcher.onFinishGame)
        this.client.on('finishTrivia',this.dispatcher.onFinishTrivia)
        this.client.on('startTrivia',this.dispatcher.onStartTrivia)
        this.client.on('showBanner',this.dispatcher.onShowBanner)
        this.client.on('finishedQuestion',this.dispatcher.onFinishedQuestion)
        this.chatClient.on('broadcast',this.dispatcher.onChatBroadcast)
        this.chatClient.on('connect',()=>this.dispatcher.onChatConnect(this.chatClient))
        this.chatClient.on('disconnect',this.dispatcher.onChatDisconnect)

    }
}

