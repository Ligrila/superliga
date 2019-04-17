import Reflux from 'reflux';

import {ConnectedUsersStore,ConnectedUsersActions} from './ConnectedUsersStore';

import {TriviaQuestionActions} from './TriviaQuestion';
import { UsersStore, UsersActions } from './UserStore';
import { NextTriviaActions } from './NextTriviaStore';
import { ConnectionStatusStore } from './ConnectionStatusStore';
import { StatisticsStore } from './StatisticsStore';
import { CurrentTriviaStatisticsStore, CurrentTriviaStatisticsActions } from './CurrentTriviaStatisticsStore';


export default class ActionDispatcher{
    constructor(){
        Reflux.initStore(ConnectedUsersStore); // la necesitamos iniciada
        Reflux.initStore(UsersStore);
        Reflux.initStore(ConnectionStatusStore);
        Reflux.initStore(StatisticsStore);
        Reflux.initStore(CurrentTriviaStatisticsStore);

        
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