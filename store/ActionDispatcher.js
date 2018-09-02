import Reflux from 'reflux';

import {ConnectedUsersStore,ConnectedUsersActions} from './ConnectedUsersStore';

import {TriviaQuestionActions} from './TriviaQuestion';
import { UsersStore, UsersActions } from './UserStore';
import { NextTriviaActions } from './NextTriviaStore';
import { ConnectionStatusStore } from './ConnectionStatusStore';




export default class ActionDispatcher{
    constructor(){
        Reflux.initStore(ConnectedUsersStore); // la necesitamos iniciada
        Reflux.initStore(UsersStore);
        Reflux.initStore(ConnectionStatusStore);
        
    }
    
    dispatch(message){
        switch(message.eventName){
            case 'updateConnectedUsers':
                ConnectedUsersActions.updateConnectedUsers(message.payload)
                break;
            case 'newQuestion':
                TriviaQuestionActions.add(message.payload);
                break;
            case 'finishTrivia':
                NextTriviaActions.finish();
                NextTriviaActions.get();
                break;
            case 'startTrivia':
                NextTriviaActions.current(message.payload);
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