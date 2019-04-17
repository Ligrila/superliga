var io = require('socket.io-client');

import io from 'socket.io-client'



import ActionDispatcher from '../../store/ActionDispatcher';
import Enviroment from '../../constants/Enviroment';



export default class SocketClient{

    constructor(USER_TOKEN){
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
                query: {token: USER_TOKEN}
            })
        this.client.on('connect',()=>{
            console.log('socket connected')
        })
        this.dispatcher = new ActionDispatcher
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
        this.client.on('finishedQuestion',this.dispatcher.onFinishedQuestion)
    }
}

