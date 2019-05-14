import Reflux from 'reflux';

import {ConnectedUsersStore,ConnectedUsersActions} from './ConnectedUsersStore';

import {TriviaQuestionActions} from './TriviaQuestion';
import { UsersStore, UsersActions } from './UserStore';
import { NextTriviaActions } from './NextTriviaStore';
import { ConnectionStatusStore } from './ConnectionStatusStore';
import { StatisticsStore } from './StatisticsStore';
import { CurrentTriviaStatisticsStore, CurrentTriviaStatisticsActions } from './CurrentTriviaStatisticsStore';
import { ChatActions, ChatStore } from './ChatStore';
import Api from '../api/Api';
import { NavigatorStore , NavigatorActions} from './NavigatorStore';


export default class ActionDispatcher{
    constructor(){
        Reflux.initStore(ConnectedUsersStore); // la necesitamos iniciada
        Reflux.initStore(UsersStore);
        Reflux.initStore(ConnectionStatusStore);
        Reflux.initStore(StatisticsStore);
        Reflux.initStore(CurrentTriviaStatisticsStore);
        Reflux.initStore(ChatStore);
        Reflux.initStore(NavigatorStore);
        
        this.api = new Api;

        
    }
    async onConnect(isReconnected=false){
        if(isReconnected){
            // call trivia actions
            const canHandle = (routeName=='GamePlay' || routeName=='Home')
            if(!canHandle) return
            const canRedirect = ( NavigatorStore.state 
                                    &&  NavigatorStore.state.Navigator 
                                    &&  NavigatorStore.state.Navigator.instance 
                                    &&  NavigatorStore.state.Navigator.instance.state
                                    &&  NavigatorStore.state.Navigator.instance.state.nav
                                )
            if(!canRedirect) return
                                   
            let ct = await this.api.getCurrentTrivia();
            if(!ct){
              ct = {success: false};
            }
        
            let gameInProgress = ct.success;
            const getActiveRouteState = function (route) {
                if (!route.routes || route.routes.length === 0 || route.index >= route.routes.length) {
                    return route;
                }
            
                const childActiveRoute = route.routes[route.index];
                return getActiveRouteState(childActiveRoute);
            }
            const navigatorState = NavigatorStore.state.Navigator.instance.state.nav
            const {routeName} = getActiveRouteState(navigatorState)
            const redirectTo = gameInProgress ? 'GamePlay' : 'Home'
            NavigatorActions.navigate(redirectTo)

        }

    }
    onUpdateConnectedUsers(message){
        ConnectedUsersActions.updateConnectedUsers(message.payload)
    }
    onNewQuestion(message){
        TriviaQuestionActions.add(message.payload);
    }
    
    onFinishHalfTime(message){
        NextTriviaActions.finishHalfTime(message.payload);
    }
    onStartHalfTimePlay(message){
        NextTriviaActions.startHalfTimePlay(message.payload);
    }
    onStartExtraPlay(message){
        NextTriviaActions.startExtraPlay(message.payload);   
    }
    onStartHalfTime(message){
        NextTriviaActions.startHalfTime(message.payload);
    }
    onFinishGame(message){
        NextTriviaActions.finishGame(message.payload);
    }

    onFinishTrivia(message){
        NextTriviaActions.finish(message.payload);
        NextTriviaActions.get();
    }
    onStartTrivia(message){
        NextTriviaActions.current(message.payload);
        CurrentTriviaStatisticsActions.reset();
    }

    onFinishedQuestion(message){
        TriviaQuestionActions.finishedQuestion(message.payload);
        UsersActions.update();
    }


    // chat
    onChatBroadcast(message){
        ChatActions.appendMessage(message)
    }
    onChatConnect(socket){
        ChatActions.reset()
        ChatActions.setSocket(socket)
    }
    onChatDisconnect(){

    }

    dispatch(message){
        switch(message.eventName){
            case 'updateConnectedUsers':
                ConnectedUsersActions.updateConnectedUsers(message.payload)
                break;
            case 'newQuestion':
                TriviaQuestionActions.add(message.payload);
                break;
            case 'finishHalfTime':
                NextTriviaActions.finishHalfTime(message.payload);
                break;
            case 'startHalfTimePlay':
                NextTriviaActions.startHalfTimePlay(message.payload);
                break;
            case 'startExtraPlay':
                NextTriviaActions.startExtraPlay(message.payload);
                break;
            case 'showBanner':
                NextTriviaActions.showBanner(message.payload);
                break;
            case 'startHalfTime':
                NextTriviaActions.startHalfTime(message.payload);
                break;
            case 'finishGame':
                NextTriviaActions.finishGame(message.payload);
                break;
            case 'finishTrivia':
                NextTriviaActions.finish(message.payload);
                NextTriviaActions.get();
                break;
            case 'startTrivia':
                NextTriviaActions.current(message.payload);
                CurrentTriviaStatisticsActions.reset();
                break;
            case 'finishedQuestion':
                TriviaQuestionActions.finishedQuestion(message.payload);
                UsersActions.update();
                break;
            default:
                console.warn("Unknow action name : " + message.eventName);
                break;
        }
    }
}